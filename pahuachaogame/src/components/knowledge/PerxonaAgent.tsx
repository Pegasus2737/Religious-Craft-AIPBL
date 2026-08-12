import { useEffect, useRef, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { PERXONA_CONFIG } from '../../constants/perxona';

type LifeStatus =
  | 'disconnected'
  | 'agent-preparation'
  | 'downloading-assets'
  | 'connection-start'
  | 'connection-done'
  | 'ready';

interface LifeStatusEventDetail {
  status: LifeStatus;
}

const STATUS_TEXT: Record<LifeStatus, string> = {
  disconnected: '小助理連線中斷，正在嘗試重新連線…',
  'agent-preparation': '正在準備文化小助理…',
  'downloading-assets': '正在下載角色素材…',
  'connection-start': '正在連接 Perxona 服務…',
  'connection-done': '連線完成，正在準備對話…',
  ready: '小助理已準備好，可以開始提問！',
};

export default function PerxonaAgent() {
  const agentRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<LifeStatus>('agent-preparation');

  useEffect(() => {
    const agent = agentRef.current;
    if (!agent) return;

    const handleLifeStatus = (event: Event) => {
      const detail = (event as CustomEvent<LifeStatusEventDetail>).detail;
      if (detail?.status && detail.status in STATUS_TEXT) {
        setStatus(detail.status);
      }
    };

    agent.addEventListener('life-status', handleLifeStatus);
    return () => agent.removeEventListener('life-status', handleLifeStatus);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        className={`mb-3 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
          status === 'ready'
            ? 'bg-green-500/15 text-green-300'
            : 'bg-[var(--color-culture-gold)]/10 text-[var(--color-culture-gold)]'
        }`}
        role="status"
        aria-live="polite"
      >
        {status !== 'ready' && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />}
        {STATUS_TEXT[status]}
      </div>

      <div className="min-h-[560px] flex-1 overflow-hidden rounded-2xl bg-black/30">
        <sv-agent
          ref={agentRef}
          apiKey={PERXONA_CONFIG.apiKey}
          agentProfileId={PERXONA_CONFIG.agentProfileId}
          presentationMode="embedded"
          displayMode="fullPresentation"
          conversationMode="inputText"
          appearanceMode="dark"
          readyToShowPolicy="showWhenAssetsLoading"
          enableUserActivationCheck="true"
        />
      </div>
    </div>
  );
}
