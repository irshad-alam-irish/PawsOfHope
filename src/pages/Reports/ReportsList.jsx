import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, List, Filter, AlertTriangle, CheckCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { recentReports } from '../../data/mockData';

const ReportsList = () => {
    const [viewMode, setViewMode] = useState('list');
    const [filterStatus, setFilterStatus] = useState('all');
    const navigate = useNavigate();

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return 'badge-pending';
            case 'in-progress': return 'badge-progress';
            case 'resolved': return 'badge-resolved';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reports Management</h1>
                    <p className="text-gray-500">Track and resolve reported animal cases</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-gold-50 text-gold-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <List size={18} />
                        List View
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-gold-50 text-gold-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <Map size={18} />
                        Map View
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card p-4 rounded-xl flex items-center gap-4 border-l-4 border-yellow-400">
                    <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <h3 className="text-2xl font-bold text-gray-800">6</h3>
                    </div>
                </div>
                <div className="glass-card p-4 rounded-xl flex items-center gap-4 border-l-4 border-blue-400">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">In Progress</p>
                        <h3 className="text-2xl font-bold text-gray-800">4</h3>
                    </div>
                </div>
                <div className="glass-card p-4 rounded-xl flex items-center gap-4 border-l-4 border-green-400">
                    <div className="p-3 bg-green-50 rounded-full text-green-600">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Resolved</p>
                        <h3 className="text-2xl font-bold text-gray-800">15</h3>
                    </div>
                </div>
            </div>

            {/* Content */}
            {viewMode === 'list' ? (
                <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">All Reports</h3>
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="text-sm border-none outline-none text-gray-600 font-medium cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Case Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Reporter</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={report.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                <div>
                                                    <p className="font-medium text-gray-800">{report.problem}</p>
                                                    <p className="text-xs text-gray-500">{report.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(report.location)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-600 text-sm hover:text-gold-600 transition-colors group/location"
                                                title="View on Google Maps"
                                            >
                                                <MapPin size={14} className="text-gold-500 group-hover/location:scale-110 transition-transform" />
                                                <span className="underline decoration-dotted decoration-gray-400 group-hover/location:decoration-gold-500">{report.location}</span>
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {report.reporter.charAt(0)}
                                                </div>
                                                <span className="text-sm text-gray-700">{report.reporter}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => navigate(`/reports/${report.id}`)}
                                                className="text-gold-600 hover:text-gold-700 font-medium text-sm"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="glass-card rounded-2xl p-4 h-[600px] relative overflow-hidden bg-gray-100 flex items-center justify-center">
                    {/* Placeholder Map */}
                    <div className="text-center">
                        <Map size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">Map View Integration</h3>
                        <p className="text-gray-400 max-w-md mx-auto mt-2">
                            Google Maps or Leaflet integration would go here, showing pins for all report locations.
                        </p>
                    </div>

                    {/* Mock Pins */}
                    <div className="absolute top-1/4 left-1/4 animate-bounce">
                        <MapPin size={32} className="text-red-500 drop-shadow-lg" />
                    </div>
                    <div className="absolute top-1/2 right-1/3 animate-bounce delay-75">
                        <MapPin size={32} className="text-yellow-500 drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-1/3 left-1/2 animate-bounce delay-150">
                        <MapPin size={32} className="text-green-500 drop-shadow-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsList;
