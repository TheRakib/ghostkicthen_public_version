import React, { useEffect, useState } from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { setI18nConfig } from './src/Core/localization/IMLocalization';
import { AppNavigator } from './src/navigations/AppNavigation';
import { AppearanceProvider, Appearance } from 'react-native-appearance';
import reduxStore from './src/redux/store';
import 'react-native-gesture-handler';

const App = (props) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    console.disableYellowBox = true;
    setI18nConfig();
    Appearance.addChangeListener(({ newColorScheme }) => {
      setColorScheme(newColorScheme);
    });
  }, []);

  return (
    //Provider connectar vår state som vi har satt i redux,
    //provider gör det möjligt för oss att ha "store" tillgängligt över hela appen
    <Provider store={reduxStore}>
      <AppearanceProvider>
        <AppNavigator screenProps={{ theme: colorScheme }} />
      </AppearanceProvider>
    </Provider>
  );
};

AppRegistry.registerComponent('App', () => App);

export default App;
