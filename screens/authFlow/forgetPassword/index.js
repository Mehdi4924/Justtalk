import React, {Component, useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, Pressable, TouchableOpacity, Alert} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {
  Logos,
  Icons,
  TextInputs,
  Buttons,
  ScrollViews,
  Wrapper,
  Spacer,
} from '../../../components';
import {Icon} from '@rneui/base';
import {styles} from '../../../components/modals/styles';
import {
  appStyles,
  colors,
  fontFamily,
  fontSize,
  headers,
  routes,
} from '../../../services';
import RBSheet from 'react-native-raw-bottom-sheet';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ForgetPassword(props) {
  const refRBSheet = useRef();
  const {navigate, replace} = props.navigation;
  const [stayLoggedin, setstayLoggedin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [Duplicate, setDuplicate] = useState('');
  // Toasts.Success('Success');
  const forgotPassword = () => {
    console.log('prresed');
    auth()
      .sendPasswordResetEmail(email.trim())
      .then((user) => {
        refRBSheet.current.open()
        console.log('success');
        // auth().signInWithEmailLink(email)
        // alert('Please check your email...')
      })
      .catch((e) => {
      
        console.log('error', e);
        Alert.alert(e.message)
      });
  };
  return (
    <Wrapper isMain style={[{}]}>
      <View
        style={{
          height: height(10),
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: colors.lightgrey,
        }}>
        <TouchableOpacity
            onPress={() => props.navigation.goBack()}
          style={{marginHorizontal: width(4)}}>
          <Icon name="chevron-back" type="ionicon" color="#000" size={28} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: fontFamily.appTextBold,
            color: colors.welcome,
            fontSize: totalSize(2.1),
            marginLeft: width(13),
          }}>
          Reset Your Password
        </Text>
      </View>
      <ScrollViews.KeyboardAvoiding>
        <Spacer isDoubleBase />
        <Text
          style={{
            fontFamily: fontFamily.appTextBold,
            color: colors.welcome,
            fontSize: totalSize(3),
            textAlign: 'center',
            marginHorizontal: width(7),
          }}>
          Enter your email to reset your password
        </Text>
        <Wrapper marginHorizontalBase>
          <Spacer isDoubleBase />
          <TextInputs.ColoredNew
            title={'Email'}
            placeholder="Jonedoe@gmail.com"
            keyboardType="email-address"
            value={email.trim()}
            onChangeText={val => {
              setEmail(val);
              let reg2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (reg2.test(val) === false) {
                if (email !== undefined && email !== '') {
                  setEmailError("The email is badly formatted, must include @ and . in the end");
                  setDisabled(true);
                } else {
                  setEmailError("The email cannot be empty, it is a required field");
                  setDisabled(true);
                }
              } else {
                setEmailError("");
                setDuplicate('');
              }
            }}
          />
              {emailError.length > 0 && (
          <Text style={{paddingLeft: width(5), color: 'red'}}>
            {emailError}
          </Text>
        )}
        {Duplicate.length > 0 && (
          <Text style={{paddingLeft: width(5), color: 'green', fontSize: totalSize(1.3)}}>
            {Duplicate}
          </Text>
        )}
          <Spacer isDoubleBase />
          <Buttons.Colored
            text="SEND PASSWORD RESET LINK"
            buttonStyle={{backgroundColor: '#363333'}}
            textStyle={{fontSize: totalSize(1.8)}}
            onPress={() => 
              email!=''&&
              email!=null
             ? forgotPassword()
            :Alert.alert("Please add email")
            }
          />
          <Spacer isDoubleBase />
        </Wrapper>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={height(44)}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: 'white',
            //   elivation: 5,
            },
            draggableIcon: {
              backgroundColor: '#fff',
            },
          }}>
          <View>
            <Icon
              //   reverse
              name="check-circle"
              type="feather"
              color="#07C701"
              size={70}
            />
            <Spacer isDoubleBase />
            <Text
              style={{
                fontFamily: fontFamily.appTextBold,
                color: colors.welcome,
                fontSize: totalSize(3),
                textAlign: 'center',
                marginHorizontal: width(7),
              }}>
              Password reset link sent to your email
            </Text>
            <Spacer isDoubleBase />
            <Buttons.Colored
              text="CONTINUE"
              buttonStyle={{backgroundColor: '#363333'}}
              textStyle={{fontSize: totalSize(1.8)}}
              onPress={() => {refRBSheet.current.close(),navigate(routes.signin)}}
            />
            <Spacer isDoubleBase />
          </View>
        </RBSheet>
      </ScrollViews.KeyboardAvoiding>
    </Wrapper>
  );
}

export default ForgetPassword;
