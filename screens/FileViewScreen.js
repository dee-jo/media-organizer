import { View, Text } from 'react-native';

const FileViewScreen = ({route, navigation}) => {

  const { playlistId } = route.params;

  return(
    <View>
      <Text>Hello from File View Screen</Text>
    </View>
  )
}

export default FileViewScreen;