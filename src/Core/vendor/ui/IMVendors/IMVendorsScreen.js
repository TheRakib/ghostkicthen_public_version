import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import dynamicStyles from './styles';
import IMRatingReview from '../../components/IMRatingReview/IMRatingReview';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../../../Core/localization/IMLocalization';
import { useSelector } from 'react-redux';

function IMVendorsScreen({ navigation, vendors, appConfig, appStyles }) {
  const styles = dynamicStyles(appStyles);
  // const [filters, setFilters] = useState({});

  const currentUser = useSelector((state) => state.auth.user);
  /*   const [isVisible, setVisible] = useState(false); */

  const COLOR_SCHEME = Appearance.getColorScheme();

  const onPressVendorItem = (item) => {
    navigation.navigate('SingleVendor', {
      vendor: item,
    });
  };

  const onPressReview = (item) => {
    navigation.navigate('Reviews', {
      entityID: item.id,
      appStyles,
      appConfig,
    });
  };

  const renderVendorItem = ({ item }) => {
    let count = item.reviewsCount === undefined ? 0 : item.reviewsCount;
    let reviewAvg =
      item.reviewsCount === undefined
        ? 0
        : Math.fround(item.reviewsSum / item.reviewsCount);
    reviewAvg = Number(Math.round(reviewAvg + 'e' + 2) + 'e-' + 2);
    return (
      <>
        {item.restaurantStatus === 'Closed' ? (
          <View style={styles.vendorItemContainer}>
            <View style={styles.foodInfo}>
              <Image
                source={require('../../../../../assets/icons/mumsy-close.png')}
                style={{
                  height: 60,
                  width: 60,
                  position: 'absolute',
                  top: -5,
                  left: 10,
                  zIndex: 1,
                }}
              />
              <View style={styles.restaurantClosed}>
                <FastImage
                  placeholderColor={appStyles.colorSet[COLOR_SCHEME].grey9}
                  style={styles.foodPhoto}
                  source={{ uri: item.photo }}
                />
                <Text style={styles.foodName}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.ReviewName}>
                <IMRatingReview
                  appStyles={appStyles}
                  onPressReview={() => onPressReview(item)}
                  number={count}
                  rating={reviewAvg}
                  offline={currentUser.vendorActive}
                />
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressVendorItem(item)}>
            <View style={styles.vendorItemContainer}>
              <View style={styles.foodInfo}>
                <FastImage
                  placeholderColor={appStyles.colorSet[COLOR_SCHEME].grey9}
                  style={styles.foodPhoto}
                  source={{ uri: item.photo }}
                />
                <Text style={styles.foodName}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.ReviewName}>
                  <IMRatingReview
                    appStyles={appStyles}
                    onPressReview={() => onPressReview(item)}
                    number={count}
                    rating={reviewAvg}
                    offline={currentUser.vendorActive}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={12}
        data={vendors}
        renderItem={renderVendorItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}

export default IMVendorsScreen;
