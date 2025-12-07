import { PawPrint, Heart, CheckCircle, AlertTriangle } from 'lucide-react';
import { summaryStats } from '../../data/mockData';

const SummaryCards = () => {
    const cards = [
        {
            title: 'Total Animals',
            value: summaryStats.totalAnimals,
            icon: PawPrint,
            gradient: 'from-blue-500 to-blue-600',
            bgLight: 'bg-blue-50',
            textColor: 'text-blue-600',
            change: '+12 this month',
            changeType: 'positive'
        },
        {
            title: 'Available for Adoption',
            value: summaryStats.availableForAdoption,
            icon: Heart,
            gradient: 'from-pink-500 to-rose-500',
            bgLight: 'bg-pink-50',
            textColor: 'text-pink-600',
            change: '+8 this month',
            changeType: 'positive'
        },
        {
            title: 'Adopted Animals',
            value: summaryStats.adoptedAnimals,
            icon: CheckCircle,
            gradient: 'from-emerald-500 to-green-500',
            bgLight: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            change: '+5 this month',
            changeType: 'positive'
        },
        {
            title: 'Pending Reports',
            value: summaryStats.pendingReports,
            icon: AlertTriangle,
            gradient: 'from-gold-500 to-amber-500',
            bgLight: 'bg-gold-50',
            textColor: 'text-gold-600',
            change: '2 urgent',
            changeType: 'warning'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="glass-card rounded-2xl p-5 hover-scale cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${card.bgLight} group-hover:scale-110 transition-transform duration-300`}>
                            <card.icon size={24} className={card.textColor} />
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${card.changeType === 'positive'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                            {card.change}
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">{card.title}</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full bg-gradient-to-r ${card.gradient}`}
                            style={{ width: `${(card.value / summaryStats.totalAnimals) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
