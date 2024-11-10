import { LengthConfig } from './length-config';

export interface ConsoleConfig {
  modelsCount: number;
  [lengthKey: string]: LengthConfig | number; // lengthKey could be "200", "300", etc.
}