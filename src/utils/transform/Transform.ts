import {mat4} from "gl-matrix";
import {Transform, Transform_TRS} from "../../types/Types";

export const updateTransformModel = (transform:Transform) => {
  return mat4.fromRotationTranslationScale(mat4.create(),
    transform.rotation as any,
    transform.translation as any,
    transform.scale as any
  );
}

export const createTransform = (trs?:Partial<Transform_TRS>):Transform => {
  
  const transform = {
    ...Object.assign({
      translation: [0, 0, 0],
      rotation: [0, 0, 0, 1],
      scale: [1, 1, 1]
    }, trs),
    model: mat4.create(),
    modelView: mat4.create(),
    modelViewProjection: mat4.create()
  }

  updateTransformModel(transform);

  return transform;
}