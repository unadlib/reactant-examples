import React from "react";
import {
  ViewModule,
  injectable,
  useConnector,
  spawn,
  lazy,
  load,
  fork,
  PortDetector,
} from "reactant-share";
import { CounterService } from "./counter.service";
import type { TodoService } from "./todo.service";

@injectable({
  name: 'AppView',
})
class AppView extends ViewModule {
  constructor(
    public counter: CounterService,
    public portDetector: PortDetector
  ) {
    super();
  }

  loadClientModule = async () => {
    const { TodoService } = await import(
      /* webpackChunkName: "todo.service" */ "./todo.service"
    );
    await load(this, [{ provide: "todo", useClass: TodoService }]);
    await this.portDetector.syncFullState();
  };

  loadServerModule = async () => {
    const { TodoService } = await import(
      /* webpackChunkName: "todo.service" */ "./todo.service"
    );
    await load(this, [{ provide: "todo", useClass: TodoService }]);
    await fork(this as AppView, "loadClientModule", []);
  };

  @lazy("todo")
  todo?: TodoService;

  component() {
    const [count, list] = useConnector(() => [
      this.counter.count,
      this.todo?.list,
    ]);
    return (
      <>
        <button
          type="button"
          onClick={() => spawn(this.counter, "decrease", [])}
        >
          -
        </button>
        <div>{count}</div>
        <button
          type="button"
          onClick={() => spawn(this.counter, "increase", [])}
        >
          +
        </button>
        <br />
        <button
          type="button"
          onClick={() => spawn(this as AppView, "loadServerModule", [])}
        >
          load todo module
        </button>
        <ul>
          {list?.map((item, key) => (
            <li key={key}>{item.text}</li>
          ))}
        </ul>
      </>
    );
  }
}

export { AppView };
