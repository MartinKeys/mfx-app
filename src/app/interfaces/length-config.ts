import { Vector3 } from './vector3';

export interface LengthConfig {
  cameraPosition: Vector3;
  OCTarget: Vector3;
  partsCount: number;
  wallScale: Vector3;
  partLength: number;
  labelFontSizePX: string;
}