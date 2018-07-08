export enum CameraKind {
  ORTHOGRAPHIC = "orthographic",
  PERSPECTIVE = "perspective"
}
export type Camera = Readonly<{
    settings: CameraSettings;
    view: Float32Array;
    projection: Float32Array;
}>;

export type CameraSettings = (CameraPerspective | CameraOrthographic) & Readonly<{
  position: Array<number>;
  target?: Array<number>;
  up?: Array<number>;
}>;

export type CameraPerspective = Readonly<{
  kind: CameraKind.PERSPECTIVE;
  fovy?: number;
  aspect?: number;
  near?: number;
  far?: number;
}>;

export type CameraOrthographic = Readonly<{
  kind: CameraKind.ORTHOGRAPHIC;
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
  near?: number;
  far?: number;
}>;