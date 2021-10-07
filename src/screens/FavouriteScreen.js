
import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    Image, FlatList, AsyncStorage, ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FavouriteScreen = () => {
    const [catagoryData, setCatagoryData] = useState([]);

    useEffect(() => {
        _retrieveData();
    }, [])

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('wishList');
            if (value !== null) {
                setCatagoryData(JSON.parse(value))
            }
        } catch (error) {

        }
    };

    const onRemoveFromWishlist = async (item) => {
        console.log("Item", catagoryData.map(x => x.id))
        try {
            // await AsyncStorage.removeItem('wishList');
            let removeData = catagoryData.filter(x => x.id !== item.id);
            await AsyncStorage.setItem('wishList', JSON.stringify(removeData));
            ToastAndroid.showWithGravity(
                "Item Removed from wishlist",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            setCatagoryData(removeData);
        } catch (exception) {
            return false;
        }
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={catagoryData}
                renderItem={({ item, i }) =>
                    <View>
                        <View style={styles.menuItem} >
                            <View style={styles.touchableOpacityContainer}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <View style={styles.img}>
                                        <Image source={{ uri: item.images.preview_gif.url }} style={{ width: 120, height: 140 }} />
                                    </View>

                                    <View style={styles.textView}>
                                        <Text style={styles.menuItemText} >{item.title}</Text>
                                        <Text style={[styles.menuItemText, { fontSize: 14, fontWeight: "500" }]} >{item.subTitle}</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flexDirection: "row", marginLeft: "30%", alignItems: "center", padding: 10 }}>
                                <TouchableOpacity onPress={() => { }}
                                    style={{ flexDirection: "row", paddingHorizontal: 45, alignItems: "center" }}
                                    onPress={() => { onRemoveFromWishlist(item) }}>
                                    <Icon name="trash" size={20} color="#694fad" />
                                    <Text style={{ marginLeft: 5 }}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                } />

        </View>
    )
}

export default FavouriteScreen
const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 200,
        marginTop: 100,
    },
    txt: {
        alignItems: 'center',
        fontSize: 20,
        marginTop: 15,
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        width: '40%',
        alignSelf: 'center',
    },
    booking: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#eb008b',
    },
    textBooking: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"
    },
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    menuItem: {
        backgroundColor: '#ffff',
        height: 140,
        margin: 3,

    },
    touchableOpacityContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    menuItemText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
    },
    img: {
        flex: 0.4,
    },
    textView: {
        flex: 0.6,
        marginTop: '5%',
        marginLeft: "-8%"
    },
    btn: {
        alignItems: 'center',
        marginTop: 50,
        width: '60%',
    }

});
