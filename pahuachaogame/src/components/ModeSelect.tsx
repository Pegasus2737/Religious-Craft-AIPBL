import { User, Users } from 'lucide-react';
import backgroundImage from '../assets/cute.png';

interface Props {
  onSelectSingle: () => void;
  onSelectMulti: () => void;
}

export default function ModeSelect({ onSelectSingle, onSelectMulti }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-4 sm:p-8">
      {/* 文化主視覺背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* 背景裝飾光暈 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--color-culture-red)] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[var(--color-culture-gold)] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      </div>

      {/* 標題區 */}
      <div className="text-center mb-8 z-10 animate-fade-in md:mb-16">
        <div className="text-5xl mb-3 animate-pulse-glow inline-block rounded-full p-3 bg-white/5 md:text-6xl md:mb-4 md:p-4">🏮</div>
        <h1 className="text-4xl font-black mb-3 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-culture-gold)] to-yellow-200 md:text-5xl md:mb-4">
          金門打花草
        </h1>
        <p className="text-xl text-gray-400 tracking-widest font-medium">AI 陣頭傳承</p>
      </div>

      {/* 選擇卡片區 */}
      <div className="flex flex-col gap-4 max-w-4xl w-full z-10 sm:flex-row md:gap-8">
        {/* 單人練習 */}
        <button
          onClick={onSelectSingle}
          className="flex-1 group relative p-1 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 hover:scale-105 hover:from-[var(--color-culture-red)] hover:to-red-900 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
          <div className="relative h-full bg-[var(--color-dark-surface)]/90 backdrop-blur-sm p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-4 md:p-8 md:gap-6">
            <div className="p-4 rounded-full bg-gray-800/50 group-hover:bg-[var(--color-culture-red)]/20 transition-colors md:p-6">
              <User size={48} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-white">單人練習</h2>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                跟著 AI 教練學習打花草的基礎與進階舞步
              </p>
            </div>
          </div>
        </button>

        {/* 組隊練習 */}
        <button
          onClick={onSelectMulti}
          className="flex-1 group relative p-1 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 hover:scale-105 hover:from-[var(--color-culture-gold)] hover:to-yellow-700 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
          <div className="relative h-full bg-[var(--color-dark-surface)]/90 backdrop-blur-sm p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-4 md:p-8 md:gap-6">
            <div className="p-4 rounded-full bg-gray-800/50 group-hover:bg-[var(--color-culture-gold)]/20 transition-colors md:p-6">
              <Users size={48} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-white">組隊練習</h2>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                與夥伴一起挑戰打花草雙人舞步
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
