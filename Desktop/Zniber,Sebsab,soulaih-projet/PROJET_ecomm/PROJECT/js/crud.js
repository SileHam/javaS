// Generic CRUD System for all entities
class CRUDManager {
    constructor(entityName, fields, config = {}) {
        this.entityName = entityName;
        this.fields = fields;
        this.config = config;
        this.data = Storage.getAll(entityName);
    }
    
    // Get field configuration
    getFieldConfig(fieldName) {
        return this.fields.find(f => f.name === fieldName);
    }
    
    //genere <tr> for elm
    renderTableRow(item, index) {
        const row = document.createElement('tr');
        const displayFields = this.fields.filter(f => f.showInTable !== false);
        
        displayFields.forEach(field => {
            const td = document.createElement('td');
            td.innerHTML = this.formatFieldValue(item, field);
            row.appendChild(td);
        });
        
        // Actions column
        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <div class="action-buttons">
                ${this.config.detailsPage ? `
                    <a href="${this.config.detailsPage}?id=${item.id}" class="btn btn-sm btn-info" title="${i18n.t('view')}">
                        <i class="fas fa-eye"></i>
                    </a>
                ` : ''}
                ${this.config.formPage ? `
                    <a href="${this.config.formPage}?id=${item.id}" class="btn btn-sm btn-warning" title="${i18n.t('edit')}">
                        <i class="fas fa-edit"></i>
                    </a>
                ` : ''}
                <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})" title="${i18n.t('delete')}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        row.appendChild(actionsCell);
        
        return row;
    }
    
    // format val
    formatFieldValue(item, field) {
        let value = item[field.name];
        
        if (field.type === 'currency') {
            return formatCurrency(value);
        } else if (field.type === 'date') {
            return formatShortDate(value);
        } else if (field.type === 'badge') {
            const badgeClass = field.getBadgeClass ? field.getBadgeClass(value) : 'badge-secondary';
            return `<span class="badge ${badgeClass}">${field.format ? field.format(value) : value}</span>`;
        } else if (field.type === 'relation') {
            const relatedData = Storage.getAll(field.relatedEntity);
            const related = relatedData.find(r => r.id === value);
            return related ? related[field.relatedField || 'name'] : '-';
        } else if (field.format) {
            return field.format(value);
        }
        
        return value;
    }
    
    // Generate form HTML
    generateFormHTML() {
        let html = '<div class="details-grid">';
        
        this.fields.forEach(field => {
            if (field.showInForm === false) return;
            
            html += '<div class="form-group">';
            html += `<label for="${field.name}" data-i18n="${field.labelKey}">${field.label}${field.required ? ' *' : ''}</label>`;
            
            if (field.type === 'textarea') {
                html += `<textarea id="${field.name}" class="form-control" rows="4" ${field.required ? 'required' : ''}></textarea>`;
            } else if (field.type === 'select' || field.type === 'relation') {
                html += `<select id="${field.name}" class="form-control" ${field.required ? 'required' : ''}>`;
                html += '<option value="">Sélectionner...</option>';
                
                if (field.options) {
                    field.options.forEach(opt => {
                        html += `<option value="${opt.value}">${opt.label}</option>`;
                    });
                } else if (field.relatedEntity) {
                    const relatedData = Storage.getAll(field.relatedEntity);
                    relatedData.forEach(item => {
                        html += `<option value="${item.id}">${item[field.relatedField || 'name']}</option>`;
                    });
                }
                
                html += '</select>';
            } else {
                const inputType = field.type || 'text';
                const step = field.step ? `step="${field.step}"` : '';
                const min = field.min !== undefined ? `min="${field.min}"` : '';
                const max = field.max !== undefined ? `max="${field.max}"` : '';
                
                html += `<input type="${inputType}" id="${field.name}" class="form-control" ${step} ${min} ${max} ${field.required ? 'required' : ''}>`;
            }
            
            html += '</div>';
        });
        
        html += '</div>';
        return html;
    }
    
    // Valider chmp
    validateForm(formData) {
        Validator.clearAllErrors();
        let isValid = true;
        
        this.fields.forEach(field => {
            if (field.showInForm === false) return;
            
            const value = formData[field.name];
            
            if (field.required && !Validator.isRequired(value)) {
                Validator.showError(field.name, i18n.t('requiredField'));
                isValid = false;
            } else if (field.type === 'email' && value && !Validator.isEmail(value)) {
                Validator.showError(field.name, i18n.t('invalidEmail'));
                isValid = false;
            } else if (field.type === 'tel' && value && !Validator.isPhone(value)) {
                Validator.showError(field.name, i18n.t('invalidPhone'));
                isValid = false;
            } else if (field.min !== undefined && parseFloat(value) < field.min) {
                Validator.showError(field.name, `La valeur minimale est ${field.min}`);
                isValid = false;
            } else if (field.minLength && !Validator.minLength(value, field.minLength)) {
                Validator.showError(field.name, `Minimum ${field.minLength} caractères requis`);
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    //lecture DOM
    getFormData() {
        const formData = {};
        
        this.fields.forEach(field => {
            if (field.showInForm === false) return;
            
            const element = document.getElementById(field.name);
            if (!element) return;
            
            let value = element.value;
            
            if (field.type === 'number' || field.type === 'relation') {
                value = parseInt(value) || 0;
            } else if (field.type === 'currency') {
                value = parseFloat(value) || 0;
            }
            
            formData[field.name] = value;
        });
        
        return formData;
    }
    
    // rempliss DOM
    setFormData(data) {
        this.fields.forEach(field => {
            if (field.showInForm === false) return;
            
            const element = document.getElementById(field.name);
            if (!element || data[field.name] === undefined) return;
            
            element.value = data[field.name];
        });
    }
}

// Entity Configurations
const ENTITY_CONFIGS = {
    products: {
        fields: [
            { name: 'id', label: 'ID', showInForm: false },
            { name: 'name', label: 'Nom', labelKey: 'productName', required: true, minLength: 3 },
            { name: 'categoryId', label: 'Catégorie', labelKey: 'category', type: 'relation', relatedEntity: 'categories', required: true },
            { name: 'price', label: 'Prix', labelKey: 'price', type: 'currency', required: true, min: 0, step: '0.01' },
            { name: 'stock', label: 'Stock', labelKey: 'stock', type: 'number', required: true, min: 0 },
            { name: 'supplierId', label: 'Fournisseur', labelKey: 'supplier', type: 'relation', relatedEntity: 'suppliers', required: true },
            { name: 'description', label: 'Description', labelKey: 'description', type: 'textarea', required: true, minLength: 10, showInTable: false },
            { name: 'image', label: 'Image URL', labelKey: 'image', type: 'url', showInTable: false }
        ]
    },
    
    categories: {
        fields: [
            { name: 'id', label: 'ID', showInForm: false },
            { name: 'name', label: 'Nom', labelKey: 'categoryName', required: true, minLength: 3 },
            { name: 'description', label: 'Description', labelKey: 'description', type: 'textarea', required: true },
            { name: 'productCount', label: 'Nb Produits', labelKey: 'productCount', type: 'number', showInForm: false }
        ]
    },
    
    customers: {
        fields: [
            { name: 'id', label: 'ID', showInForm: false },
            { name: 'firstName', label: 'Prénom', labelKey: 'firstName', required: true },
            { name: 'lastName', label: 'Nom', labelKey: 'lastName', required: true },
            { name: 'email', label: 'Email', labelKey: 'email', type: 'email', required: true },
            { name: 'phone', label: 'Téléphone', labelKey: 'phone', type: 'tel', required: true },
            { name: 'address', label: 'Adresse', labelKey: 'address', required: true, showInTable: false },
            { name: 'city', label: 'Ville', labelKey: 'city', required: true },
            { name: 'status', label: 'Statut', labelKey: 'status', type: 'select', 
                options: [
                    {value: 'active', label: 'Actif'},
                    {value: 'inactive', label: 'Inactif'}
                ],
                getBadgeClass: (val) => val === 'active' ? 'badge-success' : 'badge-secondary'
            }
        ]
    },
    
    orders: {
        fields: [
            { name: 'id', label: 'N° Commande', labelKey: 'orderNumber', showInForm: false },
            { name: 'customerId', label: 'Client', labelKey: 'customer', type: 'relation', relatedEntity: 'customers', 
                relatedField: 'firstName', format: (val) => {
                    const customers = Storage.getAll('customers');
                    const customer = customers.find(c => c.id === val);
                    return customer ? `${customer.firstName} ${customer.lastName}` : '-';
                }
            },
            { name: 'date', label: 'Date', labelKey: 'date', type: 'date', required: true },
            { name: 'status', label: 'Statut', labelKey: 'orderStatus', type: 'select',
                options: [
                    {value: 'pending', label: 'En attente'},
                    {value: 'processing', label: 'En traitement'},
                    {value: 'shipped', label: 'Expédiée'},
                    {value: 'delivered', label: 'Livrée'},
                    {value: 'cancelled', label: 'Annulée'}
                ],
                getBadgeClass: (val) => {
                    const map = {pending: 'badge-warning', processing: 'badge-info', shipped: 'badge-primary', delivered: 'badge-success', cancelled: 'badge-danger'};
                    return map[val] || 'badge-secondary';
                }
            },
            { name: 'total', label: 'Total', labelKey: 'total', type: 'currency', required: true },
            { name: 'paymentMethod', label: 'Paiement', labelKey: 'paymentMethod', type: 'select',
                options: [
                    {value: 'cash', label: 'Espèces'},
                    {value: 'card', label: 'Carte'},
                    {value: 'transfer', label: 'Virement'}
                ]
            }
        ]
    },
    
    suppliers: {
        fields: [
            { name: 'id', label: 'ID', showInForm: false },
            { name: 'name', label: 'Nom', labelKey: 'supplierName', required: true },
            { name: 'contact', label: 'Contact', labelKey: 'contact', required: true },
            { name: 'email', label: 'Email', labelKey: 'email', type: 'email', required: true },
            { name: 'phone', label: 'Téléphone', labelKey: 'phone', type: 'tel', required: true },
            { name: 'address', label: 'Adresse', labelKey: 'address', required: true, showInTable: false },
            { name: 'rating', label: 'Évaluation', labelKey: 'rating', type: 'number', min: 0, max: 5, step: '0.1' }
        ]
    }
};
