import React, { useState } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
// import { logout } from '../../../onboarding/redux/auth';
import { IMLocalized } from '../../../localization/IMLocalization';
import MenuButton from '../MenuButton/MenuButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import VendorAppConfig from '../../../../VendorAppConfig';
import DynamicAppStyles from '../../../../DynamicAppStyles';
import { firestore } from 'firebase';
import RNRestart from 'react-native-restart';
// import Icon from 'react-native-vector-icons/Ionicons';

const IMDrawerMenu = (props) => {
  const {
    appStyles,
    menuItems,
    menuItemsSettings,
    authManager,
    appConfig,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const { navigation } = props;
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const defaultProfilePhotoURL =
    'https://firebasestorage.googleapis.com/v0/b/mumsyfoodlover.appspot.com/o/user%20(7).png?alt=media&token=56bc4184-bdfa-4a3f-b637-259188cada98';

  const mappingMenuItems = menuItems.map((menuItem) => (
    <MenuButton
      title={menuItem.title}
      source={menuItem.icon}
      appStyles={appStyles}
      onPress={() => {
        navigation.navigate(menuItem.navigationPath, {
          appStyles: appStyles,
          appConfig: appConfig,
        });
      }}
    />
  ));

  const BecomeFoodArtistBtn =
    menuItemsSettings.length == 0 ? null : (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('BecomeFoodArtist')}>
          <View style={styles.workWithUs}>
            <Text style={styles.textFooter}>
              {IMLocalized('Be our next star')}
            </Text>
            <Text
              style={[styles.textFooter, { fontSize: 11, fontWeight: 'bold' }]}>
              {IMLocalized('Apply today and make money on your terms')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

  const updateUserVendor = () => {
    firestore()
      .collection('users')
      .doc(currentUser.id)
      .update({
        role: 'vendor',
      })

      .then(() => {
        console.log('User updated to vendor!');
      });
    RNRestart.Restart();
  };

  const updateUserDriver = () => {
    firestore()
      .collection('users')
      .doc(currentUser.id)
      .update({
        role: 'driver',
      })
      .then(() => {
        console.log('User updated to driver!');
      });
    RNRestart.Restart();
  };

  const updateBackUserRole = () => {
    firestore()
      .collection('users')
      .doc(currentUser.id)
      .update({
        role: 'regularuser',
      })
      .then(() => {
        console.log('User updated to regular!');
      });
    RNRestart.Restart();
  };

  return (
    <View style={styles.content}>
      {currentUser.role === 'vendor' || currentUser.role === 'driver' ? (
        <View style={styles.header}>
          <Image // profile picture for drawer menu.
            style={styles.imageContainer}
            source={{
              uri:
                /* currentUser.photoURI ||
                currentUser.profilePictureURL || */
                defaultProfilePhotoURL,
            }}
          />
          <TouchableOpacity>
            <View style={styles.phone}>
              <Text style={styles.info}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              {currentUser.phone ? (
                <Text style={styles.phoneText}>{currentUser.phone}</Text>
              ) : (
                <Text style={styles.phoneText}>
                  {IMLocalized('Add phone number')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.header}>
          <Image // profile picture for drawer menu.
            style={styles.imageContainer}
            source={{
              uri:
                /* currentUser.photoURI ||
                      currentUser.profilePictureURL || */
                defaultProfilePhotoURL,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AccountDetail', {
                appStyles: DynamicAppStyles,
                form: VendorAppConfig.editProfileFields,
              });
            }}>
            <View style={styles.phone}>
              <Text style={styles.info}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              {currentUser.phone ? (
                <Text style={styles.phoneText}>{currentUser.phone}</Text>
              ) : (
                <Text style={styles.phoneText}>
                  {IMLocalized('Add phone number')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.container}>
          <View style={styles.line} />
          {mappingMenuItems}
        </View>
        {currentUser.switchRole === 'userDriver' &&
          currentUser.role === 'regularuser' && (
            <View style={styles.btnContainer}>
              <View style={styles.roleBtnContainer}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={updateUserDriver}
                  style={styles.switchRoleBtn}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.innerBtnText}>
                      {IMLocalized('Go to Mumsy Delivery')} {'\n'}
                      <Text style={{ fontSize: 13 }}>
                        {IMLocalized('Make money on your terms')}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

        {currentUser.switchRole === 'userVendor' &&
          currentUser.role === 'regularuser' && (
            <View style={styles.btnContainer}>
              <View style={styles.roleBtnContainer}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={updateUserVendor}
                  style={styles.switchRoleBtn}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.innerBtnText}>
                      {IMLocalized('Go to Mumsy Food Artist')} {'\n'}
                      <Text style={{ fontSize: 13 }}>
                        {IMLocalized('Make money on your terms')}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

        {currentUser.role === 'driver' || currentUser.role === 'vendor' ? (
          <View style={styles.btnContainer}>
            <View style={styles.roleBtnContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={updateBackUserRole}
                style={styles.switchRoleBtn}>
                <Text style={styles.innerBtnText}>
                  {IMLocalized('Go back to Mumsy')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {currentUser.role === 'vendor' ||
        currentUser.role === 'driver' ||
        currentUser.switchRole === 'userDriver' ||
        currentUser.switchRole === 'userVendor'
          ? null
          : BecomeFoodArtistBtn}
      </View>
    </View>
  );
};
export default IMDrawerMenu;
