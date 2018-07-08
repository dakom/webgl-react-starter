import { Future } from "fluture";
import {renderBox} from "../world/box/Box-Renderer";
import {Renderer, World} from "../types/Types";

export const setupRenderer = (canvas: HTMLCanvasElement) =>
  new Future<any, Renderer>((reject, resolve) => {
    const gl: WebGLRenderingContext =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      reject("Could not create context");
      return;
    }
    
    gl.enable(gl.DEPTH_TEST);
    
    let lastWidth: number;
    let lastHeight: number;

    const render = (world: World) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (lastWidth !== width || lastHeight !== height) {
        canvas.setAttribute('width', window.innerWidth.toString());
        canvas.setAttribute('height', window.innerHeight.toString());
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        lastWidth = width;
        lastHeight = height;
      }

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      renderBox(gl)(world.box);

    }

    const getViewport = () => ({
      width: canvas.clientWidth,
      height: canvas.clientHeight
    })
    
    resolve({ gl, canvas, render, getViewport});
  });


