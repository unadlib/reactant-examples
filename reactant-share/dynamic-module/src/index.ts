import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { AppView } from './app.view';


const worker = new SharedWorker(
  /* webpackChunkName: "worker" */ new URL('./worker.ts', import.meta.url)
);

createSharedApp({
  modules: [],
  main: AppView,
  render,
  share: {
    name: 'SharedWorkerApp',
    port: 'client',
    type: 'SharedWorker',
    worker,
  },
}).then((app) => {
  // @ts-ignore
  window.app = app;
  app.bootstrap(document.getElementById('app'));
});
