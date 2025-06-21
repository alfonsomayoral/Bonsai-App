import { registerRootComponent } from 'expo';
import 'expo-router/entry';
import './tamagui.config';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(require('expo-router/entry').default);
