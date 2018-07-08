export enum Direction {
  LEFT = "left",
  STOP = "stop",
  RIGHT = "right"
}

export enum Axis {
  X = "x",
  Y = "y",
  Z = "z"
}

export type Controller = Readonly<{
  setDirection: (axis: Axis) => (direction: Direction) => void;
  getDirection: (axis: Axis) => Direction;
  listen: (fn: (({axis, direction}:{axis: Axis, direction: Direction}) => void)) => (() => void);
  unlisten: (fn: () => void) => void;
}>;

export type ControllerValues = {
  x: Direction;
  y: Direction;
  z: Direction;
};
