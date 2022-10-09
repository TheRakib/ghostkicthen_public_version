import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { firebase } from '../../../../firebase/config';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../../../localization/IMLocalization';
import IMProfileItemView from '../IMProfileItemView/IMProfileItemView';
import { TNProfilePictureSelector } from '../../../../truly-native';
import { firebaseStorage } from '../../../../firebase/storage';
import { firebaseAuth } from '../../../../firebase';
import { loadCachedItem } from '../../../../helpers/cacheManager';
import { useSelector } from 'react-redux';

const IMUserProfileComponent = (props) => {
  const currentUser = useSelector((state) => state.auth.user);
  const { appStyles, menuItems, onUpdateUser, onLogout } = props;
  const {
    profilePictureURL,
    firstName,
    lastName,
    fullname,
    userID,
  } = props.user;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [profilePicture, setProfilePicture] = useState(profilePictureURL);

  useEffect(() => {
    const loadImage = async () => {
      const image = await loadCachedItem({ uri: profilePicture });
      setProfilePicture(image);
    };

    loadImage();
  }, [profilePictureURL]);

  const onUserProfileUpdate = (querySnapshot) => {
    const data = querySnapshot.data();
    if (data) {
      onUpdateUser(data);
    }
  };

  useEffect(() => {
    if (props.user.id || props.user.userID) {
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(props.user.id || props.user.userID);

      const unsubscribeUserFunction = userRef.onSnapshot(onUserProfileUpdate);
      return () => {
        unsubscribeUserFunction();
      };
    }
  }, []);

  function firstLetterCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const displayName = () => {
    if (
      (firstName && firstName.length > 0) ||
      (lastName && lastName.length > 0)
    ) {
      return firstName + ' ' + lastName;
    }
    return fullname || '';
  };

  const setProfilePictureFile = (photoFile) => {
    if (photoFile == null) {
      // Remove profile photo action
      firebaseAuth.updateProfilePhoto(userID, null).then((finalRes) => {
        if (finalRes.success == true) {
          onUpdateUser({ ...props.user, profilePictureURL: null });
        }
      });
      return;
    }
    // If we have a photo, we upload it to Firebase, and then update the user
    firebaseStorage.uploadFile(photoFile).then((response) => {
      if (response.error) {
        // there was an error, fail silently
      } else {
        firebaseAuth
          .updateProfilePhoto(userID, response.downloadURL)
          .then((finalRes) => {
            if (finalRes.success == true) {
              onUpdateUser({
                ...props.user,
                profilePictureURL: response.downloadURL,
              });
            }
          });
      }
    });
  };

  const renderMenuItem = (menuItem) => {
    const { title, icon, onPress, tintColor } = menuItem;
    return (
      <IMProfileItemView
        title={title}
        icon={icon}
        iconStyle={{ tintColor: tintColor }}
        onPress={onPress}
        appStyles={appStyles}
      />
    );
  };

  const myProfileScreenContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          {/* <StatusBar />
          <View style={styles.userInfo}>
          <Text style={{ fontSize: 20 }}>
          {firstLetterCapitalize(currentUser.firstName)}{' '}
          {firstLetterCapitalize(currentUser.lastName)}
          </Text>
          {currentUser.email ? (
            <Text style={styles.userInfoText}>{currentUser.email}</Text>
            ) : null}
            {currentUser.phone ? (
              <Text style={styles.userInfoText}>{currentUser.phone}</Text>
              ) : null}
            </View> */}

          {menuItems.map((menuItem) => {
            return renderMenuItem(menuItem);
          })}
        </View>
        <Text onPress={onLogout} style={styles.logout}>
          {IMLocalized('Logout')}
        </Text>
      </View>
    );
  };

  return <>{myProfileScreenContent()}</>;
};

export default IMUserProfileComponent;
