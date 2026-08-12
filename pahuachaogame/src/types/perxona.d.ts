import type { DetailedHTMLProps, HTMLAttributes } from 'react';

interface PerxonaAgentAttributes extends HTMLAttributes<HTMLElement> {
  apiKey?: string;
  agentProfileId?: string;
  presentationMode?: 'embedded' | 'bubble' | 'fullscreen';
  displayMode?: 'fullPresentation' | '3DPresentation' | '2DPresentation';
  conversationMode?: 'inputText' | 'microphone';
  appearanceMode?: 'light' | 'dark';
  readyToShowPolicy?: 'showWhenAssetsReady' | 'showWhenAssetsLoading';
  enableUserActivationCheck?: boolean | string;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'sv-agent': DetailedHTMLProps<PerxonaAgentAttributes, HTMLElement>;
    }
  }
}
