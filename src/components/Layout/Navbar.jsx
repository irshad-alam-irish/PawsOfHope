import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Bell,
    ChevronDown,
    User,
    Settings,
    LogOut,
    X,
    PawPrint,
    FileWarning,
    Users,
    Heart
} from 'lucide-react';
import { allAnimals, recentReports, users, adoptionRequests, notifications } from '../../data/mockData';

const Navbar = ({ isCollapsed }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const searchRef = useRef(null);
    const profileRef = useRef(null);
    const notificationRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setSearchQuery('');
                setSearchResults(null);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Universal Search Function
    const handleSearch = (query) => {
        setSearchQuery(query);

        if (query.length < 2) {
            setSearchResults(null);
            return;
        }

        const lowerQuery = query.toLowerCase();

        // Search Animals
        const matchedAnimals = allAnimals.filter(
            animal =>
                animal.name.toLowerCase().includes(lowerQuery) ||
                animal.type.toLowerCase().includes(lowerQuery) ||
                animal.breed.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);

        // Search Reports
        const matchedReports = recentReports.filter(
            report =>
                report.location.toLowerCase().includes(lowerQuery) ||
                report.problem.toLowerCase().includes(lowerQuery) ||
                report.reporter.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);

        // Search Users
        const matchedUsers = users.filter(
            u =>
                u.name.toLowerCase().includes(lowerQuery) ||
                u.email.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);

        // Search Adoption Requests
        const matchedAdoptions = adoptionRequests.filter(
            req =>
                req.userName.toLowerCase().includes(lowerQuery) ||
                req.animalName.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);

        setSearchResults({
            animals: matchedAnimals,
            reports: matchedReports,
            users: matchedUsers,
            adoptions: matchedAdoptions
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header
            className={`fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-30 transition-all duration-300 ${isCollapsed ? 'left-20' : 'left-64'
                }`}
        >
            <div className="flex items-center justify-between h-full px-6">
                {/* Search Bar */}
                <div ref={searchRef} className="relative flex-1 max-w-xl">
                    <div className="relative">
                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => setIsSearchOpen(true)}
                            placeholder="Search animals, reports, users, adoptions..."
                            className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-gold-400 focus:ring-4 focus:ring-gold-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSearchResults(null);
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    {/* Search Results Dropdown */}
                    {isSearchOpen && searchResults && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn max-h-[70vh] overflow-y-auto">
                            {/* Animals */}
                            {searchResults.animals.length > 0 && (
                                <div className="p-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-2">
                                        <PawPrint size={14} />
                                        Animals
                                    </div>
                                    {searchResults.animals.map(animal => (
                                        <button
                                            key={animal.id}
                                            onClick={() => {
                                                navigate(`/animals/${animal.id}`);
                                                setIsSearchOpen(false);
                                                setSearchQuery('');
                                            }}
                                            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gold-50 transition-colors"
                                        >
                                            <img
                                                src={animal.image}
                                                alt={animal.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div className="text-left">
                                                <p className="font-medium text-gray-800">{animal.name}</p>
                                                <p className="text-xs text-gray-500">{animal.breed} • {animal.type}</p>
                                            </div>
                                            <span className={`ml-auto text-xs px-2 py-1 rounded-full ${animal.status === 'available' ? 'bg-green-100 text-green-700' :
                                                    animal.status === 'adopted' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {animal.status}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Reports */}
                            {searchResults.reports.length > 0 && (
                                <div className="p-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-2">
                                        <FileWarning size={14} />
                                        Reports
                                    </div>
                                    {searchResults.reports.map(report => (
                                        <button
                                            key={report.id}
                                            onClick={() => {
                                                navigate(`/reports/${report.id}`);
                                                setIsSearchOpen(false);
                                                setSearchQuery('');
                                            }}
                                            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gold-50 transition-colors"
                                        >
                                            <img
                                                src={report.image}
                                                alt="Report"
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div className="text-left flex-1">
                                                <p className="font-medium text-gray-800 text-sm">{report.problem}</p>
                                                <p className="text-xs text-gray-500">{report.location}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${report.status === 'pending' ? 'badge-pending' :
                                                    report.status === 'in-progress' ? 'badge-progress' :
                                                        'badge-resolved'
                                                }`}>
                                                {report.status}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Users */}
                            {searchResults.users.length > 0 && (
                                <div className="p-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-2">
                                        <Users size={14} />
                                        Users
                                    </div>
                                    {searchResults.users.map(u => (
                                        <button
                                            key={u.id}
                                            onClick={() => {
                                                navigate(`/users/${u.id}`);
                                                setIsSearchOpen(false);
                                                setSearchQuery('');
                                            }}
                                            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gold-50 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-semibold">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-medium text-gray-800">{u.name}</p>
                                                <p className="text-xs text-gray-500">{u.email}</p>
                                            </div>
                                            <span className="ml-auto text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                                {u.type}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Adoption Requests */}
                            {searchResults.adoptions.length > 0 && (
                                <div className="p-3">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-2">
                                        <Heart size={14} />
                                        Adoption Requests
                                    </div>
                                    {searchResults.adoptions.map(req => (
                                        <button
                                            key={req.id}
                                            onClick={() => {
                                                navigate(`/adoptions/${req.id}`);
                                                setIsSearchOpen(false);
                                                setSearchQuery('');
                                            }}
                                            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gold-50 transition-colors"
                                        >
                                            <img
                                                src={req.animalImage}
                                                alt={req.animalName}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div className="text-left flex-1">
                                                <p className="font-medium text-gray-800">{req.userName}</p>
                                                <p className="text-xs text-gray-500">wants to adopt {req.animalName}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${req.status === 'pending' ? 'badge-pending' :
                                                    req.status === 'approved' ? 'badge-resolved' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* No Results */}
                            {searchResults.animals.length === 0 &&
                                searchResults.reports.length === 0 &&
                                searchResults.users.length === 0 &&
                                searchResults.adoptions.length === 0 && (
                                    <div className="p-8 text-center">
                                        <Search size={40} className="mx-auto text-gray-300 mb-3" />
                                        <p className="text-gray-500">No results found for "{searchQuery}"</p>
                                    </div>
                                )}
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4 ml-6">
                    {/* Notifications */}
                    <div ref={notificationRef} className="relative">
                        <button
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <Bell size={22} className="text-gray-600" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center pulse-gold">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {isNotificationOpen && (
                            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                    <span className="text-xs text-gold-600 font-medium cursor-pointer hover:underline">
                                        Mark all as read
                                    </span>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map(notif => (
                                        <div
                                            key={notif.id}
                                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.read ? 'bg-gold-50/50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.type === 'adoption' ? 'bg-pink-100 text-pink-600' :
                                                        notif.type === 'report' ? 'bg-yellow-100 text-yellow-600' :
                                                            'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    {notif.type === 'adoption' ? <Heart size={16} /> :
                                                        notif.type === 'report' ? <FileWarning size={16} /> :
                                                            <Bell size={16} />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm ${!notif.read ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                                                        {notif.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                                </div>
                                                {!notif.read && (
                                                    <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t border-gray-100">
                                    <button
                                        onClick={() => navigate('/notifications')}
                                        className="text-sm text-gold-600 font-medium hover:underline"
                                    >
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div ref={profileRef} className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <img
                                src={user?.avatar || 'https://i.pravatar.cc/40'}
                                alt="Profile"
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-gold-400 ring-offset-2"
                            />
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-semibold text-gray-800">{user?.name || 'Admin'}</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <ChevronDown size={16} className="text-gray-400 hidden md:block" />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                                <div className="p-4 border-b border-gray-100">
                                    <p className="font-semibold text-gray-800">{user?.name}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            navigate('/settings');
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                                    >
                                        <User size={18} />
                                        <span className="text-sm">My Profile</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate('/settings');
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                                    >
                                        <Settings size={18} />
                                        <span className="text-sm">Settings</span>
                                    </button>
                                    <hr className="my-2" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                                    >
                                        <LogOut size={18} />
                                        <span className="text-sm">Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
