import type { InjectionKey, Ref } from 'vue';
import type { MediaItem } from './types';
export const mediaContextKey: InjectionKey<{ assets: Ref<MediaItem[]>; upload: (file: File) => Promise<MediaItem> }> = Symbol('cms-media');
