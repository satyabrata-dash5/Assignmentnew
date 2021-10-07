import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

const ProductListScreen = ({ navigation, route }) => {
    const [isTouch, setIsTouch] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([])

    useEffect(() => {
        setIsLoading(true);
        let data = route.params && route.params.item ? route.params.item : undefined;
        if (data !== undefined) {
            navigation.setOptions({ title: data.title });
        }
        const fetchData = async () => {
            const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "wz5i4LNWIqFmKYT1TZ9yH6HJLOZuOnb6"
                }
            })
            console.log("Results", results.data.data);
            setCategoryData(results.data.data)
        }
        fetchData()
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#eb008b" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardsWrapper}>
                <FlatList
                    data={categoryData}
                    numColumns={2}
                    renderItem={({ item, index }) =>
                        <View style={styles.renderContainer} >
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('ProductDetails', { item: item }) }} >
                                <ImageBackground source={{ uri: item.images.preview_gif.url }} style={{ height: H / 3.02, width: W / 2.03, borderTopLeftRadius: 5, borderTopRightRadius: 5 }} >
                                </ImageBackground>
                            </TouchableOpacity>
                            <View style={styles.productInfo}>
                                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                            </View>
                        </View>
                    } />
            </View>

        </View>
    )
}

export default ProductListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    cardsWrapper: {
        width: '100%',
        alignSelf: 'center',
    },
    renderContainer: {
        marginTop: "0.5%",
        flex: 1
    },
    touchableOpacityContainer: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 65,
        height: 65,
        backgroundColor: '#f7bcdf',
        borderRadius: 50,
        marginHorizontal: 3
    },
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    productInfo: {
        marginLeft: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
    },
    subTitle: {
        fontSize: 15,
        opacity: 0.5,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
        width: "32%",
    },



});