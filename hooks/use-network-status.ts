import { useState, useEffect } from 'react';

/**
 * useNetworkStatus
 * 跟踪在线/离线状态与网络连接质量
 * 
 * @example
 * const { isOnline, connectionType, effectiveType } = useNetworkStatus();
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    const updateConnectionInfo = () => {
      const nav = navigator as Navigator & {
        connection?: { effectiveType?: string; type?: string };
      };
      setConnectionType(nav.connection?.effectiveType || nav.connection?.type || null);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateConnectionInfo();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return { isOnline, connectionType };
}
