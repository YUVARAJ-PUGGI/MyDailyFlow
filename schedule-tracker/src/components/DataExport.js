import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * DataExport Component
 * Allows users to download their data or share a summary.
 */
function DataExport({ tasks }) {

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `mydailyflow_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("Schedule data downloaded!");
    };

    const handleShare = () => {
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = tasks.filter(t => t.date === today);
        const completed = todayTasks.filter(t => t.completed).length;

        // Generate text summary
        let summary = `🔥 MyDailyFlow Update [${today}]\n\n`;
        summary += `✅ Completed: ${completed}/${todayTasks.length} Tasks\n`;
        summary += `🌊 Productivity Streak: Keeping the flow!\n\n`;
        summary += todayTasks.map(t => `${t.completed ? '[x]' : '[ ]'} ${t.title}`).join('\n');
        summary += `\n\nBuilt with MyDailyFlow 🚀`;

        navigator.clipboard.writeText(summary).then(() => {
            toast.success("Schedule summary copied to clipboard! Ready to share on Discord/Slack.");
        }, () => {
            toast.error("Failed to copy to clipboard.");
        });
    };

    return (
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                Data Control
            </h3>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button
                    onClick={handleDownload}
                    className="btn-secondary"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}
                >
                    <Download size={16} /> Backup JSON
                </button>

                <button
                    onClick={handleShare}
                    className="btn-primary-small"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}
                >
                    <Share2 size={16} /> Share Day
                </button>
            </div>
        </div>
    );
}

export default DataExport;
