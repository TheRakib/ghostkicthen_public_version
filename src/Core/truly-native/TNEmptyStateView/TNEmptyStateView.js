import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

const TNEmptyStateView = (props) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(props.appStyles, colorScheme);
  const { emptyStateConfig } = props;
  return (
    <View style={[props.style, styles.container]}>
      {/* <Image style={styles.icon} source={emptyStateConfig.icon} /> */}
      <Text style={styles.title}>{emptyStateConfig.title}</Text>
      <Text style={styles.description}>{emptyStateConfig.description}</Text>
      {emptyStateConfig.buttonName && emptyStateConfig.buttonName.length > 0 && (
        <TouchableOpacity
          onPress={emptyStateConfig.onPress}
          style={styles.buttonContainer}>
          <Text style={styles.buttonName}>{emptyStateConfig.buttonName}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TNEmptyStateView;
