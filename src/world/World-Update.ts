import { updateBox } from "./box/Box-Update";
import { updateCamera } from "./camera/Camera-Update";
import {Renderer, Controller, World} from "../types/Types";

export const updateWorld = (renderer: Renderer) => (controller: Controller) => (dt: number) => (oldWorld: World): World => {
  const world = Object.assign({}, oldWorld);
  
  world.camera = updateCamera (controller) (renderer.getViewport()) (world.camera);
  world.box = updateBox (controller) (world.camera ) (dt) (world.box);

  return world;
}