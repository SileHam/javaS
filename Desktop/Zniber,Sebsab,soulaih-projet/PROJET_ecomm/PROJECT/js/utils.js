// Utility Functions
// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-MA', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount) + ' DH';
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(i18n.currentLanguage === 'ar' ? 'ar-MA' : i18n.currentLanguage === 'en' ? 'en-US' : 'fr-FR', options);
}

// Format short date
function formatShortDate(dateString) {
    return new Date(dateString).toLocaleDateString('fr-FR');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show confirmation modal
function showConfirmModal(message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3 data-i18n="confirmDelete">${i18n.t('confirmDelete')}</h3>
            <p>${message}</p>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                    <span data-i18n="cancel">${i18n.t('cancel')}</span>
                </button>
                <button class="btn btn-danger" id="confirmBtn">
                    <span data-i18n="delete">${i18n.t('delete')}</span>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('confirmBtn').addEventListener('click', () => {
        onConfirm();
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Export to CSV
function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        showToast(i18n.t('noDataToExport'), 'error');
        return;
    }

    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

// Generate PDF
async function exportToPDF(element, filename) {
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add content
        await pdf.html(element, {
            callback: function (doc) {
                doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
            },
            x: 10,
            y: 10,
            width: 190,
            windowWidth: 800
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        showToast(i18n.t('pdfError'), 'error');
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Pagination
class Pagination {
    constructor(data, itemsPerPage = 10) {
        this.data = data;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
    }

    get totalPages() {
        return Math.ceil(this.data.length / this.itemsPerPage);
    }

    get currentData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.data.slice(start, end);
    }

    setPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    setItemsPerPage(items) {
        this.itemsPerPage = items;
        this.currentPage = 1;
    }

    renderPaginationControls(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(this.currentPage * this.itemsPerPage, this.data.length);

        container.innerHTML = `
            <div class="pagination-info">
                <span data-i18n="showing">${i18n.t('showing')}</span> ${start} 
                <span data-i18n="to">${i18n.t('to')}</span> ${end} 
                <span data-i18n="of">${i18n.t('of')}</span> ${this.data.length} 
                <span data-i18n="entries">${i18n.t('entries')}</span>
            </div>
            <div class="pagination-controls">
                <button class="btn btn-sm" ${this.currentPage === 1 ? 'disabled' : ''} onclick="goToPage(1)">
                    <i class="fas fa-angle-double-left"></i>
                </button>
                <button class="btn btn-sm" ${this.currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${this.currentPage - 1})">
                    <i class="fas fa-angle-left"></i>
                </button>
                <span class="page-number">${this.currentPage} / ${this.totalPages}</span>
                <button class="btn btn-sm" ${this.currentPage === this.totalPages ? 'disabled' : ''} onclick="goToPage(${this.currentPage + 1})">
                    <i class="fas fa-angle-right"></i>
                </button>
                <button class="btn btn-sm" ${this.currentPage === this.totalPages ? 'disabled' : ''} onclick="goToPage(${this.totalPages})">
                    <i class="fas fa-angle-double-right"></i>
                </button>
            </div>
        `;
    }
}

// Form Validation
class Validator {
    static isRequired(value) {
        return value && value.trim() !== '';
    }

    static isEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    static isPhone(value) {
        const phoneRegex = /^0[5-7][0-9]{8}$/;
        return phoneRegex.test(value);
    }

    static isNumber(value) {
        return !isNaN(value) && value !== '';
    }

    static isPositive(value) {
        return this.isNumber(value) && parseFloat(value) > 0;
    }

    static minLength(value, min) {
        return value && value.length >= min;
    }

    static maxLength(value, max) {
        return value && value.length <= max;
    }

    static showError(inputId, message) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.classList.add('error');
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        errorDiv.textContent = message;
    }

    static clearError(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.classList.remove('error');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }

    static clearAllErrors() {
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }
}

// Initialize language selector active state
function initLanguageSelector() {
    const currentLang = i18n.currentLanguage || 'fr';
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === currentLang.toUpperCase()) {
            btn.classList.add('active');
        }
    });
}

// Local Storage helpers
const Storage = {
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getAll(key) {
        return this.get(key) || [];
    },

    add(key, item) {
        const items = this.getAll(key);
        item.id = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        items.push(item);
        this.set(key, items);
        return item;
    },

    update(key, id, updatedItem) {
        const items = this.getAll(key);
        const index = items.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem, id: parseInt(id) };
            this.set(key, items);
            return items[index];
        }
        return null;
    },

    delete(key, id) {
        const items = this.getAll(key);
        const filtered = items.filter(item => item.id !== parseInt(id));
        this.set(key, filtered);
        return filtered.length < items.length;
    },

    find(key, id) {
        const items = this.getAll(key);
        return items.find(item => item.id === parseInt(id));
    }
};

// Dark Mode System
const DarkMode = {
    init() {
        // Check local storage or system preference
        const savedMode = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedMode === 'true' || (savedMode === null && systemPrefersDark)) {
            document.body.classList.add('dark-mode');
        }

        this.updateToggleIcon();
    },

    toggle() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        this.updateToggleIcon();
        return isDark;
    },

    updateToggleIcon() {
        const icon = document.getElementById('darkModeIcon');
        if (icon) {
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
};

// Initialize Dark Mode on load
document.addEventListener('DOMContentLoaded', () => {
    DarkMode.init();

    const darkModeBtn = document.getElementById('toggleDarkMode');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => DarkMode.toggle());
    }
});
