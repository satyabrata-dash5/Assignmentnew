import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements';
import HomeScreen from './HomeScreen';
import ProductListScreen from './ProductListScreen';
import CategoryScreen from './CategoryScreen';
import StudioScreen from './StudioScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import OrderHistoryScreen from './OrderHistoryScreen';
import SearchBarScreen from './SearchBarScreen';
import FavouriteScreen from './FavouriteScreen';


const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const ProductListStack = createStackNavigator();
const ProductDetailsStack = createStackNavigator();
const OrderHistoryStack = createStackNavigator();
const SearchBarStack = createStackNavigator();
const FavouriteStack = createStackNavigator();

const MainTabScreen = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#eb008b',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoryScreen}
                options={{
                    tabBarLabel: 'Categories',
                    tabBarColor: '#eb008b',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="grid" color={color} size={28} />
                    ),
                }}
            />


            <Tab.Screen
                name="Studio"
                component={StudioScreen}
                options={{
                    tabBarLabel: 'Studio',
                    tabBarColor: '#eb008b',
                    tabBarIcon: ({ color }) => (
                        <Feather name="tv" color={color} size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarColor: '#eb008b',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="modx" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#eb008b',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabScreen;

const LogoTitle = () => {
    return (
        <Image
            style={{ width: 110, height: 36, tintColor: "#eb008b", right: 10 }}
            source={require('../assets/Images/giphyLogo.png')}
        />
    );
}

const HomeStackScreen = ({ navigation }) => {

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffff',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: '500',
                },
            }}>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerLeft: () => (
                        <Icon.Button
                            name="ios-menu"
                            size={25}
                            color="black"
                            backgroundColor="#fff"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                            <Icon.Button
                                name="ios-search"
                                size={25}
                                color="black"
                                backgroundColor="#fff"
                                onPress={() => { navigation.navigate("SearchBar") }}
                            />
                            <TouchableOpacity
                                style={{ paddingHorizontal: 8, marginTop: 7 }}
                                onPress={() => { navigation.navigate('Favourite') }}>
                                <MaterialCommunityIcons name="heart-outline"
                                    size={25}
                                    backgroundColor="#ffff"
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>

                    ),

                }} />



            <ProductListStack.Screen
                name="Products"
                component={ProductListScreen}
                options={{
                    title: 'Product List',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                            <Icon.Button
                                name="ios-search"
                                size={25}
                                color="black"
                                backgroundColor="#fff"
                                onPress={() => { navigation.navigate("SearchBar") }}
                            />
                        </View>
                    )
                }}>
            </ProductListStack.Screen>

            <ProductDetailsStack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{
                    title: 'Product Details',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 8, marginTop: 7 }}
                                onPress={() => { navigation.navigate('Favourite') }}>
                                <MaterialCommunityIcons name="heart-outline"
                                    size={25}
                                    backgroundColor="#ffff"
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }}>
            </ProductDetailsStack.Screen>

            <OrderHistoryStack.Screen
                name="OrderHistory"
                options={{
                    title: 'Order History'
                }}
                component={OrderHistoryScreen}
            />
            <SearchBarStack.Screen
                name="SearchBar"
                component={SearchBarScreen}
                options={{
                    headerShown: false
                }}
            />
            <FavouriteStack.Screen
                name="Favourite"
                options={{
                    title: 'Favourite'
                }}
                component={FavouriteScreen}
            />
        </HomeStack.Navigator>
    );
};
