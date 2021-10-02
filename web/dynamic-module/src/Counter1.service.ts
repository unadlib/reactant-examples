import { injectable, action, state } from 'reactant';

@injectable({
  name: 'counter1'
})
class CounterService1 {
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

export { CounterService1 };
