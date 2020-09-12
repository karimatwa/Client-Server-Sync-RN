import React from 'react';
import {Text, Dimensions, StyleSheet, Pressable} from 'react-native';

const {width, height} = Dimensions.get('window');
const AppButton = ({onPress, title, Bcolor, Tcolor}) => (
  <Pressable
    style={[styles.button, {backgroundColor: Bcolor}]}
    onPress={onPress}>
    <Text style={[styles.text, {color: Tcolor}]}>{title}</Text>
  </Pressable>
);

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    justifyContent: 'center',
    width: width * 0.7,
    height: height * 0.05,
    marginVertical: height * 0.005,
  },
  text: {
    fontSize: width > 400 ? 16 : 13,
    textAlign: 'center',
  },
});
