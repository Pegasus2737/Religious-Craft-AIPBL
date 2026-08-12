import { useEffect, useState } from 'react';
import { ChevronLeft, LoaderCircle, MessageCircleQuestion, ShieldCheck, Sparkles } from 'lucide-react';
import { loadPerxonaWidget } from '../../lib/loadPerxonaWidget';
import PerxonaAgent from './PerxonaAgent';

interface Props {
  onBack: () => void;
}

type SdkState = 'loading' | 'ready' | 'error';

const SUGGESTED_QUESTIONS = [
  '打花草是什麼？',
  '表演裡有哪些角色？',
  '鄭元和的故事是什麼？',
  '為什麼身上要畫一張臉？',
  '打七響有哪些動作？',
];

export default function KnowledgeGuide({ onBack }: Props) {
  const [sdkState, setSdkState] = useState<SdkState>('loading');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    loadPerxonaWidget()
      .then(() => {
        if (!cancelled) setSdkState('ready');
      })
      .catch((error) => {
        console.error('Failed to load Perxona widget:', error);
        if (!cancelled) setSdkState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  return (
    <main className="h-full w-full overflow-y-auto bg-gradient-to-br from-[var(--color-dark-surface)] via-[#191321] to-[#2b1518] text-white">
      <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-5 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="返回模式選擇"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm font-bold tracking-widest text-[var(--color-culture-gold)]">
              <Sparkles size={17} aria-hidden="true" />
              AI 文化導覽
            </div>
            <h1 className="text-2xl font-black sm:text-3xl">打花草文化小助理</h1>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 gap-5 lg:grid-cols-[minmax(240px,0.72fr)_minmax(520px,1.8fr)]">
          <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm lg:self-start">
            <div className="rounded-2xl bg-gradient-to-br from-[var(--color-culture-red)]/25 to-[var(--color-culture-gold)]/15 p-5">
              <MessageCircleQuestion className="mb-3 text-[var(--color-culture-gold)]" size={32} aria-hidden="true" />
              <h2 className="mb-2 text-xl font-bold">想知道什麼，直接問我</h2>
              <p className="text-sm leading-6 text-gray-300">
                從角色故事、表演特色到基本動作，都可以用中文和小助理聊聊。
              </p>
            </div>

            <section aria-labelledby="suggested-questions-heading">
              <h2 id="suggested-questions-heading" className="mb-3 text-sm font-bold tracking-wider text-gray-300">
                可以這樣問
              </h2>
              <ul className="space-y-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <li key={question} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-200">
                    {question}
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-xs leading-5 text-blue-100">
              <ShieldCheck className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
              <p>對話服務由 Perxona 提供。請勿輸入姓名、電話或其他個人資料。</p>
            </div>
          </aside>

          <section className="flex min-h-[680px] flex-col rounded-3xl border border-[var(--color-culture-gold)]/20 bg-black/25 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:p-5">
            {sdkState === 'ready' && <PerxonaAgent />}

            {sdkState === 'loading' && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center text-gray-300" role="status">
                <LoaderCircle size={42} className="animate-spin text-[var(--color-culture-gold)]" aria-hidden="true" />
                <div>
                  <p className="font-bold text-white">正在載入文化小助理</p>
                  <p className="mt-1 text-sm">第一次開啟需要下載角色與對話元件。</p>
                </div>
              </div>
            )}

            {sdkState === 'error' && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <MessageCircleQuestion size={48} className="text-gray-500" aria-hidden="true" />
                <div>
                  <p className="text-lg font-bold">小助理目前無法載入</p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                    請檢查網路後再試一次。本機環境不在 Perxona allowlist 時，也可能無法完成連線。
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSdkState('loading');
                    setRetryCount((count) => count + 1);
                  }}
                  className="rounded-xl bg-[var(--color-culture-gold)] px-5 py-2.5 font-bold text-black transition-colors hover:bg-yellow-300"
                >
                  重新載入
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
