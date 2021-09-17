import { createServerApp } from "reactant-ssr";
import { CounterView } from "../src/index";

export const app = createServerApp({
  modules: [CounterView],
});

export default app.bootstrap;
