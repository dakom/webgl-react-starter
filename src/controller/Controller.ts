import {ControllerValues, Axis, Direction} from "../types/Types";

export const makeController = () => {
  const listeners = new Set();

  const values = {
    [Axis.X]: Direction.STOP,
    [Axis.Y]: Direction.STOP,
    [Axis.Z]: Direction.STOP
  }

  const setDirection = (axis:Axis) => (direction:Direction) => {
    values[axis] = direction;
    listeners.forEach(fn => fn({
      axis,
      direction: values[axis]
    }));
  }

  const getDirection = (axis:Axis) =>
    values[axis];

  
  const listen = (fn: (values: ControllerValues) => void) => {
    listeners.add(fn);

    return () => listeners.delete(fn);
  }

  return {setDirection, getDirection, listen};
 
};