import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import styles from './styles';
import Hamburger from '../../components/Hamburger/Hamburger';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { VENDOR_CATEGORIES } from '../../Configuration';
import AppConfig from '../../VendorAppConfig';
import { connect } from 'react-redux';
import VendorAppConfig from '../../VendorAppConfig';

class CategoryListScreen extends Component {
  /*  navToMap() {
    const { vendors } = this.props;
    if (vendors.length > 0 || vendors !== undefined) {
      this.props.navigation.navigate('Map', { vendors });
    }
  } */

  constructor(props) {
    super(props);
    const { navigation } = props;
    navigation.setOptions({
      title: IMLocalized('Categories'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    });
    this.ref = firebase.firestore().collection(VENDOR_CATEGORIES);
    this.unsubscribe = null;
    this.COLOR_SCHEME = Appearance.getColorScheme();

    this.state = {
      // loading: false,
      data: [],
      // page: 1,
      // seed: 1,
      // error: null,
      // refreshing: false,
    };
  }

  componentDidMount() {
    //const {vendors} = this.props;
    //this.props.navigation.setParams({navToMap: () => this.navToMap(vendors)});
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    this.setState({
      data: querySnapshot.docs.map((doc) => doc.data()),
    });
  };

  onPress = (item) => {
    if (VendorAppConfig.isMultiVendorEnabled) {
      this.props.navigation.navigate('Vendor', {
        category: item,
        appStyles: DynamicAppStyles,
        appConfig: AppConfig,
      });
    } else {
      this.props.navigation.navigate('SingleVendor', {
        category: item,
        appStyles: DynamicAppStyles,
        appConfig: AppConfig,
      });
    }
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPress(item)}>
      <View style={styles.container}>
        <FastImage
          placeholderColor={DynamicAppStyles.colorSet[this.COLOR_SCHEME].grey9}
          style={styles.photo}
          source={{ uri: item.photo }}
        />
        <View style={styles.overlay} />
        <Text numberOfLines={3} style={styles.title}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        style={styles.listStyle}
        numColumns={2}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    );
  }
}

CategoryListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  vendors: state.vendor.vendorList,
});

export default connect(mapStateToProps)(CategoryListScreen);
