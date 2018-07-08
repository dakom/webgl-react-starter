import {updateWorld} from "./World-Update";
import {Renderer, World} from "../types/Types";

export const startWorld = ({ renderer, ...initialWorld}: {renderer: Renderer} & World) => {
  let world:World = initialWorld;
  let lastTs:number;

  const update = updateWorld (renderer) (initialWorld.controller);

  const tick = (frameTs: number) => {
    const dt = lastTs === undefined ? 0 : frameTs - lastTs;
    lastTs = frameTs;
    world = update (dt) (world);
    renderer.render(world);
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};
