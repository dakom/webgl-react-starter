import { updateTransformModel } from "../../utils/transform/Transform";
import { mat4 } from "gl-matrix";
import {Controller, Camera, Box} from "../../types/Types";
import { doRotate} from "./updates/Box-Rotate";


export const updateBox = (controller: Controller) => (camera: Camera) => (dt: number) => (box: Box): Box => {
  const transform = doRotate (controller) (dt) (box.props.transform);

  const model = updateTransformModel(transform);
  
  const modelView = mat4.multiply(mat4.create(), 
    camera.view as any, 
    model,
  );

  const modelViewProjection = mat4.multiply(mat4.create(),
    camera.projection as any,
    modelView,
    
  );

  //This is a bit ugly, but it's nice to keep things immutable
  //Real-world usage would use partial.lenses, ramda, etc.
  return Object.assign({}, box, {
    props: Object.assign({}, box.props, {
      transform: Object.assign({}, transform, 
        {  model, modelView, modelViewProjection }
      )
    })
  });
};
