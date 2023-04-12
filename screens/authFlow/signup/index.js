import {Icon} from '@rneui/base';
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {totalSize, width, height} from 'react-native-dimension';
import {ColorSpace} from 'react-native-reanimated';
import {
  Logos,
  Toasts,
  Icons,
  TextInputs,
  Buttons,
  ScrollViews,
  Wrapper,
  Spacer,
} from '../../../components';
import {styles} from '../../../components/modals/styles';
import {
  appStyles,
  colors,
  fontFamily,
  fontSize,
  routes,
  sizes,
} from '../../../services';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Signup(props) {
  const {navigate, replace} = props.navigation;
  const [check, setCheck] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');
  const [Duplicate, setDuplicate] = useState('');
  const [cpassError, setCpassError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [userIcon, setUserIcon] = useState(false);
  const [loader, setLoader] = useState(false);
  console.log('message', message);
  const validateField = () => {
    let userNameReg = /^[\w ]{3,30}$/;
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passReg = /^[\w\d@$!%*#?&]{8,30}$/;
    if (userNameReg.test(userName) === false) {
      if (userName === '') {
        setNameError('The username cannot be empty, it is a required field');
        setDisabled(true);
        return false;
      } else if (userName.length > 2) {
        setNameError('The username is badly formatted');
        setDisabled(true);
        return false;
      } else {
        setNameError('The username should be atleast 3 characters long!');
        setDisabled(true);
        return false;
      }
    } else {
      setNameError('');
      if (emailError.length == 0 && nameError.length == 0) {
        setDisabled(false);
      }
    }
    if (emailReg.test(email) === false) {
      if (email !== undefined && email !== '') {
        setEmailError(
          'The email is badly formatted, must include @ and . in the end',
        );
        setDisabled(true);
        return false;
      } else {
        setEmailError('The email cannot be empty, it is a required field');
        setDisabled(true);
        return false;
      }
    } else {
      setEmailError('');
      setDuplicate('');
    }
    if (passReg.test(password) === false) {
      if (password === '') {
        setPassError('The password can not be empty, it is a required field');
        return false;
      } else if (password.length > 7) {
        setPassError('The password is badly formatted');
        return false;
      } else {
        setPassError('The password should be atleast 8 characters long!');
        return false;
      }
    } else {
      setPassError('');
      if (emailError.length == 0 && nameError.length == 0) {
        setDisabled(false);
      }
    }
    if (passReg.test(confirmpassword) === false) {
      if (confirmpassword === '') {
        setCpassError(
          'The confirm password can not be empty, it is a required field',
        );
        return false;
      } else if (confirmpassword.length > 7) {
        setCpassError('The confirm password is badly formatted');
        return false;
      } else {
        setCpassError(
          'The confirm password should be atleast 8 characters long!',
        );
        return false;
      }
    } else if (password !== confirmpassword) {
      setCpassError('The password and confirm password do not match');
      return false;
    } else {
      setCpassError('');
      if (emailError.length == 0 && nameError.length == 0) {
        setDisabled(false);
      }
    }
    return true;
  };
  const handleSignUp = async () => {
    setLoader(true);
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      );
      console.log('>>>', isUserCreated);
      if (isUserCreated.additionalUserInfo.isNewUser == true) {
        AsyncStorage.setItem('Token', isUserCreated.user._user.uid);
        AsyncStorage.setItem('Name', userName);
        const docid = isUserCreated.user._user.uid;
        console.log('docid', docid);
        const info = {uid: isUserCreated.user._user.uid, username: userName};
        console.log('info', info);
        await firestore().collection('Users').doc(docid).set(info);
        setLoader(false);
        replace(routes.app);
      } else {
        setLoader(false);
      }
    } catch (err) {
      console.log('errrrr', err.message);
      setLoader(false);
      // setMessage(err.message)
      // Toast.show("catch error")
      Alert.alert(err.message);
    }
  };
  const nameCheck = async () => {
    setUserIcon(true);
    console.log('name check called');
    try {
      if (userName !== '') {
        console.log('valid fn called2');
        console.log('username1', userName); //'e@e.com √'
        const ref = firestore().collection('Users');
        console.log('valid fn called3');
        ref
          .where('username', '==', userName)
          .get()
          .then(querySnapshot => {
            console.log('valid fn called4');
            querySnapshot.forEach(doc => {
              // console.log(doc.id, '=>>>>', doc.data());
              // console.log('valid fn called5');
              if (doc.id != '') {
                console.log('true');
                setUserIcon(false);
                Alert.alert('Username already exist');
              } else {
                console.log('false');
              }
            });
          });
      }
    } catch (err) {
      console.log('errrrr', err.message);
      setLoader(false);

      Alert.alert(err.message);
    }
  };
  const handleChange = event => {
    // console.log("handle call howa");
    const {type, text, value} = event;
    console.log('tttt', text);
    let processedData = text;
    console.log('processedData', processedData);
    // if(type==='text') {
    //     processedData = value.toUpperCase();
    // } else {}
    setEmail(processedData);
    let reg2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg2.test(text) === false) {
      if (processedData != undefined) {
        setEmailError(
          'The email is badly formatted, must include @ and . in the end',
        );
        setDisabled(true);
      } else {
        setEmailError('The email cannot be empty, it is a required field');
        setDisabled(true);
      }
    } else {
      setEmailError('');
      setDuplicate('');
    }
  };
  return (
    <Wrapper isMain style={[{}]}>
      <ScrollViews.KeyboardAvoiding>
        <Spacer isBasic />
        <Spacer isDoubleBase />
        <Wrapper alignItemsCenter>
          <Logos.Secondary
            size={sizes.images.extra}
            textStyle={styles.logoText}
          />
          <Spacer isDoubleBase />
        </Wrapper>
        <Spacer isBasic />
        <Wrapper marginHorizontalBase>
          <Wrapper alignItemsCenter>
            <View>
              <Text style={styles.welcomeText}>Welcome to SignUp!</Text>
              <View style={styles.barline}></View>
            </View>
          </Wrapper>
          <Spacer isBasic />
          <TextInputs.ColoredNew
            title={'Username'}
            value={userName}
            onChangeText={val => {
              setUserName(val);
              let reg11 = /^[\w ]{3,30}$/;
              if (reg11.test(val) === false) {
                if (val === '') {
                  setNameError(
                    'The username cannot be empty, it is a required field',
                  );
                  setDisabled(true);
                } else if (val.length > 2) {
                  setNameError('The username is badly formatted');
                  setDisabled(true);
                } else {
                  setNameError(
                    'The username should be atleast 3 characters long!',
                  );
                  setDisabled(true);
                }
              } else {
                setNameError('');
                if (emailError.length == 0 && nameError.length == 0) {
                  setDisabled(false);
                }
              }
            }}
            onSubmitEditing={() => nameCheck()}
            placeholder="Jonedoe123"
            iconNameRight={'check-circle'}
            iconTypeRight="feather"
            iconColorRight={userIcon ? '#07C701' : colors.inputback}
          />
          {nameError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {nameError}
            </Text>
          )}
          <Spacer isBasic />
          <TextInputs.ColoredNew
            title={'Email'}
            placeholder="Jonedoe@gmail.com"
            keyboardType="email-address"
            value={email.trim()}
            // onChange={handleChange}
            onChangeText={val => {
              setEmail(val);
              let reg2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (reg2.test(val) === false) {
                if (email !== undefined && email !== '') {
                  setEmailError(
                    'The email is badly formatted, must include @ and . in the end',
                  );
                  setDisabled(true);
                } else {
                  setEmailError(
                    'The email cannot be empty, it is a required field',
                  );
                  setDisabled(true);
                }
              } else {
                setEmailError('');
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
            <Text
              style={{
                paddingLeft: width(5),
                color: 'green',
                fontSize: totalSize(1.3),
              }}>
              {Duplicate}
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
                    setPassError(
                      'The password can not be empty, it is a required field',
                    );
                  } else if (val.length > 7) {
                    setPassError('The password is badly formatted');
                  } else {
                    setPassError(
                      'The password should be atleast 8 characters long!',
                    );
                  }
                } else {
                  setPassError('');
                  if (emailError.length == 0 && nameError.length == 0) {
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

          {Duplicate.length === 0 && passError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {passError}
            </Text>
          )}
          <Spacer isBasic />
          <TextInputs.ColoredNew
            title={'Confirm Password'}
            placeholder="Password"
            value={confirmpassword}
            onChangeText={val => {
              setConfirmPassword(val);
              let reg222 = /^[\w\d@$!%*#?&]{8,30}$/;
              if (reg222.test(val) === false) {
                if (val === '') {
                  setCpassError(
                    'The confirm password can not be empty, it is a required field',
                  );
                } else if (val.length > 7) {
                  setCpassError('The confirm password is badly formatted');
                } else {
                  setCpassError(
                    'The confirm password should be atleast 8 characters long!',
                  );
                }
              } else if (password !== val) {
                setCpassError('The password and confirm password do not match');
              } else {
                setCpassError('');
                if (emailError.length == 0 && nameError.length == 0) {
                  setDisabled(false);
                }
              }
            }}
            iconNameRight={showPass ? 'eye-with-line' : 'eye'}
            iconTypeRight="entypo"
            onPressIconRight={() => setShowPass(!showPass)}
            secureTextEntry={showPass ? false : true}
          />
          <Spacer isBasic />
          <View
            // onPress={() => setstayLoggedin(!stayLoggedin)}
            style={{flexDirection: 'row'}}>
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
            <View style={styles.acceptMainView}>
              <Text style={styles.acceptText}>Accept </Text>
              <TouchableOpacity onPress={() => navigate(routes.tremcondition)}>
                <Text style={styles.privacyText}>T&C, Privacy Policy </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Spacer isDoubleBase />
          {loader ? (
            <View>
              <ActivityIndicator size={totalSize(3)} color={colors.welcome} />
            </View>
          ) : (
            <Buttons.Colored
              text="SIGNUP"
              buttonStyle={{backgroundColor: '#363333'}}
              textStyle={{fontSize: fontSize.h8}}
              // onPress={() => replace(routes.app)}
              onPress={() =>
                check == false
                  ? Alert.alert('Please accept terms and conditions')
                  : email != '' &&
                    email != null &&
                    password != '' &&
                    password != null
                  ?handleSignUp() 
                 
                  :  Alert.alert('please fill all feild')
              }
            />
          )}
          <Spacer isDoubleBase />
          <Spacer isDoubleBase />
          <Spacer isDoubleBase />
          <Text style={styles.haveAccountText}>Already have an account?</Text>
          <Spacer isBasic />
          <Buttons.Colored
            text="LOGIN"
            textStyle={{fontSize: fontSize.h8, color: colors.welcome}}
            buttonStyle={{backgroundColor: colors.lightgrey}}
            onPress={() => navigate(routes.signin)}
          />

          <Spacer isDoubleBase />
        </Wrapper>
        <Spacer isBasic />
      </ScrollViews.KeyboardAvoiding>
    </Wrapper>
  );
}

export default Signup;
