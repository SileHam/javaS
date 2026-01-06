// Internationalization (i18n) System
const translations = {
    fr: {
        // Navigation
        dashboard: 'Tableau de bord',
        products: 'Produits',
        categories: 'Catégories',
        customers: 'Clients',
        orders: 'Commandes',
        suppliers: 'Fournisseurs',
        logout: 'Déconnexion',
        welcome: 'Bienvenue',
        
        // Auth
        login: 'Connexion',
        email: 'Email',
        password: 'Mot de passe',
        loginButton: 'Se connecter',
        invalidCredentials: 'Email ou mot de passe incorrect',
        
        // CRUD Actions
        add: 'Ajouter',
        edit: 'Modifier',
        delete: 'Supprimer',
        save: 'Enregistrer',
        cancel: 'Annuler',
        view: 'Voir détails',
        search: 'Rechercher...',
        filter: 'Filtrer',
        export: 'Exporter CSV',
        exportPDF: 'Exporter PDF',
        back: 'Retour',
        actions: 'Actions',
        
        // Table
        itemsPerPage: 'Éléments par page',
        showing: 'Affichage de',
        to: 'à',
        of: 'sur',
        entries: 'entrées',
        noData: 'Aucune donnée disponible',
        
        // Dashboard KPIs
        totalProducts: 'Total Produits',
        totalCategories: 'Total Catégories',
        totalCustomers: 'Total Clients',
        totalOrders: 'Total Commandes',
        totalRevenue: 'Chiffre d\'affaires',
        activeSuppliers: 'Fournisseurs actifs',
        
        // Products
        productName: 'Nom du produit',
        category: 'Catégorie',
        price: 'Prix',
        stock: 'Stock',
        supplier: 'Fournisseur',
        description: 'Description',
        image: 'Image',
        addProduct: 'Ajouter un produit',
        editProduct: 'Modifier le produit',
        productDetails: 'Détails du produit',
        productList: 'Liste des produits',
        addToCart: 'Ajouter au panier',
        addedToCart: 'Produit ajouté au panier',
        
        // Categories
        categoryName: 'Nom de la catégorie',
        productCount: 'Nombre de produits',
        addCategory: 'Ajouter une catégorie',
        editCategory: 'Modifier la catégorie',
        categoryDetails: 'Détails de la catégorie',
        categoryList: 'Liste des catégories',
        
        // Customers
        firstName: 'Prénom',
        lastName: 'Nom',
        phone: 'Téléphone',
        address: 'Adresse',
        city: 'Ville',
        totalSpent: 'Total dépensé',
        status: 'Statut',
        addCustomer: 'Ajouter un client',
        editCustomer: 'Modifier le client',
        customerDetails: 'Détails du client',
        customerList: 'Liste des clients',
        active: 'Actif',
        inactive: 'Inactif',
        
        // Orders
        orderNumber: 'N° Commande',
        customer: 'Client',
        date: 'Date',
        total: 'Total',
        orderStatus: 'Statut',
        paymentMethod: 'Méthode de paiement',
        items: 'Articles',
        addOrder: 'Ajouter une commande',
        editOrder: 'Modifier la commande',
        orderDetails: 'Détails de la commande',
        orderList: 'Liste des commandes',
        pending: 'En attente',
        processing: 'En traitement',
        shipped: 'Expédiée',
        delivered: 'Livrée',
        cancelled: 'Annulée',
        cash: 'Espèces',
        card: 'Carte',
        transfer: 'Virement',
        
        // Suppliers
        supplierName: 'Nom du fournisseur',
        contact: 'Contact',
        rating: 'Évaluation',
        addSupplier: 'Ajouter un fournisseur',
        editSupplier: 'Modifier le fournisseur',
        supplierDetails: 'Détails du fournisseur',
        supplierList: 'Liste des fournisseurs',
        
        // Messages
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
        deleteSuccess: 'Élément supprimé avec succès',
        saveSuccess: 'Enregistré avec succès',
        updateSuccess: 'Mis à jour avec succès',
        error: 'Une erreur est survenue',
        requiredField: 'Ce champ est obligatoire',
        invalidEmail: 'Email invalide',
        invalidPhone: 'Numéro de téléphone invalide',
        notFound: 'Élément introuvable',
        pdfGenerated: 'PDF généré avec succès',
        pdfError: 'Erreur lors de la génération du PDF',
        noDataToExport: 'Aucune donnée à exporter',
        
        // Charts
        salesByCategory: 'Ventes par catégorie',
        ordersByStatus: 'Commandes par statut',
        monthlyRevenue: 'Revenus mensuels',
        topProducts: 'Top produits',
        customerDistribution: 'Répartition des clients',
        
        // Filters
        all: 'Tous',
        today: 'Aujourd\'hui',
        week: 'Cette semaine',
        month: 'Ce mois',
        year: 'Cette année',
        noProducts: 'Aucun produit',
        products1to5: '1-5 produits',
        products6to10: '6-10 produits',
        products10Plus: 'Plus de 10 produits',
        
        // Other
        createdAt: 'Créé le',
        updatedAt: 'Modifié le',
        quantity: 'Quantité',
        unit: 'DH'
    },
    
    ar: {
        // Navigation
        dashboard: 'لوحة القيادة',
        products: 'المنتجات',
        categories: 'الفئات',
        customers: 'العملاء',
        orders: 'الطلبات',
        suppliers: 'الموردون',
        logout: 'تسجيل الخروج',
        welcome: 'مرحبا',
        
        // Auth
        login: 'تسجيل الدخول',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        loginButton: 'دخول',
        invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        
        // CRUD Actions
        add: 'إضافة',
        edit: 'تعديل',
        delete: 'حذف',
        save: 'حفظ',
        cancel: 'إلغاء',
        view: 'عرض التفاصيل',
        search: 'بحث...',
        filter: 'تصفية',
        export: 'تصدير CSV',
        exportPDF: 'تصدير PDF',
        back: 'رجوع',
        actions: 'الإجراءات',
        
        // Table
        itemsPerPage: 'عناصر في الصفحة',
        showing: 'عرض',
        to: 'إلى',
        of: 'من',
        entries: 'إدخالات',
        noData: 'لا توجد بيانات متاحة',
        
        // Dashboard KPIs
        totalProducts: 'إجمالي المنتجات',
        totalCategories: 'إجمالي الفئات',
        totalCustomers: 'إجمالي العملاء',
        totalOrders: 'إجمالي الطلبات',
        totalRevenue: 'إجمالي الإيرادات',
        activeSuppliers: 'الموردون النشطون',
        
        // Products
        productName: 'اسم المنتج',
        category: 'الفئة',
        price: 'السعر',
        stock: 'المخزون',
        supplier: 'المورد',
        description: 'الوصف',
        image: 'الصورة',
        addProduct: 'إضافة منتج',
        editProduct: 'تعديل المنتج',
        productDetails: 'تفاصيل المنتج',
        productList: 'قائمة المنتجات',
        addToCart: 'أضف إلى السلة',
        addedToCart: 'تم إضافة المنتج إلى السلة',
        
        // Categories
        categoryName: 'اسم الفئة',
        productCount: 'عدد المنتجات',
        addCategory: 'إضافة فئة',
        editCategory: 'تعديل الفئة',
        categoryDetails: 'تفاصيل الفئة',
        categoryList: 'قائمة الفئات',
        
        // Customers
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        phone: 'الهاتف',
        address: 'العنوان',
        city: 'المدينة',
        totalSpent: 'إجمالي الإنفاق',
        status: 'الحالة',
        addCustomer: 'إضافة عميل',
        editCustomer: 'تعديل العميل',
        customerDetails: 'تفاصيل العميل',
        customerList: 'قائمة العملاء',
        active: 'نشط',
        inactive: 'غير نشط',
        
        // Orders
        orderNumber: 'رقم الطلب',
        customer: 'العميل',
        date: 'التاريخ',
        total: 'المجموع',
        orderStatus: 'الحالة',
        paymentMethod: 'طريقة الدفع',
        items: 'العناصر',
        addOrder: 'إضافة طلب',
        editOrder: 'تعديل الطلب',
        orderDetails: 'تفاصيل الطلب',
        orderList: 'قائمة الطلبات',
        pending: 'قيد الانتظار',
        processing: 'قيد المعالجة',
        shipped: 'تم الشحن',
        delivered: 'تم التسليم',
        cancelled: 'ملغى',
        cash: 'نقدا',
        card: 'بطاقة',
        transfer: 'تحويل',
        
        // Suppliers
        supplierName: 'اسم المورد',
        contact: 'جهة الاتصال',
        rating: 'التقييم',
        addSupplier: 'إضافة مورد',
        editSupplier: 'تعديل المورد',
        supplierDetails: 'تفاصيل المورد',
        supplierList: 'قائمة الموردين',
        
        // Messages
        confirmDelete: 'هل أنت متأكد من حذف هذا العنصر؟',
        deleteSuccess: 'تم الحذف بنجاح',
        saveSuccess: 'تم الحفظ بنجاح',
        updateSuccess: 'تم التحديث بنجاح',
        error: 'حدث خطأ',
        requiredField: 'هذا الحقل مطلوب',
        invalidEmail: 'بريد إلكتروني غير صالح',
        invalidPhone: 'رقم هاتف غير صالح',
        notFound: 'العنصر غير موجود',
        pdfGenerated: 'تم إنشاء PDF بنجاح',
        pdfError: 'خطأ في إنشاء PDF',
        noDataToExport: 'لا توجد بيانات للتصدير',
        
        // Charts
        salesByCategory: 'المبيعات حسب الفئة',
        ordersByStatus: 'الطلبات حسب الحالة',
        monthlyRevenue: 'الإيرادات الشهرية',
        topProducts: 'أفضل المنتجات',
        customerDistribution: 'توزيع العملاء',
        
        // Filters
        all: 'الكل',
        today: 'اليوم',
        week: 'هذا الأسبوع',
        month: 'هذا الشهر',
        year: 'هذا العام',
        noProducts: 'لا توجد منتجات',
        products1to5: '1-5 منتجات',
        products6to10: '6-10 منتجات',
        products10Plus: 'أكثر من 10 منتجات',
        
        // Other
        createdAt: 'تاريخ الإنشاء',
        updatedAt: 'تاريخ التعديل',
        quantity: 'الكمية',
        unit: 'درهم'
    },
    
    en: {
        // Navigation
        dashboard: 'Dashboard',
        products: 'Products',
        categories: 'Categories',
        customers: 'Customers',
        orders: 'Orders',
        suppliers: 'Suppliers',
        logout: 'Logout',
        welcome: 'Welcome',
        
        // Auth
        login: 'Login',
        email: 'Email',
        password: 'Password',
        loginButton: 'Sign In',
        invalidCredentials: 'Invalid email or password',
        
        // CRUD Actions
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        view: 'View Details',
        search: 'Search...',
        filter: 'Filter',
        export: 'Export CSV',
        exportPDF: 'Export PDF',
        back: 'Back',
        actions: 'Actions',
        
        // Table
        itemsPerPage: 'Items per page',
        showing: 'Showing',
        to: 'to',
        of: 'of',
        entries: 'entries',
        noData: 'No data available',
        
        // Dashboard KPIs
        totalProducts: 'Total Products',
        totalCategories: 'Total Categories',
        totalCustomers: 'Total Customers',
        totalOrders: 'Total Orders',
        totalRevenue: 'Total Revenue',
        activeSuppliers: 'Active Suppliers',
        
        // Products
        productName: 'Product Name',
        category: 'Category',
        price: 'Price',
        stock: 'Stock',
        supplier: 'Supplier',
        description: 'Description',
        image: 'Image',
        addProduct: 'Add Product',
        editProduct: 'Edit Product',
        productDetails: 'Product Details',
        productList: 'Product List',
        addToCart: 'Add to Cart',
        addedToCart: 'Product added to cart',
        
        // Categories
        categoryName: 'Category Name',
        productCount: 'Product Count',
        addCategory: 'Add Category',
        editCategory: 'Edit Category',
        categoryDetails: 'Category Details',
        categoryList: 'Category List',
        
        // Customers
        firstName: 'First Name',
        lastName: 'Last Name',
        phone: 'Phone',
        address: 'Address',
        city: 'City',
        totalSpent: 'Total Spent',
        status: 'Status',
        addCustomer: 'Add Customer',
        editCustomer: 'Edit Customer',
        customerDetails: 'Customer Details',
        customerList: 'Customer List',
        active: 'Active',
        inactive: 'Inactive',
        
        // Orders
        orderNumber: 'Order Number',
        customer: 'Customer',
        date: 'Date',
        total: 'Total',
        orderStatus: 'Status',
        paymentMethod: 'Payment Method',
        items: 'Items',
        addOrder: 'Add Order',
        editOrder: 'Edit Order',
        orderDetails: 'Order Details',
        orderList: 'Order List',
        pending: 'Pending',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
        cash: 'Cash',
        card: 'Card',
        transfer: 'Transfer',
        
        // Suppliers
        supplierName: 'Supplier Name',
        contact: 'Contact',
        rating: 'Rating',
        addSupplier: 'Add Supplier',
        editSupplier: 'Edit Supplier',
        supplierDetails: 'Supplier Details',
        supplierList: 'Supplier List',
        
        // Messages
        confirmDelete: 'Are you sure you want to delete this item?',
        deleteSuccess: 'Successfully deleted',
        saveSuccess: 'Successfully saved',
        updateSuccess: 'Successfully updated',
        error: 'An error occurred',
        requiredField: 'This field is required',
        invalidEmail: 'Invalid email',
        invalidPhone: 'Invalid phone number',
        notFound: 'Item not found',
        pdfGenerated: 'PDF generated successfully',
        pdfError: 'Error generating PDF',
        noDataToExport: 'No data to export',
        
        // Charts
        salesByCategory: 'Sales by Category',
        ordersByStatus: 'Orders by Status',
        monthlyRevenue: 'Monthly Revenue',
        topProducts: 'Top Products',
        customerDistribution: 'Customer Distribution',
        
        // Filters
        all: 'All',
        today: 'Today',
        week: 'This Week',
        month: 'This Month',
        year: 'This Year',
        noProducts: 'No products',
        products1to5: '1-5 products',
        products6to10: '6-10 products',
        products10Plus: 'More than 10 products',
        
        // Other
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        quantity: 'Quantity',
        unit: 'DH'
    }
};

// i18n System
class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'fr';
        this.initLanguage();
    }
    
    initLanguage() {
        document.documentElement.lang = this.currentLanguage;
        if (this.currentLanguage === 'ar') {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
        } else {
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl');
        }
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.initLanguage();
        this.translatePage();
    }
    
    t(key) {
        return translations[this.currentLanguage][key] || key;
    }
    
    translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = this.t(key);
            } else {
                element.textContent = this.t(key);
            }
        });
        
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
    }
}

const i18n = new I18n();
