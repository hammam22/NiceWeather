/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {I18nManager} from "react-native";

AppRegistry.registerComponent(appName, () => App);
I18nManager.allowRTL(false);
I18nManager.swapLeftAndRightInRTL(false);