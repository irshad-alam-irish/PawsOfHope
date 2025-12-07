import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    LayoutDashboard,
    PawPrint,
    Users,
    FileWarning,
    Heart,
    MessageCircle,
    Bell,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Dog,
    Stethoscope,
    CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            title: 'Animals',
            icon: PawPrint,
            path: '/animals',
            submenu: [
                { title: 'All Animals', icon: Dog, path: '/animals' },
                { title: 'Add New', icon: PawPrint, path: '/animals/add' },
                { title: 'Adopted', icon: CheckCircle, path: '/animals/adopted' },
                { title: 'Under Treatment', icon: Stethoscope, path: '/animals/treatment' }
            ]
        },
        {
            title: 'User Activity',
            icon: Users,
            path: '/user-activity'
        },
        {
            title: 'Reports',
            icon: FileWarning,
            path: '/reports'
        },
        {
            title: 'Adoptions',
            icon: Heart,
            path: '/adoptions'
        },
        {
            title: 'Messages',
            icon: MessageCircle,
            path: '/messages',
            badge: 3
        },
        {
            title: 'Notifications',
            icon: Bell,
            path: '/notifications',
            badge: 5
        },
        {
            title: 'Settings',
            icon: Settings,
            path: '/settings'
        }
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-full sidebar-dark z-40 transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Logo Section */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
                        <PawPrint size={22} className="text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="animate-fadeIn">
                            <h1 className="text-white font-bold text-lg">Paw of Hope</h1>
                            <p className="text-gold-400 text-xs">Admin Panel</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gold-600 transition-colors z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4 overflow-y-auto">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive
                                        ? 'bg-gradient-to-r from-gold-500/20 to-gold-600/10 text-gold-400'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                            >
                                <item.icon size={20} className="flex-shrink-0" />
                                {!isCollapsed && (
                                    <>
                                        <span className="font-medium animate-fadeIn">{item.title}</span>
                                        {item.badge && (
                                            <span className="ml-auto bg-gold-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}
                                {isCollapsed && item.badge && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {item.badge}
                                    </span>
                                )}

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-3 px-3 py-2 bg-brown-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                                        {item.title}
                                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-brown-800"></div>
                                    </div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Profile & Logout */}
            <div className="p-3 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className={`
            flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200
            ${isCollapsed ? 'justify-center' : ''}
          `}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
