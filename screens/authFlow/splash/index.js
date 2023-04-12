import React, { Component } from 'react';

import {View, Text, TextInput, Pressable,Image,StatusBar} from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import {  Wrapper,  } from '../../../components';
import { appImages, appStyles, colors, fontFamily } from '../../../services';

function Splash() {
  return (
   
    <View style={{backgroundColor:colors.yellow,alignItems:'center',justifyContent:'center',flex:1}}> 
    <StatusBar backgroundColor={colors.yellow} />
          <Image
                    source={appImages.logo}
                    resizeMode="contain"
                    style={{height:totalSize(22),width:totalSize(22)}}
                />
      <Text style={{fontFamily:fontFamily.appTextMedium,fontSize:totalSize(3),color:colors.black,marginTop:height(1)}}>JUST TALK!</Text>
    </View>
  );
}

export default Splash;
