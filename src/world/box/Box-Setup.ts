//Ignore the typescript warnings here - the files _are_ imported
import * as vertexSource from "!raw-loader!./Vertex-Shader.glsl";
import * as fragmentSource from "!raw-loader!./Fragment-Shader.glsl";

import { Future } from "fluture";
import {
  geometry as geometryData,
  colors as colorsData,
  elements as elementsData
} from "./Box-Data";
import { createTransform } from "../../utils/transform/Transform";
import { Box, Renderer } from "../../types/Types";

export const setupBox = (renderer: Renderer) =>
  new Future<any, Box>((reject, resolve) => {

    const viewport = renderer.getViewport();

    //Props
    const props = {
      width: 100,
      height: 100,
      depth: 100,
      transform: createTransform({
        translation: [
          viewport.width/2,
          viewport.height/2, 
          -300
        ]
      })
    };

    //Upload data to GPU
    const { gl } = renderer;
    const buffers = {
      geometry: gl.createBuffer(),
      colors: gl.createBuffer(),
      elements: gl.createBuffer()
    };

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.geometry);
    gl.bufferData(gl.ARRAY_BUFFER, geometryData, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colors);
    gl.bufferData(gl.ARRAY_BUFFER, colorsData, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.elements);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, elementsData, gl.STATIC_DRAW);

    //Compile shader
    //Errors here are exceptions, not rejections
    const program = gl.createProgram();
    const compile = kind => source => {
      const shader = gl.createShader(kind);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const errorMessage =
          `error: ` + gl.getShaderInfoLog(shader);
        throw new Error(errorMessage);
      }
      gl.attachShader(program, shader);
    };

    compile(gl.VERTEX_SHADER)(vertexSource);
    compile(gl.FRAGMENT_SHADER)(fragmentSource);

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(
        "Unable to initialize the shader program: " +
          gl.getProgramInfoLog(program)
      );
    }

    //Get Attribute and Uniform locations

    const attributes = {
      vertex: gl.getAttribLocation(program, "a_Vertex"),
      colors: gl.getAttribLocation(program, "a_Color")
    };

    const uniforms = {
      size: gl.getUniformLocation(program, "u_Size"),
      transform: gl.getUniformLocation(program, "u_Transform")
    };

    resolve({
      props,
      nElements: elementsData.length,
      program,
      buffers,
      attributes,
      uniforms
    });
  });
