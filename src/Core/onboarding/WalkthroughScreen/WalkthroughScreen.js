import React, { useLayoutEffect } from 'react';
import { View, Image, Text, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import deviceStorage from '../utils/AuthDeviceStorage';
import Icon from 'react-native-vector-icons/Ionicons';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../localization/IMLocalization';

const WalkthroughScreen = (props) => {
  const { navigation, route } = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: index,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
        backgroundColor: screenSpec.backgroundColor,
      };
    },
  );

  const _onDone = () => {
    deviceStorage.setShouldShowOnboardingFlow('false');
    if (appConfig.isDelayedLoginEnabled) {
      navigation.navigate('DelayedHome');
      return;
    }
    navigation.navigate('LoginStack', { screen: 'Welcome' });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const _renderItem = ({ item, dimensions }) => (
    <View style={[styles.container, dimensions]}>
      <Image style={styles.image} source={item.image} tintColor="white" />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  /*  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-forward-outline"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  }; */

  /* const _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.button}>{IMLocalized('')}</Text>
      </View>
    );
  }; */

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="checkmark-outline"
          color="rgba(255, 255, 255, .9)"
          size={25}
        />
      </View>
    );
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        data={slides}
        slides={slides}
        onDone={_onDone}
        renderItem={_renderItem}
        showNextButton={false}
        showSkipButton={false}
        /* onSkip={_onDone} */
        /* renderNextButton={_renderNextButton} */
        /*  renderSkipButton={_renderSkipButton} */
        renderDoneButton={_renderDoneButton}
        activeDotStyle={{ backgroundColor: '#fff' }}
      />
    </>
  );
};

WalkthroughScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WalkthroughScreen;
