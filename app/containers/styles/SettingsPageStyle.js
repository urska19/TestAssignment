import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'gray',
      paddingTop: 10,
  },
  innerContainer: {
    marginHorizontal: 10,
  },
  textStyle: {
    fontSize: 16,
    color: 'black'
  },
  listRowContainerStyle: {
		height: 46,
		backgroundColor: 'white',
		borderRadius: 10,
		borderWidth: 1,
		marginVertical: 2,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingHorizontal: 15,
  }
});