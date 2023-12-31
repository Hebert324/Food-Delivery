import {View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
//import { Image } from "react-native-feather";
import { useNavigation, useRoute} from '@react-navigation/native'
import * as Icon from "react-native-feather";
import {themeColors} from "../theme";
import DishRow from "../components/dishRow";
import CartIcon from "../components/carticon";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectRestaurant, setRestaurant } from '../slices/restaurantSlice';
import { urlFor } from "../sanity";


export default function RestaurantScreen() {
    const {params} = useRoute();
    const navigation = useNavigation();
    let item = params;
    const dispatch = useDispatch();
    // console.log('restaurant: ',item);
    useEffect(()=>{
        if(item && item.id){
            dispatch(setRestaurant({...item}))
        }

    },[])
    return (
        <View>
            <StatusBar style='light' />
            <ScrollView className="h-full">
                <View className="relative">
                    <Image className="w-full h-72" source={{uri: urlFor(item.image).url()}} />
                    <TouchableOpacity
                        onPress={()=>navigation.goBack()}
                        className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
                        <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
                    className="bg-white -mt-12 pt-6"
                >
                    <View className="px-5">
                        <Text className="text-3xl fond-bold">{item.name}</Text>
                        <View ClassName="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
                                <Text className="text-xs">
                                    <Text className="text-green-700">{item.stars}</Text>
                                    <Text className="text-gray-700">
                                        ({item.reviews} reviews) · <Text className="font-semibold">{item?.type?.name}</Text>
                                    </Text>
                                </Text>
                            </View>
                            <View className="flex-row items-center space-y-1">
                                <Icon.MapPin color="gray" width="15" height="15" />
                                <Text className="text-gray-700 text-xs">Nearby· {item.address}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2">{item.description}</Text>
                    </View>
                </View>
                <View className="pd-36 bg-white">
                    <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
                    {/*dishes*/}
                    {
                        item.dishes.map((dish, index)=> <DishRow item={{...dish}} key={index} />)
                    }

                </View>
            </ScrollView>

            <CartIcon />
        </View>

    );
}