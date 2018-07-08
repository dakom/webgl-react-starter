import {Controller} from "../controller/Controller-Types";
import {Box} from "./Box-Types";
import {Camera} from "./Camera-Types";

export interface World {
  box: Box;
  camera: Camera;
  controller: Controller;
}
