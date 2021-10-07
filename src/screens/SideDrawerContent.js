import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import LinearGradient from 'react-native-linear-gradient';
import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export function SideDrawerContent(props) {

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={['#694fad', '#b06ab3']} style={styles.linearGradient}>
                <View style={styles.userInfoSection}>
                    <View style={{ marginTop: 40 }}>
                        <Image
                            source={require('../assets/Images/user.png')}
                            style={styles.profile} />

                        <Text style={styles.title}>Satyabrata Dash</Text>
                    </View>
                </View>
            </LinearGradient>
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="view-grid-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Categories"
                            onPress={() => { }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="heart-multiple-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Favourite"
                            onPress={() => { props.navigation.navigate('Favourite') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="cart-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Order History"
                            onPress={() => { props.navigation.navigate('OrderHistory') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="credit-card-multiple-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Saved Cards"
                            onPress={() => { }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Octicons
                                    name="gear"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => { }}
                        />

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 20,
        marginVertical: 8,
        fontWeight: '800',
        color: "#FFF",
    },
    caption: {
        fontSize: 20,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: -15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    linearGradient: {
        width: undefined,
    },
    profile: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: "#FFF",
    },
});