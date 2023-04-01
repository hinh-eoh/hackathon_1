import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  wrapSearch: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    height: 40,
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
    width: '85%',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});
