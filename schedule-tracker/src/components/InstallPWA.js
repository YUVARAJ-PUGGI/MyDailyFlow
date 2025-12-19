import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * InstallPWA Component
 * Catches the 'beforeinstallprompt' event and shows a custom install button.
 */
function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowButton(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            toast.success("Thanks for installing MyDailyFlow! 🚀");
            setDeferredPrompt(null);
            setShowButton(false);
        } else {
            console.log('User dismissed the install prompt');
        }
    };

    if (!showButton) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="btn-primary-small"
            style={{
                marginTop: '16px',
                width: '100%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
        >
            <Download size={16} /> Install App
        </button>
    );
}

export default InstallPWA;
