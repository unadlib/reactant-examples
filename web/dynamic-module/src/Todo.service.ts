import { action, injectable, state } from "reactant";

@injectable()
class TodoService {
  @state
  list: string[] = [];

  @action
  add(text: string) {
    this.list.push(text);
  }
}

export { TodoService };
