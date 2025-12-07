import { MessageCircle, ChevronRight } from 'lucide-react';
import { recentComments } from '../../data/mockData';

const RecentComments = () => {
    return (
        <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                        <MessageCircle size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Recent Comments</h3>
                        <p className="text-sm text-gray-500">Community activity</p>
                    </div>
                </div>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    {recentComments.length} new
                </span>
            </div>

            {/* Comments List - Scrollable */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 max-h-80">
                {recentComments.map((comment, index) => (
                    <div
                        key={comment.id}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-gold-50 transition-colors cursor-pointer group"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {/* User Info */}
                        <div className="flex items-start gap-3">
                            <img
                                src={comment.avatar}
                                alt={comment.username}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-gray-800 text-sm truncate">
                                        {comment.username}
                                    </h4>
                                    <span className="text-xs text-gray-400 flex-shrink-0">
                                        {comment.timestamp}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {comment.comment}
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-xs text-gray-400">on</span>
                                    <span className="text-xs font-medium text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full">
                                        🐾 {comment.animal}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <button className="mt-4 flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-gold-600 hover:text-gold-700 hover:bg-gold-50 rounded-xl transition-colors group">
                View All Comments
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default RecentComments;
