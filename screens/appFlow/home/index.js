import React, {Component, useRef, useEffect, useState} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {Buttons, Logos, Wrapper, Spacer} from '../../../components';
import {
  appIcons,
  appImages,
  colors,
  fontFamily,
  fontSize,
  routes,
  sizes,
} from '../../../services';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import {BackgroundImage} from '@rneui/base';
import {styles} from '../../../components/modals/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Icon} from '@rneui/base';
function Home(props) {
  const refRBSheet = useRef();
  // const arr=new Array(7);
  const [data, setData] = useState('');
  const [dataGet, setDataGet] = useState('');
  const [uid, setUID] = useState('');
  const [match, setMatch] = useState('');
  // console.log('match data on home', match);
  // console.log('data on home', data);
  const angle = (360 / 7).toString();
  const circleDiameter = width(77.5);
  const circleRadius = width(38.5);
  const {navigate,replace} = props.navigation;
  const arr = [
    {
      image: appImages.image1,
      name: 'House Party',
    },
    {
      image: appImages.pic,
      name: 'Kitty Chats',
    },
    {
      image: appImages.image1,
      name: 'Food Club',
    },
    {
      image: appImages.pic,
      name: 'Birthday Party',
    },
    {
      image: appImages.image1,
      name: 'Pineapple Party',
    },
    {
      image: appImages.pic,
      name: 'Rave Room',
    },
    {
      image: appImages.image1,
      name: 'Friends Squad',
    },
  ];
  useFocusEffect(
    React.useCallback(() => {
      getAllRooms('');
    }, []),
  );
  const getAllRooms = async (userid, myid) => {
    const querySnap = await firestore().collection('ChatRooms').get();

    console.log('Get getAllRooms repsonse', querySnap);
    const dataRoom = querySnap._docs.map(docs => docs._data);
    const members = dataRoom.length;
    console.log('dta dataRoom', dataRoom);
    console.log('dta members', members);
    setDataGet(dataRoom);
    const Token = await AsyncStorage.getItem('Token');
    console.log('this is token', Token);
    setUID(Token);
  };
  return (
    <Wrapper isMain style={[{}]}>
      <StatusBar backgroundColor={colors.yellow} />
      <View style={styles.headerMainView}>
        <Logos.Secondary
          size={sizes.images.smallogo}
          textStyle={styles.logoText}
        />
       <TouchableOpacity 
       onPress={()=>
        {AsyncStorage.removeItem('Token')
        replace(routes.auth)}}
       >
       <Icon name="logout" type="material-community" color={colors.welcome} />
       </TouchableOpacity>
      </View>

      <View style={{flex: 0.27}}>
        <Text style={styles.chatRoomText}>YOUR VOICE IS POWERFUL</Text>
        <Text style={styles.jionRoomText}>Join Any Room Now</Text>
      </View>

      <View style={{flex: 0.7, alignItems: 'center'}}>
        <View
          style={{
            width: circleDiameter,
            aspectRatio: 1,
            borderWidth: 2,
            borderColor: colors.yellow,
            borderRadius: circleRadius,
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: height(6),
          }}>
          <Image source={appImages.logo} style={styles.imageStyle} />
          {dataGet?.length > 0 ? (
            <>
              {dataGet?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('pressed', item),
                        setData(item),
                        setMatch(item.Users.find(itemm => itemm == uid));
                      refRBSheet.current.open();
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      transform: [
                        {rotate: `${angle * index}deg`},
                        {translateY: -circleRadius},
                        {rotate: `-${angle * index}deg`},
                      ],
                    }}>
                    <Image
                      source={{uri: item.image != '' ? item.image : appImages.dummy}}
                      style={styles.circleImageStyle}
                    />
                    <Text style={styles.roomNameText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : null}
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={height(57.5)}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 45,
              borderTopRightRadius: 45,
              // backgroundColor:'red'
            },
            wrapper: {
              backgroundColor: 'transparent',
            },
          }}>
          <BackgroundImage
            source={{uri:data?.image != '' ? data?.image : appImages.dummy}}
            style={styles.rbBGImageStyle}>
            <View style={styles.rbNameMainView}>
              <Text style={styles.rbNameText}>{data.name}</Text>
              <Text style={styles.membersText}>
                {/* 136 members joined the room */}
                {data?.Users?.length != null ? data?.Users?.length : '0'}{' '}
                members joined the room
              </Text>
              <View style={{paddingHorizontal: width(9)}}>
                {/* {console.log('data users', data.Users)} */}
                {match == uid ? (
                  <Buttons.Colored
                    text="START TALK"
                    textStyle={{fontSize: fontSize.h8, color: colors.welcome}}
                    buttonStyle={{
                      backgroundColor: colors.yellow,
                      marginVertical: height(5),
                    }}
                    onPress={() => (
                      refRBSheet.current.close(),
                      navigate(routes.chat, {data: data})
                    )}
                  />
                ) : (
                  <Buttons.Colored
                    text="START TALK"
                    textStyle={{fontSize: fontSize.h8, color: colors.welcome}}
                    buttonStyle={{
                      backgroundColor: colors.yellow,
                      marginVertical: height(5),
                    }}
                    onPress={async () => {
                      const info = {
                        Users: [...data.Users, uid],
                        id: data?.id,
                        name: data?.name,
                        image: data?.image,
                      };
                      console.log('this is info', info);
                      await firestore()
                        .collection('ChatRooms')
                        .doc(data?.id)
                        .set(info);
                      {
                        refRBSheet.current.close();
                      }
                      navigate(routes.chat, {data: data});
                    }}
                  />
                )}
              </View>
              <Spacer isDoubleBase />
            </View>
          </BackgroundImage>
        </RBSheet>
      </View>
    </Wrapper>
  );
}

export default Home;
