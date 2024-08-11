import {themes} from '@/themes';

export type ThemeT = (typeof themes)['EG'];
export type ThemesT = keyof typeof themes;
export interface CreateStylesPropsT {
  scale: number;
  theme: ThemeT;
}
