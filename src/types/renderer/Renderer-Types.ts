import {World} from "../world/World-Types";

export type Renderer = Readonly<{
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  render: (world: World) => void;
  getViewport: () => {width: number, height: number};
}>