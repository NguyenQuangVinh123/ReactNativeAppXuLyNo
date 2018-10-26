import { StyleSheet } from 'react-native';
import { dims, responsiveFont } from '../dims';

export const IMAGE_HEIGHT = dims.screenHeight * 0.4;
export const IMAGE_HEIGHT_SMALL = dims.screenHeight * 0.2;

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    width: dims.screenWidth * 0.8,
    color: '#fff',
    textAlign: 'center',
    fontSize: responsiveFont(dims.fontTextSize),
    marginBottom: dims.defaultPadding,
    
    fontWeight: '400'
  },
  touch: {
    backgroundColor: 'green'
  },
  form: {
    width: dims.screenWidth,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#05713a',
    alignItems: 'center'
  },
  input: {
    padding: 7,
    fontSize: responsiveFont(dims.fontTextSize - 0.2),
    backgroundColor: '#fff',
    width: dims.screenWidth * 0.8,
    borderRadius: 2,
    marginBottom: dims.defaultPadding,
    
  },
  logoWrapper: {
    height: IMAGE_HEIGHT,
    width: dims.screenWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    resizeMode: 'center',
    width: '70%',
    height: '70%',
    alignSelf: 'center'
  },
  register: {
    marginBottom: 20,
    width: dims.screenWidth - 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#ffae'
  },
  submit: {
    backgroundColor: '#0b3b22',
    padding: 7,
    paddingHorizontal: 20,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: dims.defaultPadding,
    flexDirection: 'row'
  },
  submitText: {
    fontSize: responsiveFont(dims.fontInputSize + 0.2),
    color: '#fff',
    fontWeight: '500'
  }
});
