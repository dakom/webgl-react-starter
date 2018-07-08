import {mat4} from "gl-matrix";
import {Box} from "../../types/Types";

const sizeMatrix = mat4.create();

export const renderBox = (gl:WebGLRenderingContext) => (box:Box) => {
  const {width, height, depth, transform: {modelViewProjection}} = box.props;

  //Calculate dynamic data
  mat4.fromScaling(sizeMatrix, [width, height, depth]);

  //Switch shader
  gl.useProgram(box.program);

  //Set uniforms
  gl.uniformMatrix4fv(box.uniforms.size, false, sizeMatrix);
  gl.uniformMatrix4fv(box.uniforms.transform, false, modelViewProjection);

  //Set attributes
  
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, box.buffers.elements);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, box.buffers.geometry);
  gl.vertexAttribPointer(box.attributes.vertex,3,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(box.attributes.vertex);

  gl.bindBuffer(gl.ARRAY_BUFFER, box.buffers.colors);
  gl.vertexAttribPointer(box.attributes.colors, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(box.attributes.colors);

  //Draw
  gl.drawElements(gl.TRIANGLES, box.nElements, gl.UNSIGNED_BYTE, 0);
}