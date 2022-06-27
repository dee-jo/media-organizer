import { View, Text, StyleSheet } from 'react-native';
import Filelist from '../components/playlist-view/file-list/Filelist';
import { Button } from 'react-native-elements';

const PlaylistViewScreen = ({route, navigation}) => {

  const { playlist } = route.params;
  console.log('in PlaylistViewScreen, playlist: ', playlist);
  const onAddFilePress = () => {
    navigation.navigate("PickFileScreen", {playlistId: playlist.id});
  }

  const onFindFilesPress = () => {
    navigation.navigate("DirectoryListScreen", {playlistId: playlist.id});
  }

  const onFileSelect = (fileId) => {
    navigation.navigate("FileViewScreen", fileId);
  }

  return(
    <View style={styles.container}>
      <Text>Hello from {playlist.playlistName}</Text>
      {/* <Button title="Pick File" type='outline' onPress={onAddFilePress}/> */}
      <Button title={`Add Files To Playlist ${playlist.playlistName}`} type='outline' onPress={onFindFilesPress}/>
      <Filelist playlistId={playlist.id} onFileSelect={onFileSelect} />
      <Text>You can either find media files on your device, or pick a single file</Text>
      
      
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