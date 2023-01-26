import * as React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import List from './src/List';
import Details from './src/Details';
import {env} from './src/config/properties';

import './i18n.config';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const {t} = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'List'}
            options={{
              title: `${t('list')} - ${env.name}`,
            }}
            component={List}
          />
          <Stack.Screen
            name="Details"
            options={{
              title: `${t('details')} - ${env.name}`,
            }}
            component={Details}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
