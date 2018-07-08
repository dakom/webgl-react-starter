import * as React from "react";
import {Controller, Direction, Axis} from "../../types/Types";

interface Props {
  controller: Controller;
  axis: Axis;
}

interface State {
  direction: Direction
}

class RotationMenu extends React.Component<Props, State> {
  private unlistener:() => void;
  readonly state:State = {
    direction: this.props.controller.getDirection(this.props.axis)
  }

  componentDidMount() {
    this.unlistener = this.props.controller.listen(({axis, direction}) => {
      if(axis === this.props.axis) {
        this.setState({direction});
      }
    });
  }

  componentWillUnmount() {
    this.unlistener();
  }

  render() {
    const {controller, axis} = this.props;
    const {direction} = this.state;
    
    const label = `Rotation${axis.toUpperCase()}:`;
    const onChange = controller.setDirection(axis);
    const getClassName = (btnDirection:Direction) => {
      const baseClass = "topMenuButton";
      return (btnDirection === direction)
        ? direction === Direction.STOP
          ? baseClass + "-selected-stop"
          : baseClass + "-selected-go"
        : baseClass;
    }
    return (
      <div>
        {label} &nbsp;
        <button className={getClassName(Direction.LEFT)} onClick= {() => onChange(Direction.LEFT)}>Neg</button >
        <button className={getClassName(Direction.STOP)} onClick={() => onChange(Direction.STOP)}>Stop</button>
        <button className={getClassName(Direction.RIGHT)} onClick={() => onChange(Direction.RIGHT)}>Pos</button>
      </div>
    )
  }
}

export const TopMenu = ({controller}: {controller:Controller}) => (
  <div className="topMenu">
    <RotationMenu axis={Axis.X} controller={controller} />
    <RotationMenu axis={Axis.Y} controller={controller} />
    <RotationMenu axis={Axis.Z} controller={controller} />
     
  </div>
);
