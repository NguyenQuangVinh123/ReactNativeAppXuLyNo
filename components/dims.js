import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const isIphoneX = Platform.OS === 'ios' && (height > 800 || width > 800);

export const responsiveFont = size => {
  const deviceHeight = isIphoneX
    ? height * 0.9
    : Platform.OS === 'android'
      ? height - StatusBar.currentHeight
      : height;

  return Math.sqrt(deviceHeight * deviceHeight + width * width) * (size / 100);
};

export const dims = {
  defaultPadding: width * 0.03,
  screenWidth: width,
  screenHeight: height,
  fontTextSize: 1.8,
  fontInputSize: 2
};
