import { ModelConfig } from './model-config';

export interface ModelsConfig {
  models: { [key: string]: ModelConfig };
}