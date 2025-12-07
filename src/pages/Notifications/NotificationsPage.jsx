import { useState } from 'react';
import { Bell, Check, Trash2, Heart, FileWarning, MessageCircle, Info } from 'lucide-react';
import { notifications as mockNotifications } from '../../data/mockData';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState('all');

    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const handleDelete = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'adoption': return <Heart size={20} />;
            case 'report': return <FileWarning size={20} />;
            case 'comment': return <MessageCircle size={20} />;
            default: return <Info size={20} />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'adoption': return 'bg-pink-100 text-pink-600';
            case 'report': return 'bg-yellow-100 text-yellow-600';
            case 'comment': return 'bg-blue-100 text-blue-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                    <p className="text-gray-500">Stay updated with latest alerts</p>
                </div>
                <button
                    onClick={handleMarkAllRead}
                    className="text-sm font-medium text-gold-600 hover:text-gold-700 hover:underline"
                >
                    Mark all as read
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'unread', 'adoption', 'report'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${filter === f
                                ? 'bg-gold-500 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                {notifications
                    .filter(n => {
                        if (filter === 'all') return true;
                        if (filter === 'unread') return !n.read;
                        return n.type === filter;
                    })
                    .map((notification) => (
                        <div
                            key={notification.id}
                            className={`glass-card p-4 rounded-xl flex items-start gap-4 transition-all duration-300 ${!notification.read ? 'border-l-4 border-l-gold-500 bg-gold-50/30' : ''
                                }`}
                        >
                            <div className={`p-3 rounded-full flex-shrink-0 ${getColor(notification.type)}`}>
                                {getIcon(notification.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                        {notification.message}
                                    </p>
                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                        {notification.time}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 capitalize">
                                    {notification.type} Alert
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                {!notification.read && (
                                    <button
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        title="Mark as read"
                                    >
                                        <Check size={18} />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(notification.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                {notifications.length === 0 && (
                    <div className="text-center py-12">
                        <Bell size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-500">No notifications found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
