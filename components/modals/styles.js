import {StyleSheet} from 'react-native';
import {totalSize, width, height} from 'react-native-dimension';
import {sizes, colors, appStyles, fontFamily} from '../../services';

export const styles = StyleSheet.create({
  professionsCard: {
    //borderColor:colors.appBgColor3,
    marginBottom: sizes.marginBottom,
  },
  selectedProfessionsCard: {
    // borderColor:colors.appTextColor1,
    backgroundColor: colors.appBgColor2,
    marginBottom: sizes.marginBottom,
  },

  ////SwipableModal
  swipableModalFooter: {
    backgroundColor: colors.appBgColor1,
    borderTopLeftRadius: sizes.cardRadius,
    borderTopRightRadius: sizes.cardRadius,
    paddingTop: sizes.baseMargin,
    ...appStyles.shadowDark,
  },
  barContainer: {
    top: sizes.TinyMargin,
    alignSelf: 'center',
  },
  //EnterValueModalPrimaryCard
  enterValueModalPrimaryCard: {
    backgroundColor: colors.appBgColor1,
    borderRadius: sizes.modalRadius,
    padding: sizes.baseMargin,
    marginHorizontal: sizes.marginHorizontal * 2,
    ...appStyles.shadow,
  },
  // >>>>>>>>>>>>signin screen
  welcomeText: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: totalSize(3),
    color: colors.welcome,
    textAlign: 'center',
  },
  barline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.yellow,
    width: width(35),
  },
  rememberText: {
    fontSize: totalSize(1.5),
    fontFamily: fontFamily.appTextRegular,
    color: colors.welcome,
  },
  forgetText: {
    fontSize: totalSize(1.5),
    fontFamily: fontFamily.appTextBold,
    color: colors.welcome,
  },
  haveAccountText: {
    textAlign: 'center',
    fontFamily: fontFamily.appTextRegular,
    fontSize: totalSize(1.8),
    color: '#222222',
  },
  circleStyle: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: totalSize(2.2),
    width: totalSize(2.2),
    marginLeft: width(2),
  },
  logoText: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: totalSize(2.5),
    color: colors.welcome,
  },
  // >>>>>>>>>>signup
  acceptMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: totalSize(1),
  },
  acceptText: {
    fontFamily: fontFamily.appTextRegular,
    color: colors.welcome,
    fontSize: totalSize(1.5),
  },
  privacyText: {
    fontFamily: fontFamily.appTextBold,
    color: colors.welcome,
    fontSize: totalSize(1.5),
  },
  // >>>>>>>>>>>:>>>>home screen
  headerMainView: {
    height: totalSize(10),
    backgroundColor: colors.yellow,
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingHorizontal: width(5),
    alignItems:'center'

  },
  chatRoomText: {
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
    fontSize: totalSize(2.8),
    color: colors.welcome,
    marginTop: height(4),
  },
  jionRoomText: {
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
    fontSize: totalSize(2),
    color: colors.welcome,
    marginVertical: height(2),
  },
  imageStyle: {height: totalSize(15), width: totalSize(15)},
  circleImageStyle: {
    height: totalSize(6),
    width: totalSize(6),
    borderRadius: 100,
  },
  roomNameText: {
    fontFamily: fontFamily.appTextBold,
    fontSize: totalSize(1.3),
    color: colors.welcome,
    marginTop: height(1),
  },
  rbBGImageStyle: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  rbNameMainView: {
    width: width(100),
    backgroundColor: '#fff',
    marginTop: height(32.5),
  },
  rbNameText: {
    marginTop: height(3),
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
    color: colors.black,
    fontSize: totalSize(3),
  },
  membersText: {
    marginTop: height(2),
    textAlign: 'center',
    fontFamily: fontFamily.appTextRegular,
    color: colors.black,
    fontSize: totalSize(1.9),
  },
  // >>>>>>>>>>>>>>>>chat screen
  chatScreenHeader:{
    flexDirection: 'row',
    height: totalSize(10),
    backgroundColor: colors.yellow,
    alignItems: 'center',
  },
  headerImageStyle:{
    height: totalSize(6),
    width: totalSize(6),
    borderRadius: 100,
  },
  headerNameText:{
    fontSize: totalSize(1.9),
    fontFamily: fontFamily.appTextBold,
    color: colors.welcome,
  },
  headerMemberText:{
    fontSize: totalSize(1.4),
    fontFamily: fontFamily.appTextRegular,
    color: colors.welcome,
  }
});
