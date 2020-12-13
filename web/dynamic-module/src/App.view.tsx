import React, { useState } from "react";
import {
  injectable,
  optional,
  ImportClass,
  ViewModule,
  load,
  useConnector,
} from "reactant";
import { TodoService } from "./Todo.service";

@injectable()
class AppView extends ViewModule {
  constructor(
    public todo: TodoService,
    @optional("counter")
    public counter?: ImportClass<
      typeof import("./Counter.service"),
      "CounterService"
    >
  ) {
    super();
  }

  loadCounter = async () => {
    const { CounterService } = await import(
      /* webpackChunkName: "Counter.service" */ "./Counter.service"
    );
    load(
      this,
      { main: { provide: "counter", useClass: CounterService } },
      (module) => {
        this.counter = module;
      }
    );
  };

  component() {
    const { list, count } = useConnector(() => ({
      list: this.todo.list,
      count: this.counter?.count,
    }));
    const [value, setValue] = useState("");
    return (
      <>
        <input onChange={(e) => setValue(e.target.value)} value={value} />
        <button
          type={"button"}
          onClick={() => {
            this.todo.add(value);
            setValue("");
          }}
        >
          Add Todo
        </button>
        <ul>
          {list.map((text, key) => (
            <li key={key}>{text}</li>
          ))}
        </ul>
        <button type="button" onClick={() => this.loadCounter()}>
          load counter
        </button>
        {this.counter ? (
          <button onClick={() => this.counter?.increase()}>{count}</button>
        ) : (
          "none"
        )}
      </>
    );
  }
}

export { AppView };
