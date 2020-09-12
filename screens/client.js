import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import axios from 'axios';
import config from '../utils/config.json';
import AppButton from '../components/AppButton';
import Spinner from 'react-native-loading-spinner-overlay';

/*
Back-end consists of one MySQL server (Amazon RDS for MySQL) that has one database 'Task' and one table 'Via'.
It also consists of 3 lambda functions developed in NodeJS that use npm and mysql package for mysql queries.
1) numberLarge: simulate a large load of 5 seconds then the server handles the request; Read the existing value from the table,
add 100 to it, then set the value in the database field and return it in the request.
2) numberSmall: simulate a load of 1 second then the server handles the request; Read the existing value from the table,
add 25 to it, then set the value in the database field and return it in the request.
3) resetNumber: Set the value in table Via to 0 and return the value in the request.
Files located in ../backend.

The three lambda functions are called using a REST API deployed using API Gateway under 3 resources.
first resource '/' invokes the resetNumber method.
second resource '/numberlarge' invokes numberLarge method.
third resource '/numbersmall' invokes numberSmall method.
Link located in ../utils/config.json

The client screen sends requests using Axios and synchronization between the server and the front-end side is handled through
the use of states and by using async/await requests to the server.

Hooks used: 
1) useMemo for optimized performance of our main requests - useful to avoid extra calculations 
on each render throughout the whole app
2) useReducer for optimzed performance and easily handle state logic depending on our previous state.
*/

const {width, height} = Dimensions.get('window');
const client = ({navigation}) => {
  intialState = {
    value: '0',
    large: true,
    small1: false,
    small2: false,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LARGE':
        return {
          ...prevState,
          value: action.value,
          large: false,
          small1: true,
        };
      case 'SMALL1':
        return {
          ...prevState,
          value: action.value,
          small1: false,
          small2: true,
        };
      case 'SMALL2':
        return {
          ...prevState,
          value: action.value,
          small2: false,
        };
      case 'RESET':
        return {
          ...prevState,
          value: action.value,
          large: true,
          small1: false,
          small2: false,
        };
    }
  };
  const [state, dispatch] = React.useReducer(loginReducer, intialState);

  const send = React.useMemo(() => ({
    Large: async () => {
      try {
        const res = await axios.get(config.api.invokeUrl + '/numberlarge');
        console.log('Value: ' + res.data[0].number);
        dispatch({
          type: 'LARGE',
          value: res.data[0].number,
        });
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    },
    Small: async (number) => {
      try {
        const res = await axios.get(config.api.invokeUrl + '/numbersmall');
        console.log('Value: ' + res.data[0].number);
        value = res.data[0].number;
        dispatch({
          type: 'SMALL' + number,
          number: number,
          value: res.data[0].number,
        });
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    },
    Reset: async () => {
      try {
        const res = await axios.get(config.api.invokeUrl);
        console.log('Reset - Value: ' + res.data[0].number);
        value = res.data[0].number;
        dispatch({
          type: 'RESET',
          value: res.data[0].number,
        });
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    },
  }));

  if (state.large) {
    console.log('Sending request: Large');
    send.Large();
  }
  if (state.small1) {
    console.log('Sending request: Small1');
    send.Small(1);
  }
  if (state.small2) {
    console.log('Sending request: Small2');
    send.Small(2);
  }

  return (
    <View style={styles.container}>
      <Text>Value: {state.value}</Text>
      <Text>
        Sending request:{' '}
        {state.large
          ? 'Large'
          : state.small1
          ? 'Small1'
          : state.small2
          ? 'Small2'
          : 'Finished'}
      </Text>
      <AppButton
        title={'Reset'}
        onPress={() => send.Reset()}
        Bcolor={'#0D2160'}
        Tcolor={'white'}
      />
      <Spinner
        visible={state.large || state.small1 || state.small2}
        textContent={''}
        animation={'fade'}
        overlayColor={'rgba(0, 0, 0, 0)'}
        color={'#0D2160'}
      />
    </View>
  );
};

export default client;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: height * 0.2,
  },
});
