import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
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

function TermCondition(props) {
  const {navigate, replace} = props.navigation;

  return (
    <Wrapper isMain style={[{}]}>
         <ScrollViews.KeyboardAvoiding>
      <View
        style={{
          flexDirection: 'row',
          height: totalSize(8),
        //   backgroundColor: colors.yellow,
          alignItems: 'center',
          paddingHorizontal:width(3),
        }}>
        <TouchableOpacity 
       onPress={() => props.navigation.goBack()}>
          <Icon name="chevron-back" type="ionicon" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={{marginLeft:width(14), textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
    fontSize: totalSize(2),
    color: colors.welcome,}}>CHAT ROOM AGREEMENT</Text>
      </View>
     
        <Text style={{ fontFamily: fontFamily.appTextRegular,paddingHorizontal:width(2),
    fontSize: totalSize(1.5),
    color: colors.welcome,}}>By entering and participating in the [JUST TALK]'s chat rooms you agree to the following terms and 
            conditions of participation. These terms and conditions are contractually binding upon you and you agree to each of them.{'\n'}
1. You enter and participate in the Chat Room and gain access to the materials contained thereon at your own risk.{'\n'}
2. We do not monitor or screen communications on the Chat Room and we are not responsible for any material that any Chat Room participant posts 
and we do not assume the responsibility to do so.{'\n'}
3. We do not make any representations or warranties as to the truth or accuracy of any statement made or materials posted on or
 through the Chat Room. You agree and acknowledge that you assume the risk of any actions you take in reliance upon the information
  that may be contained in the Chat Room.{'\n'}
4. We do not endorse or lend any credence for any statements that are made by any participant in the Chat Room.{'\n'}
5. You are fully responsible for your own statements and materials that you post in the Chat Room and any consequences,
 whether or not foreseen, to any party who may rely upon these statements. You agree that you will not take any action
  directed towards attempting to hold us responsible for any such materials or statements.{'\n'}
6. Any opinions or views expressed by Chat Room participants are their own. We do not endorse or support or otherwise give any credence or 
reason for reliance on any such statements or opinions.{'\n'}
7. In the event that we are notified by any party that any communications contained in the Chat Room or any parties participation in 
the Chat Room is contrary to these terms of Chat Room access, we may, but are not obligated to, investigate the situation and determine 
in our own discretion, whether to remove such communication from the Chat Room. We have no liability or responsibility to investigate or remove any content from the Chat Room based upon a complaint or otherwise.{'\n'}
8. As a participant in the Chat Room, you agree that we may remove any materials from the Chat Room for any reason, in our sole discretion, or for no reason at all. This includes material that is disruptive, abusive, offensive, illegal, vulgar, pornographic, or any other material. You hold us harmless from and against any damage you or others may suffer as a result of our removal of any content from the Chat Room or from the discontinuance of the Chat Room at any time.{'\n'}
9. We have the right to remove, expel, or disqualify any party from participation and access to the Chat Room for any time and for any reason, or for no reason whatsoever, in our sole and absolute discretion. This includes, but is not limited to any violation of this agreement, disruptive behavior, complaints from other parties, any allegedly illegal activity, or for any other reason or for no reason at all.{'\n'}
10. We reserve the right to terminate the Chat Room at any time and all users hold us harmless from and against any claims, damages, suits, threats, demands, liabilities, actions, causes of action, or injuries that may result therefrom, including but not limited to any consequential, incidental and special damages of every nature and type.{'\n'}
11. You agree that you will not (i) use the Chat Room for any illegal purpose, (ii) place any material in the Chat Room that violates the copyrights, trademarks, trade secrets, confidential information or other rights of any other party, (iii) place any material in the Chat Room that contains a false statement about any person, infringes upon the privacy rights of any other person, or threatens, harasses, abuses or embarrasses any other person, (iv) place any obscene, pornographic, sexually explicit or violent materials, graphics, photographs, text or otherwise in the Chat Room, (v) place any advertising, attempted business solicitation, marketing materials or sales promotional materials in the Chat Room, (vi) pretend to be another person that you are not, (vii) place materials in the Chat Room that are disruptive or off-topic.{'\n'}
12. By accessing the Chat Room and placing any information in the Chat Room, you hereby grant us a perpetual, irrevocable, royalty free license in and to such materials, including but not limited to the right to post, publish, transmit, distribute, create derivative works based upon, create translations of, modify, amend, enhance, change, display and publicly perform such materials in any form or media, whether now known or later discovered.{'\n'}
13. You grant to others who access the Chat Room a perpetual, non-revocable, royalty free license to view, download, store and reproduce your postings but such license is limited to the personal use and enjoyment of such other party accessing the Chat Room.</Text>
      </ScrollViews.KeyboardAvoiding>
    </Wrapper>
  );
}

export default TermCondition;
