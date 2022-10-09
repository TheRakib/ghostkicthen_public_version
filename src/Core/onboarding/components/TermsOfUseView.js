import React from 'react';
import { Text, Linking, View } from 'react-native';
import { IMLocalized } from '../../localization/IMLocalization';

const TermsOfUseView = (props) => {
  const { tosLink, privacyPolicyLink, style } = props;
  return (
    <View style={[style, { marginBottom: 15 }]}>
      <Text style={{ fontSize: 13 }}>
        {IMLocalized('By creating an account you agree with our')}
      </Text>
      <Text>
        <Text
          style={{
            color: '#FFCB34',
            fontSize: 12,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: '#FFCB34',
          }}
          onPress={() => Linking.openURL(tosLink)}>
          {IMLocalized('Terms of Use')}
        </Text>
        {/* {privacyPolicyLink?.length > 0 && ( */}
        <Text style={{ fontSize: 12 }}>
          {IMLocalized(' and ')}
          <Text
            style={{
              color: '#FFCB34',
              fontSize: 12,
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textDecorationColor: '#FFCB34',
            }}
            onPress={() => Linking.openURL(privacyPolicyLink)}>
            {IMLocalized('Privacy Policy')}
          </Text>
        </Text>
      </Text>
    </View>
  );
};

export default TermsOfUseView;
