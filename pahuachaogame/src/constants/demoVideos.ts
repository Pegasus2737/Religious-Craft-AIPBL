import levelOneOneVideo from '../assets/demo/level-1-1.mp4';
import levelOneTwoVideo from '../assets/demo/level-1-2.mp4';
import levelOneThreeVideo from '../assets/demo/level-1-3.mp4';

export interface DemoVideoDefinition {
  src: string;
  label: string;
}

/**
 * 示範素材只涵蓋第一章。沒有相符素材的關卡不顯示播放器，
 * 避免讓學習者看到與目標動作不一致的內容。
 */
export const DEMO_VIDEOS: Partial<Record<number, DemoVideoDefinition>> = {
  0: {
    src: levelOneTwoVideo,
    label: '合拍與拍胸示範',
  },
  1: {
    src: levelOneOneVideo,
    label: '向上滑與拍腿示範',
  },
  2: {
    src: levelOneThreeVideo,
    label: '完整打七響示範',
  },
};
