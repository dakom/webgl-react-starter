import {Transform} from "../utils/Transform-Types";

export type Box = Readonly<{
  //Properties
  props: {
    width: number;
    height: number;
    depth: number;
    transform: Transform;
  };

  //WebGL Stuff

  program: WebGLProgram;

  nElements: number;

  buffers: {
    geometry: WebGLBuffer;
    colors: WebGLBuffer;
    elements: WebGLBuffer;
  };

  attributes: {
    vertex: number;
    colors: number;
  };

  uniforms: {
    size: WebGLUniformLocation;
    transform: WebGLUniformLocation;
  };
}>
