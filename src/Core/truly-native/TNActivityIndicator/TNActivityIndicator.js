import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { UIActivityIndicator } from 'react-native-indicators';
import dynamicStyles from './styles';
import LottieView from 'lottie-react-native';

const TNActivityIndicator = (props) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(props.appStyles, colorScheme);

  return (
    <View style={styles.container}>
      {/* <View style={styles.indicatorContainer}> */}
      <LottieView
        source={require('./lottie/loading-indicator.json')}
        autoPlay
        loop
      />
      {props.text && props.text.length > 1 && (
        <Text style={styles.text}>{props.text}</Text>
      )}
      {/* </View> */}
    </View>
  );
};

export default TNActivityIndicator;
