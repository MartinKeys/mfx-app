import { ConsoleConfig } from './console-config';

export interface SceneConfig {
  consoles: {
    [consoleType: string]: ConsoleConfig;
  };
}