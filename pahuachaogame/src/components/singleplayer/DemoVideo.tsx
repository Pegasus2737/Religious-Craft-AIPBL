import { useState } from 'react';
import { Video } from 'lucide-react';
import type { DemoVideoDefinition } from '../../constants/demoVideos';

interface Props {
  demo: DemoVideoDefinition;
}

export default function DemoVideo({ demo }: Props) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const hasError = failedSource === demo.src;

  if (hasError) return null;

  return (
    <aside
      className="absolute right-3 top-24 z-30 w-28 overflow-hidden rounded-xl border-2 border-[var(--color-culture-gold)]/80 bg-black/80 shadow-[0_12px_32px_rgba(0,0,0,0.45)] sm:right-4 sm:w-32 md:right-6 md:top-28 md:w-40 lg:w-48"
      aria-label={demo.label}
    >
      <div className="flex items-center gap-1.5 border-b border-white/15 px-2 py-1.5 text-[10px] font-bold tracking-wider text-[var(--color-culture-gold)] sm:text-xs">
        <Video size={14} aria-hidden="true" />
        <span>{demo.label}</span>
      </div>
      <video
        key={demo.src}
        src={demo.src}
        className="block aspect-[9/16] w-full bg-white object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setFailedSource(demo.src)}
      />
    </aside>
  );
}
