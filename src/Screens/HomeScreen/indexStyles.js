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
  slide: {
    width: '100%',
    backgroundColor: 'white',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    // elevation: 1,
  },
  wrapSuggestion: {
    width: '85%',
    maxHeight: 200,
    backgroundColor: 'white',
    padding: 16,
  },
  itemSuggestion: {
    marginBottom: 10,
  },
  textItemSuggestion: {
    fontWeight: '600',
    fontSize: 16,
  },
  wrapCarousel: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
