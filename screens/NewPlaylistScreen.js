import { StyleSheet, View, Button } from 'react-native';
import NewPlaylistForm from '../components/new-playlist/NewPlaylistForm';

const NewPlaylistsScreen = ({navigation}) => {

const onPlaylistCreated = () => {
  navigation.navigate("PlaylistListScreen");
}

  return (
    <View style={styles.container}>
      <NewPlaylistForm onPlaylistCreated={onPlaylistCreated}></NewPlaylistForm>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default NewPlaylistsScreen;