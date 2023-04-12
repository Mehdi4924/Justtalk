import React, {
  Component,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {Buttons, Logos, Wrapper} from '../../../components';
import {
  appIcons,
  appImages,
  colors,
  fontFamily,
  fontSize,
  routes,
} from '../../../services';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BackgroundImage, Icon} from '@rneui/base';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  MessageImage,
  Message,
  Avatar,
} from 'react-native-gifted-chat';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from '../../../components/modals/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const arr = [
  {
    image: appIcons.security,
    name: 'House Party',
  },
  {
    image: appIcons.security,
    name: 'Kitty Chats',
  },
  {
    image: appIcons.security,
    name: 'Food Club',
  },
  {
    image: appIcons.security,
    name: 'Birthday Party',
  },
  {
    image: appIcons.security,
    name: 'Rave Room',
  },
  {
    image: appIcons.security,
    name: 'Pineapple Party',
  },
  {
    image: appIcons.security,
    name: 'Friends Squad',
  },
];
function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [myuser, setMyuser] = useState();
  const [uid, setuid] = useState();
  const [userName, setUserName] = useState("");
  const param = props.route.params;
  console.log('parrram', param);
  useFocusEffect(
    React.useCallback(async () => {
      const uid = await AsyncStorage.getItem('Token');
      console.log('chat screen uid', uid);
      setuid(uid);
      userInfo(uid);
    }, []),
  );
  useEffect(async () => {
    getAllMsg();
   
    const docid = param?.data?.id;
    const messageRef = firestore()
      .collection('Chat')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const userInfo = async (uid) => {
    console.log('userInfo called',uid);
    try {
      const ref = await  firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(res => {
          console.log('respone >>>>', res?._data?.username);
          setUserName(res?._data?.username)
        })
        .catch(err => {
          console.log('responese err', err);
        });
      console.log('valid fn called3', ref);
    } catch (err) {}
  };
  const getAllMsg = async (userid, myid) => {
    const docid = param?.data?.id;
    console.log('doc id is', docid);
    const querySnap = await firestore()
      .collection('Chat')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    console.log('Get message repsonse', querySnap);
    const allMsg = querySnap.docs.map(docSnap => {
      // console.log('Get message repsonseeeeeeeeeeeee', docSnap.data());
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
    });
    console.log('all messages now contain', allMsg);
    setMessages(allMsg);
    // allMsg.length == 0 ? setPrev(true) : null;
  };
  const onSend = (messages = []) => {
    console.log('Message sent is :---', messages);
    const msg = messages[0];
    const mymsg = {
      ...msg,
      username:userName,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));

    const docid = param?.data?.id;
    firestore()
      .collection('Chat')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  return (
    <Wrapper isMain style={[{}]}>
      <StatusBar backgroundColor={colors.yellow} />
      <View style={styles.chatScreenHeader}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(routes.home)}
          style={{marginHorizontal: width(3)}}>
          <Icon name="chevron-back" type="ionicon" color="#000" size={25} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              {uri:param?.data?.image != '' ? param?.data?.image : appImages.dummyprofile}
            }
            style={styles.headerImageStyle}
          />
          <View style={{marginLeft: width(3)}}>
            <Text style={styles.headerNameText}>{param?.data?.name}</Text>
            <Text style={styles.headerMemberText}>
              {param?.data?.Users?.length != null
                ? param?.data?.Users?.length
                : '0'}{' '}
              members
            </Text>
          </View>
        </View>
      </View>

      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: uid || 'qwerhjk',
          }}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                {...props}
                containerStyle={{
                  borderWidth: 1,
                  marginHorizontal: width(1.7),
                  borderRadius: 50,
                  backgroundColor: colors.welcome,
                  marginVertical: height(1),
                  marginBottom:height(2)
                }}
                textInputStyle={{color: '#ffff'}}
              />
            );
          }}
          renderSend={props => (
            <Send
              {...props}
              containerStyle={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.yellow,
                borderRadius: 100,
                marginRight: -2,
              }}>
              <Image
                source={appIcons.send}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            </Send>
          )}
          renderAvatar={props => {
            return <Avatar {...props} />;
          }}
          renderMessage={props => {
            // console.log('-=-=-=-=', props);
            return (
            <View  style={{
              // minHeight: 20,
              // backgroundColor: 'green',
              alignItems: props?.user?._id != props?.currentMessage?.user?._id?'flex-start':"flex-end",
              alignSelf:
                props?.user?._id != props?.currentMessage?.user?._id
                  ? 'flex-start'
                  : 'flex-end',
            }}>
                <Text style={{marginHorizontal:width(5),fontSize:totalSize(1.3),fontFamily:fontFamily.appTextMedium
                ,color:colors.welcome}}>{props?.currentMessage?.username}</Text>
              <View
                key={Math.random()}
                style={{
                  minHeight: 20,
                  backgroundColor: '#fff',
                  elevation: 3,
                  borderRadius: 30,
                  marginHorizontal: width(1.7),
                  marginBottom: height(4),
                  flexDirection:
                    props?.user?._id != props?.currentMessage?.user?._id
                      ? 'row'
                      : 'row-reverse',
                  alignSelf:
                    props?.user?._id != props?.currentMessage?.user?._id
                      ? 'flex-start'
                      : 'flex-end',
                }}>
                  
                <Image
                  source={
                    props?.currentMessage?.user?.avatar
                      ? {uri: props?.currentMessage?.user?.avatar}
                      : appImages.dummylogo
                  }
                  style={{
                    height: height(6),
                    width: height(6),
                    borderRadius: 100,
                  }}
                />
                 
                <View
                  style={{
                    padding: 10,
                    alignSelf: 'center',
                  }}>
                  
                  <Text
                    style={{
                      fontFamily: fontFamily.appTextRegular,
                      fontSize: totalSize(1.6),
                      color: colors.welcome,
                      maxWidth: width(55),
                      textAlign:
                        props?.user?._id != props?.currentMessage?.user?._id
                          ? 'left'
                          : 'right',
                    }}>
                    {props?.currentMessage?.text}
                  </Text>
                </View>
              </View>
              </View>
            );
          }}
        />
      </View>
    </Wrapper>
  );
}

export default Chat;
