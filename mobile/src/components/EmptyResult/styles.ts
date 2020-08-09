import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  emptyResultImage: {
    width: 150,
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  emptyResultText: {
    color: '#8257E5',
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    flex: 1,
    alignSelf: 'center',
  },
});

export default styles;
