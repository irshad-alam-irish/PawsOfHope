import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, PawPrint, MessageCircle, FileWarning, Heart, Bell, Settings } from 'lucide-react';

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        {
            icon: Plus,
            label: 'Add Animal',
            path: '/animals/add',
            gradient: 'from-green-500 to-emerald-600',
            bgLight: 'bg-green-50',
            description: 'Register new animal'
        },
        {
            icon: MapPin,
            label: 'View Reports',
            path: '/reports',
            gradient: 'from-red-500 to-rose-600',
            bgLight: 'bg-red-50',
            description: 'Check all reports'
        },
        {
            icon: PawPrint,
            label: 'Manage Animals',
            path: '/animals',
            gradient: 'from-gold-500 to-amber-600',
            bgLight: 'bg-gold-50',
            description: 'View all animals'
        },
        {
            icon: MessageCircle,
            label: 'Messages',
            path: '/messages',
            gradient: 'from-blue-500 to-indigo-600',
            bgLight: 'bg-blue-50',
            description: 'Chat with users'
        },
        {
            icon: Heart,
            label: 'Adoptions',
            path: '/adoptions',
            gradient: 'from-pink-500 to-rose-600',
            bgLight: 'bg-pink-50',
            description: 'Manage requests'
        },
        {
            icon: Bell,
            label: 'Notifications',
            path: '/notifications',
            gradient: 'from-purple-500 to-violet-600',
            bgLight: 'bg-purple-50',
            description: 'View all alerts'
        }
    ];

    return (
        <div className="glass-card rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold-100 rounded-xl">
                        <Settings size={20} className="text-gold-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                        <p className="text-sm text-gray-500">Navigate faster</p>
                    </div>
                </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(action.path)}
                        className="group flex flex-col items-center p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg hover:shadow-gold-500/10 transition-all duration-300 border border-transparent hover:border-gold-200"
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <action.icon size={22} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-800 group-hover:text-gold-700 transition-colors">
                            {action.label}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                            {action.description}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
