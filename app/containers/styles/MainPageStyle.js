import { StyleSheet, Platform } from 'react-native';

const buttonHeight = 54;

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'gray',
      paddingTop: 10
  },
  listViewContainer: {
    marginHorizontal: 10,
    marginBottom: Platform.OS == 'ios' ? 0 : buttonHeight
  },
  listRowContentContainer: {
    flex:1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonContainer: {
    backgroundColor: 'yellow',
    height: buttonHeight,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  textButtonStyle: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: 'black'
  },
  textRowStyle: {
    color: 'black'
  },
  cannotConnectContainer: {
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  }
});