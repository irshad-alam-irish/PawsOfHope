import { useState } from 'react';
import { Eye, Heart, MessageCircle, User, Calendar, TrendingUp, Activity } from 'lucide-react';
import { users, popularAnimals } from '../../data/mockData';

const UserActivity = () => {
    // Mock activity data
    const activities = [
        { id: 1, user: 'Rahul Sharma', action: 'viewed', target: 'Bruno', time: '2 mins ago', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 2, user: 'Priya Singh', action: 'liked', target: 'Luna', time: '15 mins ago', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
        { id: 3, user: 'Amit Kumar', action: 'commented on', target: 'Max', time: '1 hour ago', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' },
        { id: 4, user: 'Sneha Gupta', action: 'reported', target: 'Injured Dog', time: '2 hours ago', icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
        { id: 5, user: 'Vikram Patel', action: 'registered', target: '', time: '5 hours ago', icon: User, color: 'text-gold-500', bg: 'bg-gold-50' },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">User Activity</h1>
                <p className="text-gray-500">Insights into user engagement and behavior</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Eye size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Page Views</p>
                            <h3 className="text-2xl font-bold text-gray-800">12,450</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <TrendingUp size={12} /> +15% this week
                            </p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-pink-50 rounded-xl text-pink-600">
                            <Heart size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Interests</p>
                            <h3 className="text-2xl font-bold text-gray-800">856</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <TrendingUp size={12} /> +8% this week
                            </p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gold-50 rounded-xl text-gold-600">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">New Users</p>
                            <h3 className="text-2xl font-bold text-gray-800">124</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <TrendingUp size={12} /> +12% this week
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Live Activity Feed */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Live Activity Feed</h3>
                    <div className="space-y-6">
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 group">
                                <div className={`p-2 rounded-full ${activity.bg} ${activity.color} mt-1`}>
                                    <activity.icon size={16} />
                                </div>
                                <div className="flex-1 pb-6 border-b border-gray-50 last:border-0 last:pb-0 relative">
                                    {/* Timeline Line */}
                                    <div className="absolute left-[-28px] top-10 bottom-[-24px] w-0.5 bg-gray-100 group-last:hidden"></div>

                                    <p className="text-gray-800">
                                        <span className="font-semibold">{activity.user}</span>{' '}
                                        <span className="text-gray-500">{activity.action}</span>{' '}
                                        <span className="font-medium text-gold-600">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Active Users */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Most Active Users</h3>
                    <div className="space-y-4">
                        {users.map((user, index) => (
                            <div key={user.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">{user.name}</h4>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-800">{150 - (index * 20)}</p>
                                    <p className="text-xs text-gray-400">actions</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserActivity;
