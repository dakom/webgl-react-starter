import { Future } from "fluture";
import { getProjection, getView } from "./Camera-Update";
import {Renderer, Camera, CameraKind, CameraSettings} from "../../types/Types";

export const setupCamera = (renderer: Renderer) =>
  new Future<any, Camera>((reject, resolve) => { 
    const settings:CameraSettings = {
      kind: CameraKind.ORTHOGRAPHIC,
      position: [0, 0, 400],
      target: [0, 0, 0],
      far: 3000
    };

    const camera = {
      settings,
      projection: getProjection(renderer.getViewport()) (settings),
      view: getView(settings)
    };
    
    resolve(camera);
  });
