/**
 * Perxona public deployment configuration.
 *
 * The deployment key is intentionally shipped to the browser. Perxona restricts
 * it server-side to the pegasus2737.github.io hostname allowlist.
 */
export const PERXONA_CONFIG = {
  agentProfileId: '01KZTWTSJG9CJ7C3ATFZC6JJQE',
  apiKey: '6268fbde-6608-40d6-8b81-9de6013aac98',
  sdkUrl: 'https://cdn.perxona.ai/asia/prod/latest/widget/entry/index.js',
} as const;

export const PERXONA_PREVIEW_PARAM = 'perxona-preview';
