import { StyleSheet, View, Button } from 'react-native';
import PlaylistList from '../components/playlist-list/PlaylistList';


const PlaylistScreen = ({navigation}) => {

  const onPressCreatePlaylist = () => {
    navigation.navigate("NewPlaylistScreen");
  }

  const onPlaylistSelect = (playlistId) => {
    navigation.navigate("PlaylistViewScreen", {
      playlistId
    });
  }

  return (
      <View style={styles.container}>
      <PlaylistList onPlaylistSelect={onPlaylistSelect} />
      <Button
        onPress={()=>onPressCreatePlaylist()}
        title="Create New Playlist"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
// const styles = StyleSheet.create({
//   container: {
//     padding: 50,
    
//     flexDirection: 'row',
//     alignItems: 'stretch',
//     justifyContent: 'space-between',
//     width: '90%',
//     height: 300,
//     flex: 1,
//     backgroundColor: '#fff',

//   },

//   box_1: {
//     backgroundColor: 'blue',
//     margin: 10,
//     flex: 1,
//     borderColor: 'black',
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: 'white'
//   },

//   box_2: {
//     backgroundColor: 'red',
//     flex: 1,
//     margin: 10,
//     borderColor: 'black',
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   box_3: {
//     backgroundColor: 'green',
//     margin: 10,
//     flex: 1,
//     borderColor: 'black',
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });

export default PlaylistScreen;
