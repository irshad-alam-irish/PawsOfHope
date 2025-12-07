import { useAuth } from '../contexts/AuthContext';
import SummaryCards from '../components/Dashboard/SummaryCards';
import AdoptionTrendChart from '../components/Dashboard/AdoptionTrendChart';
import ReportStatusChart from '../components/Dashboard/ReportStatusChart';
import RecentReports from '../components/Dashboard/RecentReports';
import PopularAnimals from '../components/Dashboard/PopularAnimals';
import RecentComments from '../components/Dashboard/RecentComments';
import AdoptionRequests from '../components/Dashboard/AdoptionRequests';
import QuickActions from '../components/Dashboard/QuickActions';
import { Calendar, Sun, Cloud } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return { text: 'Good Morning', icon: Sun, color: 'text-yellow-500' };
        if (hour < 18) return { text: 'Good Afternoon', icon: Sun, color: 'text-orange-500' };
        return { text: 'Good Evening', icon: Cloud, color: 'text-indigo-500' };
    };

    const greeting = getGreeting();
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <greeting.icon size={24} className={greeting.color} />
                        <h1 className="text-2xl font-bold text-gray-800">
                            {greeting.text}, {user?.name?.split(' ')[0] || 'Admin'}! 👋
                        </h1>
                    </div>
                    <p className="text-gray-500">
                        Here's what's happening at Paw of Hope today.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Calendar size={18} className="text-gold-500" />
                    <span className="text-sm text-gray-600">{today}</span>
                </div>
            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Recent Reports - Priority Section */}
            <RecentReports />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <AdoptionTrendChart />
                </div>
                <div>
                    <ReportStatusChart />
                </div>
            </div>

            {/* Popular Animals & Recent Comments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PopularAnimals />
                <RecentComments />
            </div>

            {/* Adoption Requests */}
            <AdoptionRequests />

            {/* Quick Actions */}
            <QuickActions />

            {/* Footer */}
            <div className="text-center py-4">
                <p className="text-sm text-gray-400">
                    🐾 Paw of Hope Admin Dashboard • Making a difference, one paw at a time
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
