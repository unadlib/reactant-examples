import { injectable, action, state } from 'reactant';
import { CounterService1 } from './Counter1.service';

@injectable({
  name: 'counter'
})
class CounterService {
  constructor(public counter1: CounterService1) {}

  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }

  @action
  decrease() {
    this.count -= 1;
  }
}

export { CounterService };
