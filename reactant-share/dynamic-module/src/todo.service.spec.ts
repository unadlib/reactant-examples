
import { testBed } from 'reactant-share';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let module: TodoService;

  beforeEach(() => {
    module = testBed({
      main: TodoService,
      modules: [],
    }).instance;
  });

  test('should be created', () => {
    expect(module instanceof TodoService).toBeTruthy();
  });
});
