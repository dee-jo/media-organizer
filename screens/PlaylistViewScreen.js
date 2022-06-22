import { View, Text, StyleSheet } from 'react-native';
import Filelist from '../components/playlist-view/file-list/Filelist';
import { Button } from 'react-native-elements';

const PlaylistViewScreen = ({route, navigation}) => {

  const { playlistId } = route.params;

  const onAddFilePress = () => {
    navigation.navigate("AddFileScreen", playlistId);
  }

  const onFileSelect = (fileId) => {
    navigation.navigate("FileViewScreen", fileId);
  }

  return(
    <View style={styles.container}>
      <Text>Hello from Playlist View</Text>
      <Filelist playlistId={playlistId} onFileSelect={onFileSelect} />
      <Button title="Add File" type='outline' onPress={onAddFilePress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10
  }
});

export default PlaylistViewScreen;