import { injectable, action, state } from "reactant-share";

interface Todo {
  text: string;
  complete: boolean;
}

@injectable({
  name: "todo",
})
class TodoService {
  @state
  list: Todo[] = [{ text: "Learn Reactant", complete: false }];

  @action
  addTodo(text: string) {
    this.list.push({ text, complete: false });
  }
}

export { TodoService };
