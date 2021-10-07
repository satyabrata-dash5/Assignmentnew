import React, { useEffect, useState } from 'react';
import {
  View, Text, Dimensions, Image, ActivityIndicator,
  StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, ToastAndroid, Alert
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const ProductDetailsScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(undefined);
  const [wishProductData, setWishProductData] = useState([]);
  const [removeWishProductData, setRemoveWishProductData] = useState([])
  const [activeSliderIndex, setActiveSliderIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    _retrieveData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      _retrieveData();
    });
    setIsLoading(true);
    console.log("RouteItem", route.params.item)
    let data = route.params && route.params.item ? route.params.item : undefined;
    if (data !== undefined) {
      setProductData(data);
      navigation.setOptions({ title: data.title });
    }
    setTimeout(() => {
      setIsLoading(false);
      setActiveSliderIndex(0);
    }, 1500);

    return willFocusSubscription;
  }, [])

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('wishList');
      if (value !== null) {
        // We have data!!
        let data = [];
        let getData = JSON.parse(value);
        let newData = data.concat(getData);
        setWishProductData(newData);
        setRemoveWishProductData(newData)
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const onRemoveFromWishlist = async () => {
    try {
      let removeData = wishProductData.length > 0 ? wishProductData.filter(x => x.id !== productData.id) : [];
      await AsyncStorage.setItem('wishList', JSON.stringify(removeData));
      ToastAndroid.showWithGravity(
        "Item Removed from wishlist",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setWishProductData(removeData);
    } catch (exception) {
      return false;
    }
  }

  const onAddToWishlist = async () => {
    if (wishProductData.length >= 5) {
      Alert.alert('Sorry! Maximum 5 items to be add in wishlist')
    }
    else if (wishProductData.length > 0 && wishProductData.some(x => x.id !== productData.id)) {
      console.log("If part", wishProductData.some(x => x.id === productData.id))
      let data = wishProductData;
      data.push(productData);
      try {
        await AsyncStorage.setItem('wishList', JSON.stringify(data));
        ToastAndroid.showWithGravity(
          "Item added to wishlist",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      } catch (error) {
        console.log("Something went wrong when adding to wishlist");
      }
    } else if (wishProductData.length === 0) {
      console.log("Else part")
      let data = wishProductData;
      data.push(productData);
      try {
        await AsyncStorage.setItem('wishList', JSON.stringify(data));
        ToastAndroid.showWithGravity(
          "Item added to wishlist",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      } catch (error) {
        console.log("Something went wrong when adding to wishlist");
      }
    } else {
      ToastAndroid.showWithGravity(
        "Item has already added in wishlist",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#eb008b" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        {productData != undefined ? (
          <View>
            <Image source={{ uri: productData.images.preview_gif.url }} style={{ height: H / 1.5, width: SLIDER_WIDTH }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", top: 20 }}>
              <View style={{ flex:0.9,flexDirection: "row" }}>
                <Text style={styles.title1}>{productData.title}</Text>
              </View>
              <View style={{ flex:0.1,right: 15 }} >
                {isTouch ?
                  (<TouchableOpacity onPress={() => { setIsTouch(!isTouch), onRemoveFromWishlist() }} >
                    <AntDesign
                      style={{ alignItems: "flex-end", alignSelf: "flex-end" }}
                      name="heart" color={"#eb008b"} size={35} />
                  </TouchableOpacity>
                  ) : (<TouchableOpacity onPress={() => { setIsTouch(!isTouch), onAddToWishlist() }} >
                    <AntDesign
                      style={{ alignItems: "flex-end", alignSelf: "flex-end" }}
                      name="hearto" color={"#eb008b"} size={35} />
                  </TouchableOpacity>)}
              </View>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Favourite")}
                style={styles.addToBagBtn}>
                <Text style={styles.btnText}>FAVOURITE LIST</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={{ fontWeight: "700", fontSize: 18 }}>Description :</Text>
              <Text numberOfLines={20} style={{ fontWeight: "500", fontSize: 15, lineHeight: 23, width: "100%" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  )
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  title1: {
    fontSize: 17,
    fontWeight: "700",
    marginHorizontal: 10
  },
  title2: {
    fontSize: 17,
    opacity: 0.5
  },
  subTitle: {
    fontSize: 17,
    opacity: 0.5,
    marginHorizontal: 10
  },
  price: {
    fontSize: 17,
    opacity: 0.8,
    marginHorizontal: 10
  },
  discountedPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 17,
    opacity: 0.3,
  },
  taxTitle: {
    fontSize: 11,
    color: '#05a685',
    fontWeight: "700",
    marginHorizontal: 10
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20
  },
  wishBtn: {
    width: "48%",
    height: 40,
    borderRadius: 3,
    backgroundColor: "#d4d3d8"
  },
  addToBagBtn: {
    width: "48%",
    height: 40,
    borderRadius: 3,
    backgroundColor: "#ff406c"
  },
  btnText: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    top: 10
  }
});
