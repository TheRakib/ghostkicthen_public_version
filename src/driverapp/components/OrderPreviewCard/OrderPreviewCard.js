import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TNCard } from '../../../Core/truly-native';
import dynamicStyles from './styles';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import {DriverAPIManager} from '../../api/driver';

const apiManager = new DriverAPIManager();

const OrderPreviewCard = ({
    order,
    driver,
    appStyles,
    onMessagePress
}) => {
    const styles = dynamicStyles(appStyles);
    const buttonTitle = order.status === "Order Shipped" ? IMLocalized("Complete Pick Up") : IMLocalized("Complete Delivery")
    const headlineText = order.status === "Order Shipped" ? IMLocalized("Pick up - ") + order.vendor?.title : IMLocalized("Deliver to ") + order.author?.firstName
    const address = order.status === "Order Shipped" ? "" : (order.address?.line1 + " " + order.address?.line2)

    const onPress = () => {
        if (order.status === "Order Shipped") {
            // Order has been picked up, so we update the status
            apiManager.markAsPickedUp(order)
        } else {
            // Order has been delivered, so we update the status of both driver and order
            apiManager.markAsCompleted(order, driver)
        }
    }

    return (
        <TNCard appStyles={appStyles} containerStyle={styles.container}>
            <View style={styles.contentView}>
                <View style={styles.textContainer}>
                    <Text style={styles.headline}>{headlineText}</Text>
                    <Text style={styles.description}>{IMLocalized("Order #")}{order.id}</Text>
                    <Text style={styles.description}>{address}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.actionButtonContainer}
                        onPress={onPress}
                        >
                        <Text style={styles.actionButtonText}>{buttonTitle}</Text>
                    </TouchableOpacity>
                    {order.status === "In Transit" && (
                        <TouchableOpacity
                            style={styles.secondaryButtonContainer}
                            onPress={onMessagePress}
                            >
                            <Text style={styles.secondaryButtonText}>{IMLocalized("Message")}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TNCard>
    );
};

export default OrderPreviewCard;
