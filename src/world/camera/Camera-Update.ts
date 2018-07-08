import { mat4 } from "gl-matrix";
import {Controller, CameraSettings, Camera, CameraKind} from "../../types/Types";

interface Viewport {
  width: number;
  height: number;
}

export const updateCamera = (controller:Controller) => (viewport: Viewport) => (camera: Camera): Camera => {
  return {
    settings: camera.settings,
    projection: getProjection(viewport)(camera.settings),
    view: getView(camera.settings)
  }
};

export const getProjection = (viewport: Viewport) => (
  settings: CameraSettings
) =>
  settings.kind === CameraKind.PERSPECTIVE
    ? mat4.perspective(
        mat4.create(),
        settings.fovy === undefined 
          ? Math.PI/2 
          : settings.fovy,
        settings.aspect === undefined
          ? viewport.width / viewport.height
          : settings.aspect,
        settings.near === undefined ? 0.01 : settings.near,
        settings.far === undefined ? 1000 : settings.far
      )
    : mat4.ortho(
        mat4.create(),
        settings.left === undefined
          ? 0
          : settings.left,
        settings.right === undefined
          ? viewport.width
          : settings.right,
        settings.bottom === undefined
          ? 0
          : settings.bottom,
        settings.top === undefined
          ? viewport.height
          : settings.top,
        settings.near === undefined ? 0.01 : settings.near,
        settings.far === undefined ? 1000 : settings.far
      );

export const getView = (settings: CameraSettings) => {
  return mat4.lookAt(
    mat4.create(),
    settings.position,
    settings.target === undefined ? [0, 0, 0] : settings.target,
    settings.up === undefined ? [0, 1, 0] : settings.up
  );
};
