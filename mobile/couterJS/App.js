import React from 'react';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant';
import {render} from 'reactant-native';
import {View, Text, Button} from 'react-native';
import {name as appName} from './app.json';

@injectable()
class Counter {
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

@injectable({
  deps: [Counter],
})
class AppView extends ViewModule {
  constructor(counter) {
    super();
    this.counter = counter;
  }

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <View>
        <Button onPress={() => this.counter.decrease()} title="-" />
        <Text>{count}</Text>
        <Button onPress={() => this.counter.increase()} title="+" />
      </View>
    );
  }
}

const app = createApp({
  main: AppView,
  render,
});

app.bootstrap(appName);
