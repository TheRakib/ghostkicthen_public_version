import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { ReviewAPIManager } from '../../api/ReviewAPIManager';
import FastImage from 'react-native-fast-image';
import { Appearance } from 'react-native-appearance';
import moment from 'moment';
import IMAddReviewModal from '../../components/IMAddReviewModal/IMAddReviewModal';
import { connect } from 'react-redux';
import dynamicStyles from './styles';
import { Icon } from 'react-native-elements';
import { IMLocalized } from '../../../localization/IMLocalization';
import { TNEmptyStateView } from '../../../truly-native';

const COLOR_SCHEME = Appearance.getColorScheme();

function IMVendorReview({ navigation, user, route }) {
  const [reviews, setReviews] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = route.params?.entityID ?? '';
  const appConfig = route.params.appConfig;

  const onReviewsFetched = (newReviews) => {
    setReviews(newReviews);
    setLoading(false);
  };

  const apiManager = useRef(
    new ReviewAPIManager(onReviewsFetched, id, appConfig.tables.VENDOR_REVIEWS),
  );
  const appStyles = route.params.appStyles;
  const styles = dynamicStyles(appStyles);

  const emptyStateConfig = {
    title: IMLocalized('No reviews'),
    description: IMLocalized(
      'Här finns för närvarande inga recensioner för denna Food Artist.',
    ),
    buttonName: IMLocalized('Add Review'),
    onPress: showModal,
  };

  useEffect(() => {
    const currentAPIManager = apiManager.current;
    currentAPIManager && currentAPIManager.subscribe();
    return () => {
      currentAPIManager && currentAPIManager.unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => showModal()}>
          <FastImage
            tintColor={'#000'}
            style={styles.headerRightContainer}
            source={appStyles.iconSet.create}
          />
        </TouchableOpacity>
      ),
      headerTitle: IMLocalized('Reviews'),
    });
  }, []);

  function showModal() {
    setVisible(true);
  }

  const defaultProfilePhotoURL =
    'https://firebasestorage.googleapis.com/v0/b/mumsyfoodlover.appspot.com/o/user%20(7).png?alt=media&token=56bc4184-bdfa-4a3f-b637-259188cada98';

  const renderSingleReview = (singleReview) => {
    const now = Date.now() / 1000;
    const date = moment.unix(singleReview?.createdAt?.seconds ?? now);
    return (
      <View style={styles.reviewContainer}>
        <View style={[styles.horizontalPane, styles.pad]}>
          <View style={styles.horizontalPane}>
            <FastImage
              /* Koden nedan bör återskapas om vi ska använda food artist profil pic */
              /* source={{ uri: singleReview.authorProfilePic }} */
              source={{ uri: defaultProfilePhotoURL }}
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.authorName}>{singleReview.authorName}</Text>
              <Text style={styles.date}>{date.format('MMMM Do YYYY')}</Text>
            </View>
          </View>

          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Icon
                size={15}
                key={item}
                type="ionicon"
                style={styles.starStyle}
                name={
                  item <= singleReview.rating
                    ? 'ios-star-sharp'
                    : 'ios-star-outline'
                }
                color={
                  appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor
                }
              />
            ))}
          </View>
        </View>
        <Text style={styles.reviewText}>{singleReview.text}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <IMAddReviewModal
        appStyles={appStyles}
        isVisible={isVisible}
        close={() => setVisible(false)}
        submitReview={(rating, review) =>
          apiManager.current.addReview(rating, review, user)
        }
      />
      {reviews.length === 0 && !loading && (
        <>
          <TNEmptyStateView
            emptyStateConfig={emptyStateConfig}
            appStyles={appStyles}
            style={styles.emptystateConfig}
          />
        </>
      )}

      <FlatList
        data={reviews}
        renderItem={({ item }) => renderSingleReview(item.singleReview)}
        style={styles.container}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(IMVendorReview);
