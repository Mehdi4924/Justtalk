import React from 'react'
import { totalSize } from 'react-native-dimension';
import {  appIcons, appImages, fontFamily } from '../../services';
import * as Icons  from '../icons';

export const Primary = ({ size }) => {
  return (
    <Icons.Custom
      icon={appIcons.security}
      size={size}
    />
  );
}
export const Secondary = ({ size ,textStyle}) => {
  return (
    <Icons.ImageWithText
      icon={appImages.logo}
      size={size}
      text={"JUST TALK!"}
      textStyle={textStyle}
    />
  );
}