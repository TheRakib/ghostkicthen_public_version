import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import TextButton from 'react-native-button';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import DynamicAppStyles from '../../../DynamicAppStyles';
import dynamicStyles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { TNActivityIndicator } from '../../../Core/truly-native';
import ActionSheet from 'react-native-actionsheet';
import { firebaseStorage } from '../../../Core/firebase';
import ModalSelector from 'react-native-modal-selector';
import VendorAppConfig from '../../VendorAppConfig';
import InfoModal from 'react-native-modal';
import { Alert } from 'react-native';

export function AddProductView(props) {
  const colorScheme = useColorScheme();

  const styles = dynamicStyles(colorScheme);

  const { initialProduct, categoryData } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState('');
  /*  const [cookingTime, setCookingTime] = useState(''); */
  const [localPhotos, setLocalPhotos] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const actionsheetRef = useRef(null);

  useEffect(() => {
    if (initialProduct) {
      if (VendorAppConfig.isMultiVendorEnabled) {
        setCategory(
          categoryData.find(
            (category) => initialProduct.categoryID === category.id,
          ),
        );
      }
      setName(initialProduct.name);
      setDescription(initialProduct.description);
      setUploadedPhotos(initialProduct.photos);
      setPrice(initialProduct.price);
      setDelivery(initialProduct.delivery);
    }
  }, []);

  const onPressAddPhotoBtn = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: IMLocalized('Select a photo'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        alert(response.error);
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setLocalPhotos([...localPhotos, response]);
      }
    });
  };

  const onRemoveLocalPhoto = (index) => {
    if (index == 0) {
      var array = [...localPhotos];
      array.splice(selectedPhotoIndex, 1);
      setLocalPhotos(array);
    }
  };

  const showActionSheet = async (index) => {
    await setSelectedPhotoIndex(index);
    actionsheetRef.current.show();
  };

  const photos = localPhotos.map((photo, index) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index);
      }}>
      <FastImage style={styles.photo} source={{ uri: photo?.uri }} />
    </TouchableOpacity>
  ));

  const onlinePhotos = uploadedPhotos.map((photo, index) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index);
      }}>
      <FastImage style={styles.photo} source={{ uri: photo }} />
    </TouchableOpacity>
  ));

  const onCancel = () => {
    props.onCancel();
  };

  const onPost = () => {
    if (!name) {
      Alert.alert('', IMLocalized('Title was not provided.'));
      return;
    }
    if (!description) {
      Alert.alert('', IMLocalized('Description was not provided.'));
      return;
    }
    if (!price) {
      Alert.alert('', IMLocalized('Price is empty.'));
      return;
    }
    /*     if (!cookingTime) {
      Alert.alert('',IMLocalized('Please add estimated cooking time.'));
      return;
    } */
    if (!delivery) {
      Alert.alert('', IMLocalized('Please choose a delivery option.'));
      return;
    }
    if (localPhotos.length == 0) {
      Alert.alert('', IMLocalized('Please choose at least one photo.'));
      return;
    }

    setLoading(true);

    let photoUrls = [];

    const uploadPromiseArray = [];
    localPhotos.forEach((file) => {
      if (!file?.uri.startsWith('https://')) {
        uploadPromiseArray.push(
          new Promise((resolve, reject) => {
            firebaseStorage.uploadFile(file).then(
              (response) => {
                if (response.downloadURL) {
                  photoUrls.push(response.downloadURL);
                }
                resolve();
              },
              (error) => {
                reject();
              },
            );
          }),
        );
      }
    });

    Promise.all(uploadPromiseArray)
      .then((values) => {
        var uploadObject = {
          name: name,
          price: price.replace(/[^0-9]/g, ''),
          description,
          /* cookingTime: cookingTime, */
          delivery: delivery,
          photo: photoUrls.length > 0 ? photoUrls[0] : null,
          photos: photoUrls,
        };
        if (VendorAppConfig.isMultiVendorEnabled) {
          uploadObject.categoryID = category.id;
        }
        if (initialProduct) {
          props.onUpdate({
            id: initialProduct.id,
            ...uploadObject,
          });
        } else {
          props.addProduct(uploadObject);
        }
        onCancel();
        setLoading(false);
      })
      .catch((reason) => {
        onCancel();
        console.log(reason);
        setLoading(false);
        alert(reason);
      });
  };

  const onOpenModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal
      visible={props.isVisible}
      animationType="slide"
      onRequestClose={onCancel}>
      <View style={[styles.bar, styles.navBarContainer]}>
        {initialProduct ? (
          <Text style={styles.headerTitle}>
            {IMLocalized('Update Product')}
          </Text>
        ) : (
          <Text style={styles.headerTitle}>{IMLocalized('Add Product')}</Text>
        )}
        <TextButton
          style={[styles.rightButton, styles.selectorRightButton]}
          onPress={onCancel}>
          {IMLocalized('Cancel')}
        </TextButton>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{IMLocalized('Title')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={IMLocalized('Title on your dish')}
            placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{IMLocalized('Description')}</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.input}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder={IMLocalized('Write a description of your dish')}
            placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title}>{IMLocalized('Price')}</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={price.replace(/[^0-9]/g, '')}
              onChangeText={(text) => setPrice(text)}
              placeholder={IMLocalized('$10')}
              placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey}
              underlineColorAndroid="transparent"
              maxLength={3}
            />
          </View>
          {/*  <View style={styles.divider} />
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.title}>{IMLocalized('Cooking time')}</Text>
              <TextInput
                style={styles.priceInput}
                maxLength={2}
                keyboardType="numeric"
                value={cookingTime}
                onChangeText={(text) => setCookingTime(text)}
                placeholder={IMLocalized('20 Minutes')}
                placeholderTextColor={
                  DynamicAppStyles.colorSet[colorScheme].grey
                }
                underlineColorAndroid="transparent"
              />
            </View>
          </View> */}
          {VendorAppConfig.isMultiVendorEnabled && (
            <ModalSelector
              touchableActiveOpacity={0.9}
              data={categoryData}
              sectionTextStyle={styles.sectionTextStyle}
              optionTextStyle={styles.optionTextStyle}
              optionContainerStyle={styles.optionContainerStyle}
              cancelContainerStyle={styles.cancelContainerStyle}
              cancelTextStyle={styles.cancelTextStyle}
              selectedItemTextStyle={styles.selectedItemTextStyle}
              backdropPressToClose={false}
              cancelText={IMLocalized('Cancel')}
              initValue={category?.title ?? IMLocalized('Select')}
              onChange={(option) => {
                setCategory({ id: option.id, title: option.title });
              }}>
              <View style={styles.row}>
                <Text style={styles.title}>{IMLocalized('Category')}</Text>
                <TextInput
                  maxLength={10}
                  style={[
                    styles.priceInput,
                    {
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: 'black',
                    },
                  ]}
                  placeholder={IMLocalized('Select Category')}
                  placeholderTextColor={
                    DynamicAppStyles.colorSet[colorScheme].mainTextColor
                  }
                  value={category.title}
                  editable={false}
                  underlineColorAndroid="transparent"
                />
              </View>
            </ModalSelector>
          )}
          <View style={styles.divider} />
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>
                {IMLocalized('Delivery options')}
                {'  '}
              </Text>

              <InfoModal
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInTiming={300}
                coverScreen={true}
                onBackdropPress={() => setModalVisible(false)}
                isVisible={isModalVisible}>
                <View style={styles.modalDeliveryContainer}>
                  <View style={styles.modalDelivery}>
                    <Text style={styles.modalDeliveryMainText}>
                      {IMLocalized('Delivery options')}
                    </Text>

                    <Text style={styles.modalDeliveryText}>
                      {IMLocalized(
                        'Self Delivery - You deliver the order to the customer´s chosen address',
                      )}
                    </Text>
                    <Text style={styles.modalDeliveryText}>
                      {IMLocalized(
                        'Mumsy Delivery - You offer the customer delivery through Mumsy Delivey',
                      )}
                    </Text>
                    <Text
                      style={[
                        styles.modalDeliveryText,
                        {
                          textAlign: 'center',
                          fontSize: 12,
                          marginTop: 30,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {IMLocalized(
                        'Obs! kunden kan alltid välja att hämta sin order från er.',
                      )}
                    </Text>
                  </View>
                </View>
              </InfoModal>
              <Icon
                style={styles.icon}
                onPress={onOpenModal}
                name="question-circle"
                size={20}
                color="#FFCB34"
              />
            </View>
            <View style={styles.chooseDeliveryContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setDelivery('mumsyDelivery')}
                value={delivery}
                style={
                  delivery === 'mumsyDelivery'
                    ? [styles.chooseDeliveryBtnActive, { marginBottom: 10 }]
                    : [styles.chooseDeliveryBtn, { marginBottom: 10 }]
                }>
                <Text
                  style={
                    delivery === 'mumsyDelivery'
                      ? styles.chooseDeliveryTextActive
                      : styles.chooseDeliveryText
                  }>
                  {IMLocalized('Mumsy Delivery')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setDelivery('selfDelivery')}
                value={delivery}
                style={
                  delivery === 'selfDelivery'
                    ? styles.chooseDeliveryBtnActive
                    : styles.chooseDeliveryBtn
                }>
                <Text
                  style={
                    delivery === 'selfDelivery'
                      ? styles.chooseDeliveryTextActive
                      : styles.chooseDeliveryText
                  }>
                  {IMLocalized('Self Delivery')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.addPhotoTitle}>{IMLocalized('Add Photos')}</Text>
          <ScrollView style={styles.photoList} horizontal={true}>
            {photos}
            {onlinePhotos}
            <TouchableOpacity onPress={onPressAddPhotoBtn}>
              <View style={[styles.addButton, styles.photo]}>
                <Icon name="camera" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
      {loading ? (
        <TNActivityIndicator appStyles={DynamicAppStyles} />
      ) : (
        <TextButton
          containerStyle={styles.addButtonContainer}
          onPress={onPost}
          style={styles.addButtonText}>
          {initialProduct
            ? IMLocalized('Update Product')
            : IMLocalized('Add Product')}
        </TextButton>
      )}
      <ActionSheet
        ref={actionsheetRef}
        options={[IMLocalized('Remove Photo'), IMLocalized('Cancel')]}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => {
          onRemoveLocalPhoto(index);
        }}
      />
    </Modal>
  );
}
