import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, Button, Alert } from "react-native";
import { useContext } from 'react';
import { PlaylistsContext } from '../../store/context/playlists-context';
import uuid from 'react-native-uuid';


const NewPlaylistForm = ({onPlaylistCreated}) => {
  const [playlistName, onChangePlaylistName] = React.useState("Playlist Name");
  const [playlistDescription, onChangePlaylistDescription] = React.useState("Playlist Description");

  const playlistsContext = useContext(PlaylistsContext);

  const savePlaylist = () => {
    const alertMessage = "New Playlist " + playlistName + " created!";

    if (playlistName) {
      playlistsContext.addPlaylist({
        id: uuid.v4(),
        playlistName,
        dateCreated: new Date(),
        description: playlistDescription,
        linkedFiles: []
      })
      Alert.alert(
        alertMessage,"",
        [
          { text: "OK", onPress: onPlaylistCreated }
        ]
      );
    }
    else {
      Alert.alert('Please enter playlist name and description!');
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangePlaylistName}
        value={playlistName}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePlaylistDescription}
        value={playlistDescription}
      />
      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}
      <Button
        style={styles.button}
        title="Create Playlist"
        onPress={()=>savePlaylist()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    flexDirection: 'column'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: '90%'
  }
});

export default NewPlaylistForm;