import { View, Text } from 'react-native';


const AddFileScreen = ({route, navigation}) => {

  const { playlistId } = route.params;

  return(
    <View>
      <Text>Hello from Add File Screen</Text>
    </View>
  )
}

export default AddFileScreen;