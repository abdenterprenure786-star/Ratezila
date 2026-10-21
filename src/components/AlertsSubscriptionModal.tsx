import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Send,
  ShieldCheck,
  Flame,
  Fuel,
  Coins,
  Sun,
  Smartphone,
  RefreshCw,
} from 'lucide-react';
import {
  notificationManager,
  AlertPreferences,
  defaultAlertPreferences,
} from '../services/firebaseMessaging.js';

interface AlertsSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertsSubscriptionModal: React.FC<AlertsSubscriptionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [preferences, setPreferences] = useState<AlertPreferences>(defaultAlertPreferences);
  const [permissionState, setPermissionState] = useState<NotificationPermission>('default');
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [testNotificationSent, setTestNotificationSent] = useState<string | null>(null);
  const [activeFCMToken, setActiveFCMToken] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setPermissionState(notificationManager.getPermissionState());
      const stored = notificationManager.getStoredPreferences();
      setPreferences(stored);
      // Initialize Service Worker
      notificationManager.initServiceWorker().then(() => {
        notificationManager.retrieveFCMToken().then((token) => {
          if (token) setActiveFCMToken(token);
        });
      });
    }
  }, [isOpen]);

  const handleRequestPermission = async () => {
    setIsSubscribing(true);
    try {
      const perm = await notificationManager.requestPermission();
      setPermissionState(perm);
      if (perm === 'granted') {
        const token = await notificationManager.retrieveFCMToken();
        setActiveFCMToken(token);
        await notificationManager.savePreferences({
          ...preferences,
          fcmToken: token,
        });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    try {
      if (permissionState !== 'granted') {
        const perm = await notificationManager.requestPermission();
        setPermissionState(perm);
      }
      await notificationManager.savePreferences({
        ...preferences,
        fcmToken: activeFCMToken,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleSendTestNotification = async (type: 'gold' | 'fuel' | 'daily') => {
    setTestNotificationSent(type);
    const success = await notificationManager.sendTestNotification(type);
    // Also trigger server alert broadcast
    await fetch('/api/notifications/test-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    }).catch(() => {});

    setTimeout(() => {
      setTestNotificationSent(null);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#08170e] border border-[#ffd700]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#b39700] flex items-center justify-center text-[#050d08]">
            <Bell className="w-5 h-5 font-bold" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Daily Market Alerts & Price Drop Notifications</h3>
            <span className="text-xs text-emerald-400 font-medium">
              Firebase Cloud Messaging (FCM) Service Worker Engine
            </span>
          </div>
        </div>

        {/* Permission Status Banner */}
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
            permissionState === 'granted'
              ? 'bg-[#061e10] border-emerald-500/40'
              : 'bg-[#181106] border-amber-500/40'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {permissionState === 'granted' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold text-white block">
                Browser Notification Permission: {permissionState.toUpperCase()}
              </span>
              <p className="text-slate-300 mt-0.5">
                {permissionState === 'granted'
                  ? 'FCM Service Worker is actively listening for background price drop alerts and OGRA revisions.'
                  : 'Enable browser notifications so RateZilla can notify you when Gold drops or Petrol revises.'}
              </p>
            </div>
          </div>

          {permissionState !== 'granted' && (
            <button
              onClick={handleRequestPermission}
              disabled={isSubscribing}
              className="px-4 py-2 bg-[#ffd700] hover:bg-[#ffe033] text-[#050d08] font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-md"
            >
              Enable Notifications
            </button>
          )}
        </div>

        {/* Alert Triggers Form */}
        <form onSubmit={handleSavePreferences} className="space-y-5">
          {/* 1. Gold Price Drop Trigger */}
          <div className="p-4 rounded-xl bg-[#050d08] border border-[#00401a] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#ffd700]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Sarafa Gold Price Drop Alert
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.goldAlertEnabled}
                  onChange={(e) =>
                    setPreferences({ ...preferences, goldAlertEnabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#0e2416] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ffd700]"></div>
              </label>
            </div>

            <p className="text-xs text-slate-400">
              Receive a high-priority push notification whenever 24K Gold drops below your target buying rate:
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-mono">Notify if 24K drops below:</span>
              <div className="flex items-center rounded-lg border border-[#00401a] bg-[#08170e] px-3 py-1.5 focus-within:border-[#ffd700]">
                <span className="text-slate-400 text-xs font-mono mr-1.5">Rs.</span>
                <input
                  type="number"
                  step="500"
                  value={preferences.goldTargetDropPrice}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      goldTargetDropPrice: parseInt(e.target.value) || 280000,
                    })
                  }
                  disabled={!preferences.goldAlertEnabled}
                  className="w-28 bg-transparent text-sm text-white font-mono font-bold outline-none disabled:opacity-50"
                />
                <span className="text-slate-400 text-xs font-mono ml-1.5">/ Tola</span>
              </div>
            </div>
          </div>

          {/* 2. OGRA Petrol Price Drop Alert */}
          <div className="p-4 rounded-xl bg-[#050d08] border border-[#00401a] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  OGRA Petroleum Revision Alert
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.petrolAlertEnabled}
                  onChange={(e) =>
                    setPreferences({ ...preferences, petrolAlertEnabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#0e2416] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ffd700]"></div>
              </label>
            </div>

            <p className="text-xs text-slate-400">
              Sent at midnight on the 1st and 15th of each month immediately upon Ministry of Energy notification release.
            </p>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.petrolPriceDropOnly}
                onChange={(e) =>
                  setPreferences({ ...preferences, petrolPriceDropOnly: e.target.checked })
                }
                disabled={!preferences.petrolAlertEnabled}
                className="accent-[#ffd700] w-4 h-4 cursor-pointer"
              />
              <span>Only notify if petrol/diesel price decreases (price relief alerts)</span>
            </label>
          </div>

          {/* 3. Daily 10:00 AM Morning Market Pulse */}
          <div className="p-4 rounded-xl bg-[#050d08] border border-[#00401a] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  10:00 AM Morning Market Digest
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.dailyMorningBriefing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, dailyMorningBriefing: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#0e2416] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ffd700]"></div>
              </label>
            </div>

            <p className="text-xs text-slate-400">
              A single morning bulletin with today&apos;s opening Sarafa Gold spot, SBP interbank Dollar rate, and Mandi wheat rates.
            </p>
          </div>

          {/* FCM Edge Token Detail */}
          <div className="p-3 bg-[#030a05] rounded-xl border border-[#00401a]/50 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span className="truncate max-w-[400px]">
              FCM Channel: <strong className="text-slate-200">{activeFCMToken || 'Registering background worker...'}</strong>
            </span>
            <span className="text-emerald-400 text-[10px] shrink-0 font-sans">
              ServiceWorker Ready
            </span>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSubscribing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#e6c200] hover:from-[#ffdf33] hover:to-[#ffd700] text-[#050d08] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isSubscribing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving Preferences...</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#050d08]" />
                <span>Subscription Preferences Saved!</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#050d08]" />
                <span>Save Alert Preferences</span>
              </>
            )}
          </button>
        </form>

        {/* Test Notification Simulator */}
        <div className="pt-4 border-t border-[#00401a] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Test Service Worker Push Alerts:
            </span>
            {testNotificationSent && (
              <span className="text-[11px] text-emerald-400 font-mono font-semibold animate-pulse">
                Notification dispatched to Service Worker!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleSendTestNotification('gold')}
              className="p-2.5 rounded-lg bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] hover:border-[#ffd700]/50 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Coins className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Test Gold Alert</span>
            </button>

            <button
              type="button"
              onClick={() => handleSendTestNotification('fuel')}
              className="p-2.5 rounded-lg bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] hover:border-[#ffd700]/50 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Fuel className="w-3.5 h-3.5 text-emerald-400" />
              <span>Test Petrol Alert</span>
            </button>

            <button
              type="button"
              onClick={() => handleSendTestNotification('daily')}
              className="p-2.5 rounded-lg bg-[#050d08] hover:bg-[#0c2415] border border-[#00401a] hover:border-[#ffd700]/50 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Morning Pulse</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
