import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Clock, PieChart as PieIcon, Activity } from 'lucide-react';
import { getMinutesFromTime } from '../utils/schedulingUtils';

/**
 * AnalyticsDashboard Component
 * Visualizes task data: Distribution (Pie), Productivity (Area), and Timeline.
 */
function AnalyticsDashboard({ tasks }) {

    // 1. Task Distribution (Pie Chart) - By Category
    const pieData = useMemo(() => {
        const counts = {};
        tasks.forEach(task => {
            counts[task.category] = (counts[task.category] || 0) + 1;
        });
        return Object.keys(counts).map(key => ({
            name: key,
            value: counts[key]
        }));
    }, [tasks]);

    const COLORS = ['#00f0ff', '#7000ff', '#ff0055', '#f59e0b', '#10b981'];

    // 2. Productivity Flow (Area Chart) - Last 7 Days
    const areaData = useMemo(() => {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];

            // Count completed tasks for this date (using completion date or target date if done)
            // Determining "Tasks Completed" for a day:
            // If task.completedAt falls on this day, count it.
            const count = tasks.filter(t => {
                if (!t.completedAt) return false;
                return t.completedAt.startsWith(dateStr);
            }).length;

            data.push({
                name: d.toLocaleDateString('en-US', { weekday: 'short' }),
                completed: count
            });
        }
        return data;
    }, [tasks]);

    // 3. Daily Timeline (Custom Gantt) - For Today's Tasks
    const timelineTasks = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        return tasks
            .filter(t => t.date === today && t.startTime24 && t.endTime24)
            .sort((a, b) => a.startTime24.localeCompare(b.startTime24));
    }, [tasks]);

    return (
        <div className="analytics-dashboard fade-in" style={{ paddingBottom: '40px' }}>

            {/* Top Row: Pie and Area Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>

                {/* Task Distribution */}
                <div className="glass-panel tilt-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <PieIcon size={20} color="#00f0ff" />
                        <h3 style={{ margin: 0, color: 'white' }}>Task Distribution</h3>
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Productivity Flow */}
                <div className="glass-panel tilt-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <Activity size={20} color="#7000ff" />
                        <h3 style={{ margin: 0, color: 'white' }}>Productivity Flow (7 Days)</h3>
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaData}>
                                <defs>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7000ff" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#7000ff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="var(--text-muted)" />
                                <YAxis stroke="var(--text-muted)" />
                                <Tooltip
                                    contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Area type="monotone" dataKey="completed" stroke="#7000ff" fillOpacity={1} fill="url(#colorCompleted)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            {/* Bottom Row: Daily Timeline */}
            <div className="glass-panel tilt-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <Clock size={20} color="#ff0055" />
                    <h3 style={{ margin: 0, color: 'white' }}>Daily Timeline (Today)</h3>
                </div>

                <div style={{ position: 'relative', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                    {/* Time markers (simplified) */}
                    <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                    {timelineTasks.length > 0 ? timelineTasks.map(task => {
                        const startMin = getMinutesFromTime(task.startTime24);
                        const endMin = getMinutesFromTime(task.endTime24);
                        // Day is 0 to 1440 minutes.
                        const left = (startMin / 1440) * 100;
                        const width = ((endMin - startMin) / 1440) * 100;

                        return (
                            <div
                                key={task.id}
                                title={`${task.title} (${task.displayStart} - ${task.displayEnd})`}
                                style={{
                                    position: 'absolute',
                                    left: `${left}%`,
                                    width: `${width}%`,
                                    top: '20%',
                                    height: '60%',
                                    background: 'linear-gradient(90deg, #00f0ff, #7000ff)',
                                    borderRadius: '6px',
                                    boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)',
                                    cursor: 'pointer',
                                    opacity: 0.9,
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        );
                    }) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                            No scheduled tasks for today
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <span>12 AM</span>
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                </div>
            </div>

        </div>
    );
}

AnalyticsDashboard.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default AnalyticsDashboard;
