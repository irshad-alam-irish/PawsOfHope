import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { reportStatusData } from '../../data/mockData';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ReportStatusChart = () => {
    const total = reportStatusData.data.reduce((a, b) => a + b, 0);

    const data = {
        labels: reportStatusData.labels,
        datasets: [
            {
                data: reportStatusData.data,
                backgroundColor: [
                    '#fbbf24', // Pending - Yellow
                    '#3b82f6', // In Progress - Blue
                    '#10b981'  // Resolved - Green
                ],
                borderColor: [
                    '#f59e0b',
                    '#2563eb',
                    '#059669'
                ],
                borderWidth: 2,
                hoverOffset: 8,
                spacing: 4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
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
                callbacks: {
                    label: function (context) {
                        const percentage = ((context.raw / total) * 100).toFixed(1);
                        return `${context.label}: ${context.raw} (${percentage}%)`;
                    }
                }
            }
        }
    };

    const statusDetails = [
        { label: 'Pending', value: reportStatusData.data[0], color: 'bg-yellow-400', textColor: 'text-yellow-600' },
        { label: 'In Progress', value: reportStatusData.data[1], color: 'bg-blue-500', textColor: 'text-blue-600' },
        { label: 'Resolved', value: reportStatusData.data[2], color: 'bg-emerald-500', textColor: 'text-emerald-600' }
    ];

    return (
        <div className="glass-card rounded-2xl p-6 h-full">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Report Status</h3>
                <p className="text-sm text-gray-500">Current report breakdown</p>
            </div>

            <div className="flex items-center gap-6">
                {/* Chart */}
                <div className="relative w-40 h-40 flex-shrink-0">
                    <Doughnut data={data} options={options} />
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">{total}</span>
                        <span className="text-xs text-gray-500">Total</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-4">
                    {statusDetails.map((status, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                                <span className="text-sm text-gray-600">{status.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-lg font-bold ${status.textColor}`}>{status.value}</span>
                                <span className="text-xs text-gray-400">
                                    ({((status.value / total) * 100).toFixed(0)}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Row */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="text-sm text-gold-600 font-medium hover:text-gold-700 transition-colors">
                    View All Reports →
                </button>
            </div>
        </div>
    );
};

export default ReportStatusChart;
