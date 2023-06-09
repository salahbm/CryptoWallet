import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  white: '#fff',

  red: '#D84035',
  black: '#000000',
  gray: '#212125',
  gray1: '#1f1f1f',
  bluish: '#04FF82',
  powderBlue: '#7902B0',
  rose: '#CC3363',
  violent: '#20063B',
  green: '#28ED45',
  yellow: '#FFE403',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,

  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},

  body1: {fontFamily: 'FontAwesome', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'FontAwesome', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'FontAwesome', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'FontAwesome', fontSize: SIZES.body4, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
