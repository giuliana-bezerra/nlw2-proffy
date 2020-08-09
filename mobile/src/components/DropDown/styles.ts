import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 16,
    height: 48,
    borderRadius: 8,
  },
  dropDown: {
    backgroundColor: '#F8F8FC',
  },
  dropDownItem: {
    justifyContent: 'flex-start',
    borderBottomColor: '#E6E6F0',
    borderBottomWidth: 1,
    backgroundColor: '#F8F8FC',
    height: 47,
  },
  dropDownList: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    overflow: 'hidden',
    backgroundColor: '#EBEBF5',
  },
  placeholder: {
    color: '#C1BCCC',
  },
  label: {
    color: '#6A6180',
    fontFamily: 'Poppins_400Regular',
    marginLeft: 15,
  },
  selectedLabel: {
    marginLeft: 5,
  },
  activeLabel: {
    color: '#6A6180',
    fontFamily: 'Poppins_600SemiBold',
  },
  activeItem: {
    backgroundColor: '#EBEBF5',
    borderLeftColor: '#8257E5',
    borderLeftWidth: 2,
  },
});

export default styles;
