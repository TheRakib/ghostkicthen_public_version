import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import ReservationItem from '../../components/ReservationItem/ReservationItem';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import Hamburger from '../../components/Hamburger/Hamburger';
import { TNEmptyStateView } from '../../Core/truly-native';
import DynamicAppStyles from '../../DynamicAppStyles';

class ReservationHistoryScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation, route } = props;
    navigation.setOptions({
      title: IMLocalized('Reservation History'),
    });
    const appConfig = route.params.appConfig;
    if (appConfig.isMultiVendorEnabled) {
      navigation.setOptions({
        headerLeft: () => (
          <Hamburger
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      });
    }
    this.state = {
      reservations: [],
    };
    this.reservations = this.props.route.params.reservations;
    this.reservationRef = firebase
      .firestore()
      .collection(appConfig.tables.RESERVATIONS);
  }

  componentDidMount() {
    this.unsubscribeReservations = this.reservationRef
      .orderBy('createdAt', 'desc')
      .where('authorID', '==', this.props.user.id)
      .onSnapshot(this.onReservationUpdate);
  }

  componentWillUnmount() {
    this.unsubscribeReservations();
  }

  onReservationUpdate = querySnapshot => {
    const data = [];
    querySnapshot.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    this.setState({
      reservations: data,
    });
  };

  render() {
    const emptyStateConfig = {
      title: IMLocalized('No Reservations Yet'),
      description: IMLocalized(
        'You currently don\'t have any reservations. Your reservations will be displayed here.',
      ),
    };

    return (
      <View style={styles.container}>
        {this.state.reservations?.length === 0 && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={DynamicAppStyles}
            />
          </View>
        )}
        <FlatList
          data={this.state.reservations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ReservationItem constructorObject={item} />
          )}
          style={{ width: '95%' }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

ReservationHistoryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default connect(mapStateToProps)(ReservationHistoryScreen);
