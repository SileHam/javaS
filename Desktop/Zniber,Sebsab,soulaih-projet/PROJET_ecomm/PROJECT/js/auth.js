// Authentication System,recherche usr et cree une session dans LS.
class Auth {
    static login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            const session = {
                email: user.email,
                role: user.role,
                name: user.name,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('session', JSON.stringify(session));
            return { success: true, user: session };
        }
        return { success: false, message: 'Invalid credentials' };
    }
    
        //Supp ss -> index.

    static logout() {
        localStorage.removeItem('session');
        window.location.href = 'index.html';
    }
    
        //acces au SS.
    static isAuthenticated() {
        return localStorage.getItem('session') !== null;
    }
    //
    static getSession() {
        const session = localStorage.getItem('session');
        return session ? JSON.parse(session) : null;
    }
    //
    static getRole() {
        const session = this.getSession();
        return session ? session.role : null;
    }
    

        //check role.
    static isAdmin() {
        return this.getRole() === 'admin';
    }
    //
    static isUser() {
        return this.getRole() === 'user';
    }
    //
    static hasRole(role) {
        return this.getRole() === role;
    }
    

        //Pas authF
    static requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
        }
    }
    

        //check role, affiche
    static requireRole(role) {
        this.requireAuth();
        const currentRole = this.getRole();
        if (currentRole !== role) {
            showToast('Accès refusé. Permissions insuffisantes.', 'error');
            window.location.href = 'dashboard.html';
        }
    }
    //
    static requireAdmin() {
        this.requireRole('admin');
    }

    //wrrapers
    static canEdit() {
        return this.isAdmin();
    }
    
    static canDelete() {
        return this.isAdmin();
    }
    //
    static canCreate() {
        return this.isAdmin();
    }
}

// Check auth on protected pages
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
    
    if (!isIndexPage) {
        Auth.requireAuth();
    }
});
