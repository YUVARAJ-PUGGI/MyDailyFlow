import React, { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';

const ExamCountdown = () => {
    // Initial dummy data
    const [exams, setExams] = useState([
        { id: 1, subject: 'Data Structures', date: '2025-12-25' },
        { id: 2, subject: 'Operating Systems', date: '2026-01-10' }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [newExam, setNewExam] = useState({ subject: '', date: '' });

    const getDaysRemaining = (examDate) => {
        const today = new Date();
        const exam = new Date(examDate);
        const diffTime = exam - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const handleAddExam = (e) => {
        e.preventDefault();
        if (newExam.subject && newExam.date) {
            setExams([...exams, { id: Date.now(), ...newExam }]);
            setNewExam({ subject: '', date: '' });
            setShowForm(false);
        }
    };

    const deleteExam = (id) => {
        setExams(exams.filter(e => e.id !== id));
    };

    return (
        <div className="widget-card glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Exam Countdown
                </h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                >
                    <Plus size={18} />
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleAddExam} style={{ marginBottom: '16px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={newExam.subject}
                        onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                        style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                    />
                    <input
                        type="date"
                        value={newExam.date}
                        onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                        style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                    />
                    <button type="submit" className="btn-primary-small" style={{ width: '100%' }}>Add</button>
                </form>
            )}

            <div className="exam-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exams.map(exam => {
                    const days = getDaysRemaining(exam.date);
                    return (
                        <div key={exam.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{exam.subject}</div>
                                <div style={{ fontSize: '12px', color: days <= 3 ? 'var(--accent)' : 'var(--text-muted)' }}>
                                    {days > 0 ? `${days} days left` : 'Today!'}
                                </div>
                            </div>
                            <button
                                onClick={() => deleteExam(exam.id)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', opacity: 0.5 }}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExamCountdown;
