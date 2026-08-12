import { PERXONA_CONFIG } from '../constants/perxona';

const SCRIPT_ID = 'perxona-widget-sdk';
let loadPromise: Promise<void> | null = null;

export function loadPerxonaWidget(): Promise<void> {
  if (customElements.get('sv-agent')) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement('script');
    let settled = false;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      script.removeEventListener('error', handleError);
    };

    const finish = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };

    const handleError = () => {
      if (settled) return;
      settled = true;
      cleanup();
      script.remove();
      loadPromise = null;
      reject(new Error('Perxona SDK 載入失敗'));
    };

    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      loadPromise = null;
      reject(new Error('Perxona SDK 載入逾時'));
    }, 20_000);

    script.addEventListener('error', handleError, { once: true });
    void customElements.whenDefined('sv-agent').then(finish);

    if (!existingScript) {
      script.id = SCRIPT_ID;
      script.type = 'module';
      script.src = PERXONA_CONFIG.sdkUrl;
      document.head.appendChild(script);
    }
  });

  return loadPromise;
}
