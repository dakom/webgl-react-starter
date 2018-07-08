import * as React from "react";
import * as ReactDOM from "react-dom";
import "./view/Styles.css";
import { TopMenu } from "./view/menu/TopMenu";
import { LoadingGraphics } from "./view/widgets/LoadingGraphics";
import { setupRenderer} from "./renderer/Renderer";
import {startWorld} from "./world/World-Start";
import { setupBox } from "./world/box/Box-Setup";
import { setupCamera } from "./world/camera/Camera-Setup";
import {makeController} from "./controller/Controller";

interface Props {}
interface State {
  graphicsReady: boolean;
}


export class App extends React.Component<Props, State> {
  readonly canvasRef = React.createRef<HTMLCanvasElement>();
  private controller = makeController();
  readonly state: State = {
    graphicsReady: false,
  };

  componentDidMount() {

    //Simple helper to append the setup object
    //Works with either a Future or POJO (see below for usage)
    const appendSetup = name => setup => obj => {
      const update = x => Object.assign({}, obj, { [name]: x });

      //Crude test to see if it's a Future
      return setup["map"]
        ? setup.map(update)
        : update(setup);
    }
    
    setupRenderer(this.canvasRef.current)
      .map(renderer => appendSetup ("renderer")(renderer) ({controller: this.controller}))
      .chain(setup => appendSetup ("box") (setupBox(setup.renderer)) (setup))
      .chain(setup => appendSetup ("camera") (setupCamera(setup.renderer)) (setup))
      .fork(console.error, setup => {
        this.setState(
          { graphicsReady: true },
          startWorld(setup)
        );
      });
  }

  render() {
    return (
      <React.Fragment>
        <canvas ref={this.canvasRef} className="canvas" />
        {this.state.graphicsReady ? (
          <TopMenu controller={this.controller} />
        ) : (
          <LoadingGraphics />
        )}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
