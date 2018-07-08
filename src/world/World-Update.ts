import { updateBox } from "./box/Box-Update";
import { updateCamera } from "./camera/Camera-Update";
import {Renderer, Controller, World} from "../types/Types";

export const updateWorld = (renderer: Renderer) => (controller: Controller) => (dt: number) => (world: World): World => {
  const camera = updateCamera (controller) (renderer.getViewport()) (world.camera);
  const box = updateBox (controller) (camera) (dt) (world.box);

  return Object.assign({}, world, {camera, box});
}
