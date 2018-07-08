import { Controller, Transform, Axis, Direction } from "../../../types/Types";
import { quat } from "gl-matrix";

const SPEED = .0001;
const functionLookup = {
  [Axis.X]: quat.rotateX,
  [Axis.Y]: quat.rotateY,
  [Axis.Z]: quat.rotateZ,
}

const rotateAxis = (controller:Controller) => (axis: Axis) => (amt:number) => (rotation: Array<number>) => {
  const direction = controller.getDirection(axis);
  if(direction === Direction.STOP) {
    return rotation;  
  } else if(direction === Direction.LEFT) {
    amt = -amt;
  }

  const fn = functionLookup[axis];
  const dest = new Array<number>(4) as any;
  return (fn (dest, rotation as any, amt) as any) as Array<number>;
}


export const doRotate = (controller:Controller) => (dt:number) => (transform:Transform):Transform => {
  const rotationAmount = dt * SPEED * (2 * Math.PI);

  const rotateX = rotateAxis (controller) (Axis.X) (rotationAmount);
  const rotateY = rotateAxis (controller) (Axis.Y) (rotationAmount);
  const rotateZ = rotateAxis (controller) (Axis.Z) (rotationAmount);

  const rotation = rotateZ(rotateY(rotateX(transform.rotation)));

  return Object.assign({}, transform, {rotation});
}