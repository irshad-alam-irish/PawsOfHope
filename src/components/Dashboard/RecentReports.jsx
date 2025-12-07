import { Eye, Edit, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recentReports } from '../../data/mockData';

const RecentReports = () => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium badge-pending">
                        <AlertTriangle size={12} />
                        Pending
                    </span>
                );
            case 'in-progress':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium badge-progress">
                        <Clock size={12} />
                        In Progress
                    </span>
                );
            case 'resolved':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium badge-resolved">
                        ✓ Resolved
                    </span>
                );
            default:
                return null;
        }
    };

    const navigate = useNavigate();

    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-xl">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Recently Reported Cases</h3>
                            <p className="text-sm text-gray-500">Animals needing immediate attention</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/reports')}
                        className="px-4 py-2 bg-gold-50 text-gold-700 rounded-lg text-sm font-medium hover:bg-gold-100 transition-colors"
                    >
                        View All
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Animal
                            </th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Problem
                            </th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Reporter
                            </th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recentReports.map((report, index) => (
                            <tr
                                key={report.id}
                                className="hover:bg-gold-50/50 transition-colors group"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={report.image}
                                            alt="Reported animal"
                                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm group-hover:ring-gold-200 transition-all"
                                        />
                                        <div>
                                            <p className="text-xs text-gray-400">Report #{report.id}</p>
                                            <p className="text-sm text-gray-600">{report.date}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(report.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-700 hover:text-gold-600 transition-colors group/location"
                                        title="View on Google Maps"
                                    >
                                        <MapPin size={14} className="text-gold-500 group-hover/location:scale-110 transition-transform" />
                                        <span className="text-sm underline decoration-dotted decoration-gray-400 group-hover/location:decoration-gold-500">{report.location}</span>
                                    </a>
                                </td>
                                <td className="py-4 px-6">
                                    <p className="text-sm text-gray-700 max-w-xs truncate">
                                        {report.problem}
                                    </p>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white text-xs font-semibold">
                                            {report.reporter.charAt(0)}
                                        </div>
                                        <span className="text-sm text-gray-700">{report.reporter}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {getStatusBadge(report.status)}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => navigate(`/reports/${report.id}`)}
                                            className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/reports/${report.id}`)}
                                            className="p-2 hover:bg-gold-50 rounded-lg text-gray-400 hover:text-gold-600 transition-colors"
                                            title="Edit Report"
                                        >
                                            <Edit size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <p className="text-sm text-gray-500 text-center">
                    Showing {recentReports.length} recent reports •
                    <span className="text-red-500 font-medium"> {recentReports.filter(r => r.status === 'pending').length} pending action</span>
                </p>
            </div>
        </div>
    );
};

export default RecentReports;
