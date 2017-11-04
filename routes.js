import { StackNavigator } from 'react-navigation';

const BoNengApp = StackNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingScreen },
}, {
  initialRouteName: 'Home',
});

const defaultGetStateForAction = BoNengApp.router.getStateForAction;

BoNengApp.router.getStateForAction = (action, state) => {
  if (state && action.type === 'PushTwoProfiles') {
    const routes = [
      ...state.routes,
      {key: 'A', routeName: 'Profile', params: { name: action.name1 }}
    ];
    return {
      ...state,
      routes,
      index: routes.length -1
    }
  }
  return defaultGetStateForAction(action, state);
}