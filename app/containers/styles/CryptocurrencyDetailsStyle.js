import { StyleSheet } from 'react-native';

const buttonHeight = 54;

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'gray',
      paddingTop: 10
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: buttonHeight + 10
  },
  textRowTitle: {
    alignItems: 'center',
    marginBottom: 5
  },
  textRowDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
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
  textTitleStyle: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: 'black'
  },
  textDetailsStyle: {
    fontSize: 16,
    color: 'black'
  },
  textRowStyle: {
    color: 'black'
  },
  cannotConnectContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  }
});