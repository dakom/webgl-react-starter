export type Transform = Transform_TRS & Readonly<{
  model: Float32Array;
  modelView: Float32Array;
  modelViewProjection: Float32Array;
}>

export type Transform_TRS = Readonly<{
  translation: Array<number>;
  rotation: Array<number>;
  scale: Array<number>;
}>