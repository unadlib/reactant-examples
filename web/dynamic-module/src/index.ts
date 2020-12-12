import { render } from "reactant-web";
import { createApp } from "reactant";
import { AppView } from "./App.view";

const app = createApp({
  main: AppView,
  modules: [],
  render,
});

app.bootstrap(document.getElementById("app"));
