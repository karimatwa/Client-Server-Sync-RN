/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import client from './screens/client.js';

const RootStack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="client" component={client} />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
