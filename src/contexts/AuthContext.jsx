import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (from localStorage)
        const storedUser = localStorage.getItem('pawofhope_admin');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock authentication - In production, this would be an API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Demo credentials
                if (email === 'admin@pawofhope.org' && password === 'admin123') {
                    const userData = {
                        id: 1,
                        name: 'Admin User',
                        email: 'admin@pawofhope.org',
                        role: 'admin',
                        avatar: 'https://i.pravatar.cc/150?img=68'
                    };
                    setUser(userData);
                    localStorage.setItem('pawofhope_admin', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pawofhope_admin');
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
