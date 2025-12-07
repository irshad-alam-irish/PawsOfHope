import { useState } from 'react';
import { User, Lock, Bell, Shield, Save, Camera, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);

    // Mock Form State
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Admin User',
        email: user?.email || 'admin@pawofhope.org',
        role: 'Administrator',
        bio: 'Passionate about animal welfare and technology.'
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        weeklyDigest: false,
        newAdoptions: true,
        newReports: true
    });

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, show success toast here
        }, 1000);
    };

    return (
        <div className="max-w-5xl mx-auto animate-fadeIn">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-500">Manage your account preferences and settings</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="glass-card rounded-2xl overflow-hidden p-2">
                        {[
                            { id: 'profile', label: 'My Profile', icon: User },
                            { id: 'security', label: 'Security', icon: Lock },
                            { id: 'notifications', label: 'Notifications', icon: Bell },
                            { id: 'team', label: 'Team Members', icon: Shield },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                                        ? 'bg-gold-50 text-gold-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}

                        <div className="my-2 border-t border-gray-100"></div>

                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            {/* Profile Card */}
                            <div className="glass-card p-6 rounded-2xl">
                                <h2 className="text-lg font-bold text-gray-800 mb-6">Profile Information</h2>

                                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                                    <div className="relative group cursor-pointer">
                                        <div className="w-24 h-24 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 text-3xl font-bold border-4 border-white shadow-md overflow-hidden">
                                            {user?.avatar ? (
                                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                profileData.name.charAt(0)
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1 w-full space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                            <textarea
                                                rows="3"
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 px-6 py-2 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-xl transition-all disabled:opacity-70"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-lg font-bold text-gray-800 mb-6">Security Settings</h2>

                            <div className="space-y-6 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-400 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-400 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-400 outline-none" />
                                </div>

                                <div className="pt-4">
                                    <button className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition-all">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="glass-card p-6 rounded-2xl">
                            <h2 className="text-lg font-bold text-gray-800 mb-6">Notification Preferences</h2>

                            <div className="space-y-6">
                                {[
                                    { id: 'email', title: 'Email Notifications', desc: 'Receive daily updates via email' },
                                    { id: 'push', title: 'Push Notifications', desc: 'Receive real-time alerts on your device' },
                                    { id: 'newAdoptions', title: 'New Adoption Requests', desc: 'Get notified when someone applies for adoption' },
                                    { id: 'newReports', title: 'New Reports', desc: 'Get notified when a new case is reported' },
                                ].map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-2">
                                        <div>
                                            <h3 className="font-medium text-gray-800">{item.title}</h3>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notifications[item.id]}
                                                onChange={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'team' && (
                        <div className="glass-card p-6 rounded-2xl text-center py-12">
                            <Shield size={48} className="mx-auto text-gray-200 mb-4" />
                            <h3 className="text-lg font-bold text-gray-800">Team Management</h3>
                            <p className="text-gray-500 max-w-md mx-auto mt-2">
                                You are the only administrator currently. Invite team members feature coming soon.
                            </p>
                            <button className="mt-6 px-6 py-2 bg-gold-50 text-gold-700 font-medium rounded-xl hover:bg-gold-100 transition-colors">
                                Invite Member
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
