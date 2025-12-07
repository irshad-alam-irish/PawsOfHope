import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import { adoptionTrendData } from '../../data/mockData';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AdoptionTrendChart = () => {
    const data = {
        labels: adoptionTrendData.labels,
        datasets: [
            {
                label: 'Adoptions',
                data: adoptionTrendData.data,
                fill: true,
                borderColor: '#e5a11c',
                backgroundColor: 'rgba(229, 161, 28, 0.1)',
                tension: 0.4,
                pointBackgroundColor: '#e5a11c',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#3d2e1e',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#e5a11c',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return `${context.parsed.y} adoptions`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#9ca3af'
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    color: '#9ca3af'
                },
                beginAtZero: true
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    // Calculate total and growth
    const total = adoptionTrendData.data.reduce((a, b) => a + b, 0);
    const lastMonth = adoptionTrendData.data[adoptionTrendData.data.length - 1];
    const prevMonth = adoptionTrendData.data[adoptionTrendData.data.length - 2];
    const growth = ((lastMonth - prevMonth) / prevMonth * 100).toFixed(1);

    return (
        <div className="glass-card rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Adoption Trends</h3>
                    <p className="text-sm text-gray-500">Monthly adoption statistics</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                    <TrendingUp size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-600">+{growth}%</span>
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 mb-6">
                <div>
                    <p className="text-2xl font-bold text-gray-800">{total}</p>
                    <p className="text-xs text-gray-500">Total This Year</p>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div>
                    <p className="text-2xl font-bold text-gold-600">{lastMonth}</p>
                    <p className="text-xs text-gray-500">This Month</p>
                </div>
            </div>

            {/* Chart */}
            <div className="h-64">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default AdoptionTrendChart;
