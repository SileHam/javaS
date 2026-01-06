// Initial Data for E-commerce Application
const initialData = {
    products: [
        { id: 1, name: 'Laptop HP ProBook', categoryId: 1, price: 12500, stock: 15, supplierId: 1, description: 'Laptop professionnel haute performance', image: 'images/product-1.jpeg', createdAt: '2025-01-01' },
        { id: 2, name: 'Souris Logitech MX', categoryId: 1, price: 250, stock: 50, supplierId: 1, description: 'Souris ergonomique sans fil', image: 'images/product-2.jpeg', createdAt: '2025-01-02' },
        { id: 3, name: 'Clavier Mécanique RGB', categoryId: 1, price: 450, stock: 30, supplierId: 2, description: 'Clavier gaming RGB', image: 'images/product-3.jpeg', createdAt: '2025-01-03' },
        { id: 4, name: 'Écran Dell 27"', categoryId: 1, price: 3200, stock: 20, supplierId: 1, description: 'Écran 4K UHD', image: 'images/product-4.jpeg', createdAt: '2025-01-04' },
        { id: 5, name: 'Smartphone Samsung Galaxy', categoryId: 2, price: 8500, stock: 25, supplierId: 3, description: 'Smartphone dernière génération', image: 'images/product-5.jpeg', createdAt: '2025-01-05' },
        { id: 6, name: 'Tablette iPad Pro', categoryId: 2, price: 15000, stock: 10, supplierId: 3, description: 'Tablette professionnelle Apple', image: 'images/product-6.jpeg', createdAt: '2025-01-06' },
        { id: 7, name: 'Casque Sony WH-1000XM5', categoryId: 3, price: 1200, stock: 40, supplierId: 2, description: 'Casque audio avec réduction de bruit', image: 'images/product-7.jpeg', createdAt: '2025-01-07' },
        { id: 8, name: 'Webcam Logitech 4K', categoryId: 3, price: 650, stock: 35, supplierId: 1, description: 'Webcam professionnelle 4K', image: 'images/product-8.jpeg', createdAt: '2025-01-08' },
        { id: 9, name: 'Imprimante HP LaserJet', categoryId: 4, price: 2800, stock: 12, supplierId: 1, description: 'Imprimante laser couleur', image: 'images/product-9.jpeg', createdAt: '2025-01-09' },
        { id: 10, name: 'Routeur WiFi 6', categoryId: 5, price: 890, stock: 28, supplierId: 2, description: 'Routeur sans fil haute performance', image: 'images/product-10.jpeg', createdAt: '2025-01-10' },
        { id: 11, name: 'Disque SSD 1To', categoryId: 1, price: 780, stock: 45, supplierId: 1, description: 'Disque SSD NVMe ultra-rapide', image: 'images/product-11.jpeg', createdAt: '2025-01-11' },
        { id: 12, name: 'Carte graphique RTX', categoryId: 1, price: 9500, stock: 8, supplierId: 2, description: 'Carte graphique gaming haut de gamme', image: 'images/product-12.jpeg', createdAt: '2025-01-12' }
    ],
    categories: [
        { id: 1, name: 'Informatique', description: 'Ordinateurs et accessoires', productCount: 6, createdAt: '2025-01-01' },
        { id: 2, name: 'Téléphonie', description: 'Smartphones et tablettes', productCount: 2, createdAt: '2025-01-01' },
        { id: 3, name: 'Audio/Vidéo', description: 'Équipements audio et vidéo', productCount: 2, createdAt: '2025-01-01' },
        { id: 4, name: 'Impression', description: 'Imprimantes et scanners', productCount: 1, createdAt: '2025-01-01' },
        { id: 5, name: 'Réseau', description: 'Équipements réseau', productCount: 1, createdAt: '2025-01-01' }
    ],
    customers: [
        { id: 1, firstName: 'Ahmed', lastName: 'Bennani', email: 'ahmed.bennani@email.com', phone: '0612345678', address: '123 Rue Mohammed V, Casablanca', city: 'Casablanca', totalOrders: 5, totalSpent: 25000, createdAt: '2024-06-15', status: 'active' },
        { id: 2, firstName: 'Fatima', lastName: 'Alaoui', email: 'fatima.alaoui@email.com', phone: '0623456789', address: '45 Avenue Hassan II, Rabat', city: 'Rabat', totalOrders: 3, totalSpent: 15000, createdAt: '2024-07-20', status: 'active' },
        { id: 3, firstName: 'Youssef', lastName: 'Idrissi', email: 'youssef.idrissi@email.com', phone: '0634567890', address: '78 Boulevard Zerktouni, Casablanca', city: 'Casablanca', totalOrders: 8, totalSpent: 45000, createdAt: '2024-05-10', status: 'active' },
        { id: 4, firstName: 'Amina', lastName: 'Tazi', email: 'amina.tazi@email.com', phone: '0645678901', address: '12 Rue des FAR, Marrakech', city: 'Marrakech', totalOrders: 2, totalSpent: 8000, createdAt: '2024-08-05', status: 'active' },
        { id: 5, firstName: 'Mohamed', lastName: 'Chakib', email: 'mohamed.chakib@email.com', phone: '0656789012', address: '90 Avenue Allal Ben Abdellah, Fès', city: 'Fès', totalOrders: 6, totalSpent: 32000, createdAt: '2024-04-18', status: 'active' },
        { id: 6, firstName: 'Sanaa', lastName: 'Benjelloun', email: 'sanaa.benjelloun@email.com', phone: '0667890123', address: '34 Rue Ibn Toumert, Tanger', city: 'Tanger', totalOrders: 4, totalSpent: 18000, createdAt: '2024-09-12', status: 'inactive' }
    ],
    orders: [
        { id: 1, customerId: 1, date: '2025-01-15', status: 'delivered', total: 12750, items: [{productId: 1, quantity: 1, price: 12500}, {productId: 2, quantity: 1, price: 250}], paymentMethod: 'card' },
        { id: 2, customerId: 2, date: '2025-01-16', status: 'shipped', total: 9200, items: [{productId: 5, quantity: 1, price: 8500}, {productId: 7, quantity: 1, price: 700}], paymentMethod: 'cash' },
        { id: 3, customerId: 3, date: '2025-01-17', status: 'processing', total: 18700, items: [{productId: 4, quantity: 1, price: 3200}, {productId: 6, quantity: 1, price: 15000}, {productId: 2, quantity: 2, price: 500}], paymentMethod: 'card' },
        { id: 4, customerId: 1, date: '2025-01-18', status: 'delivered', total: 3650, items: [{productId: 3, quantity: 1, price: 450}, {productId: 4, quantity: 1, price: 3200}], paymentMethod: 'transfer' },
        { id: 5, customerId: 4, date: '2025-01-19', status: 'pending', total: 2550, items: [{productId: 8, quantity: 1, price: 650}, {productId: 10, quantity: 2, price: 1780}, {productId: 7, quantity: 1, price: 120}], paymentMethod: 'cash' },
        { id: 6, customerId: 5, date: '2025-01-20', status: 'delivered', total: 11280, items: [{productId: 9, quantity: 1, price: 2800}, {productId: 5, quantity: 1, price: 8500}], paymentMethod: 'card' },
        { id: 7, customerId: 3, date: '2025-01-21', status: 'shipped', total: 5230, items: [{productId: 3, quantity: 2, price: 900}, {productId: 11, quantity: 5, price: 3900}, {productId: 2, quantity: 1, price: 250}, {productId: 8, quantity: 1, price: 180}], paymentMethod: 'card' },
        { id: 8, customerId: 2, date: '2025-01-22', status: 'cancelled', total: 15000, items: [{productId: 6, quantity: 1, price: 15000}], paymentMethod: 'cash' },
        { id: 9, customerId: 6, date: '2025-01-23', status: 'processing', total: 7850, items: [{productId: 1, quantity: 1, price: 12500}], paymentMethod: 'transfer' },
        { id: 10, customerId: 5, date: '2025-01-24', status: 'delivered', total: 19990, items: [{productId: 12, quantity: 2, price: 19000}, {productId: 11, quantity: 1, price: 780}, {productId: 2, quantity: 1, price: 210}], paymentMethod: 'card' }
    ],
    suppliers: [
        { id: 1, name: 'TechPro Distribution', contact: 'Hassan Mekouar', email: 'contact@techpro.ma', phone: '0520123456', address: '234 Zone Industrielle Aïn Sebaâ, Casablanca', productsCount: 6, rating: 4.5, createdAt: '2023-01-15' },
        { id: 2, name: 'ElectroMaroc', contact: 'Karim Alami', email: 'info@electromaroc.ma', phone: '0537654321', address: '56 Boulevard Industriel, Rabat', productsCount: 4, rating: 4.2, createdAt: '2023-03-20' },
        { id: 3, name: 'Digital Solutions', contact: 'Nadia Chraibi', email: 'sales@digitalsolutions.ma', phone: '0522987654', address: '89 Avenue des FAR, Casablanca', productsCount: 2, rating: 4.8, createdAt: '2023-06-10' }
    ],
    users: [
        { email: 'admin@app.com', password: 'admin123', role: 'admin', name: 'Admin User' },
        { email: 'user@app.com', password: 'user123', role: 'user', name: 'Regular User' }
    ]
};

// Initialize localStorage with initial data if empty
function initializeData() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialData.products));
    } else {
        // Update existing products with new images if they have old placeholder URLs
        updateProductImages();
    }
    if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify(initialData.categories));
    }
    if (!localStorage.getItem('customers')) {
        localStorage.setItem('customers', JSON.stringify(initialData.customers));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify(initialData.orders));
    }
    if (!localStorage.getItem('suppliers')) {
        localStorage.setItem('suppliers', JSON.stringify(initialData.suppliers));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(initialData.users));
    }
}

// Update product images for existing products
function updateProductImages() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.map(product => {
        // Replace old or remote placeholder images and ecommerce1 prefixes with local images/ .jpeg
        if (!product.image || product.image.includes('placeholder.com') || product.image.includes('via.placeholder') || product.image.includes('picsum.photos') || product.image.includes('ecommerce1/')) {
            const initialProduct = initialData.products.find(p => p.id === product.id);
            if (initialProduct && initialProduct.image) {
                product.image = initialProduct.image;
            } else {
                product.image = `images/product-${product.id}.jpeg`;
            }
        } else if (product.image.match(/product-\d+\.jpg$/i)) {
            // convert old .jpg filenames to .jpeg to match provided images
            product.image = product.image.replace(/\.jpg$/i, '.jpeg');
        } else if (product.image.startsWith('ecommerce1/')) {
            product.image = product.image.replace(/^ecommerce1\//, '');
        }
        return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
}

// Reset data to initial state
function resetData() {
    localStorage.setItem('products', JSON.stringify(initialData.products));
    localStorage.setItem('categories', JSON.stringify(initialData.categories));
    localStorage.setItem('customers', JSON.stringify(initialData.customers));
    localStorage.setItem('orders', JSON.stringify(initialData.orders));
    localStorage.setItem('suppliers', JSON.stringify(initialData.suppliers));
    location.reload();
}

// Force update all product images (call this from browser console if needed)
function forceUpdateProductImages() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const imageMap = {
        1: 'images/product-1.jpeg',
        2: 'images/product-2.jpeg',
        3: 'images/product-3.jpeg',
        4: 'images/product-4.jpeg',
        5: 'images/product-5.jpeg',
        6: 'images/product-6.jpeg',
        7: 'images/product-7.jpeg',
        8: 'images/product-8.jpeg',
        9: 'images/product-9.jpeg',
        10: 'images/product-10.jpeg',
        11: 'images/product-11.jpeg',
        12: 'images/product-12.jpeg'
    };
    
    const updatedProducts = products.map(product => {
        if (imageMap[product.id]) {
            product.image = imageMap[product.id];
        } else {
            product.image = `images/product-${product.id}.jpeg`;
        }
        return product;
    });
    
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    console.log('Product images updated! Reloading page...');
    location.reload();
}
