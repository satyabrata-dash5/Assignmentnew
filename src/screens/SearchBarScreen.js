import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity, StatusBar
} from "react-native";
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';


const SearchBarScreen = ({ navigation }) => {
    const [searchBarFocused, setSearchBarFocused] = useState(false);
    const [text, setText] = useState("");
    const [filterData, setFilterData] = useState([])

    const gifData = async (text) => {
        //  Keyboard.dismiss()
        try {
            const datas = await axios.get("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "wz5i4LNWIqFmKYT1TZ9yH6HJLOZuOnb6",
                    q: text,
                    lang: "en",
                }
            })
            console.log("Data==>", datas.data.data);
            setFilterData(datas.data.data)
        } catch (err) {
            console.log("err");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.search}>
                    <Animatable.View animation="slideInRight" duration={1000} style={styles.search_input}>
                        <Animatable.View animation={searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={400}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Icon name={"md-arrow-back"} style={styles.search_icon} />
                            </TouchableOpacity>
                        </Animatable.View>
                        <TextInput
                            placeholder="Search for latest Gifs"
                            style={styles.textinput}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={text}
                            onChangeText={(value) => { gifData(value); setText(value) }}
                            onSubmitEditing={() => {
                                gifData(text)
                            }}
                        />
                        <TouchableOpacity onPress={() => { gifData(text) }}>
                            <Icon name="search" style={styles.search_mic} />
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
                <View>
                    <FlatList
                        data={filterData}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={styles.renderContainer} >
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate('ProductDetails', { item: item }) }} >
                                    <Image source={{ uri: item.images.preview_gif.url }} style={{ height: IMAGE_WIDTH, width: IMAGE_WIDTH, margin: IMAGE_WIDTH * 0.05 }} />
                                </TouchableOpacity>
                            </View>
                        } />
                </View>
            </View >
        </View>
    )
}

export default SearchBarScreen
const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;
const COLUMN_WIDTH = W / 2
const IMAGE_WIDTH = COLUMN_WIDTH * 0.9

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        //top: H / 25,
        flex: 1,
    },
    search: {
        height: 80,
        backgroundColor: '#eb008b',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    search_input: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 23,
        flexDirection: 'row',
        alignItems: 'center',
    },
    search_icon: {
        fontSize: 24,
        marginLeft: 15,
        color: '#eb008b',
    },
    textinput: {
        flex: 1,
        fontSize: 18,
        marginLeft: 15,
        alignItems: 'center',
    },
    search_mic: {
        fontSize: 28,
        marginRight: 15,
        color: '#eb008b',
        alignItems: 'flex-end',
    },
});