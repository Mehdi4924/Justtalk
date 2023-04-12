import React, {Component, useState, useEffect, TouchableOpacity} from 'react';
import {View, Text, TextInput, Pressable,Alert,ActivityIndicator} from 'react-native';
import {totalSize, width} from 'react-native-dimension';
import {
  Logos,
 
  Icons,
  TextInputs,
  Buttons,
  ScrollViews,
  Wrapper,
  Spacer,
} from '../../../components';
import {fonts, Icon} from '@rneui/base';
import {styles} from '../../../components/modals/styles';
import {
  appStyles,
  colors,
  fontFamily,
  fontSize,
  routes,
  sizes,
} from '../../../services';
import {ColorSpace} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
function Signin(props) {
  const {navigate, replace} = props.navigation;
  const [stayLoggedin, setstayLoggedin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [loader, setLoader] = useState(false);
  const [Duplicate, setDuplicate] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState('');
  // Toasts.Success('Success');
  const handleLogin = async()=>{
    setLoader(true)
    try{
      const isUserLogedin =await auth()
      .signInWithEmailAndPassword(email.trim(), password)
      console.log(">>>",isUserLogedin);
      AsyncStorage.setItem("Token", isUserLogedin.user._user.uid);
      setLoader(false) 
        replace(routes.app)
    } catch(err){
      console.log("errrrr",err)
      // setMessage(err.message)
      // Toast.show("catch error")
      Alert.alert(err.message)
      setLoader(false) 
    }
  };
  return (
    <Wrapper isMain style={[{}]}>
      <ScrollViews.KeyboardAvoiding>
        <Spacer isDoubleBase />
        <Wrapper alignItemsCenter>
          <Logos.Secondary
            size={sizes.images.extra}
            textStyle={styles.logoText}
          />
          <Spacer isDoubleBase />
        </Wrapper>
        <Wrapper alignItemsCenter>
          <View>
            <Text style={styles.welcomeText}>Welcome to Login!</Text>
            <View style={styles.barline}></View>
          </View>
        </Wrapper>
        <Spacer isBasic />
        <Wrapper marginHorizontalBase>
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
          <Spacer isBasic />
          {Duplicate.length === 0 && (
          <TextInputs.ColoredNew
            title={'Password'}
            placeholder="Password"
            value={password}
            
            onChangeText={val => {
              setPassword(val);
              let reg222 = /^[\w\d@$!%*#?&]{8,30}$/;
              if (reg222.test(val) === false) {
                if (val === '') {
                  setPassError("The password can not be empty, it is a required field");
                } else if (val.length > 7) {
                  setPassError("The password is badly formatted");
                } else {
                  setPassError('The password should be atleast 8 characters long!');
                }
              } else {
                setPassError('');
                if (
                  emailError.length == 0 &&
                  nameError.length == 0
                ) {
                  setDisabled(false);
                }
              }
            }}
            iconNameRight={showPass1 ? 'eye-with-line' : 'eye'}
            iconTypeRight="entypo"
            onPressIconRight={() => setShowPass1(!showPass1)}
            // onPressIconRight={setShowPass(true)}
            secureTextEntry={showPass1 ? false : true}
          />
          )}

          {Duplicate.length === 0 &&
            passError.length > 0 && (
              <Text style={{paddingLeft: width(5), color: 'red'}}>
                {passError}
              </Text>
            )}
          <Spacer isBasic />

          <Wrapper flexDirectionRow justifyContentSpaceBetween>
            <Wrapper flexDirectionRow>
              <Pressable
                onPress={() => setCheck(!check)}
                style={[
                  styles.circleStyle,
                  {
                    backgroundColor: check ? colors.yellow : '#fff',
                    borderWidth: check ? 0 : 1,
                  },
                ]}>
                <Icon
                  name={'check'}
                  type={'material-community'}
                  size={fontSize.h7}
                  color={check ? colors.welcome : '#fff'}
                  // iconStyle={[{ marginRight: width(2.5) }, iconStyle]}
                />
              </Pressable>
              <View
                style={{justifyContent: 'center', marginLeft: fontSize.tiny}}>
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
            </Wrapper>
            <Text
              style={styles.forgetText}
              onPress={() => navigate(routes.forgetpassword)}>
              Forgot Password?
            </Text>
          </Wrapper>
          <Spacer isDoubleBase />
          {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.welcome} />
          </View>
        ) : (
          <Buttons.Colored
            text="LOG IN"
            buttonStyle={{backgroundColor: colors.lightblack}}
            textStyle={{fontSize: fontSize.h8}}
            // onPress={() => replace(routes.app)}
            onPress={() => 
              email!=null&&
              password!=''&&
              password!=null&&
              emailError==""&&
              emailError!=null&&
              passError==""&&
              emailError!=null
             ? handleLogin()
            :Alert.alert("please enter correct info")
            }
          />
          )}
          <Spacer isDoubleBase />
          <Spacer isDoubleBase />
          <Spacer isDoubleBase />
          <Text style={styles.haveAccountText}>Don't have an account?</Text>
          <Spacer isBasic />
          <Buttons.Colored
            text="CREATE AN ACCOUNT"
            buttonStyle={{backgroundColor: colors.lightgrey}}
            textStyle={{color: colors.welcome, fontSize: fontSize.h8}}
            onPress={() => navigate(routes.signup)}
          />
        </Wrapper>
        <Spacer isBasic />
      </ScrollViews.KeyboardAvoiding>
    </Wrapper>
  );
}

export default Signin;
