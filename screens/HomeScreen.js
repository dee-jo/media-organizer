import { View, Text, AppState, Alert } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { Card, Button, Icon } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { PlaylistsContext } from '../store/context/playlists-context';
import { useIsFocused } from '@react-navigation/core';

const HomeScreen = ({route, navigation}) => {

  const [ playlists, setPlaylists ] = useState([]);
  const [ stateWasSaved, setStateWasSaved ] = useState(false);
  const [ categories, setCategories ] = useState([]);
  const playlistsContext = useContext(PlaylistsContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setPlaylists(playlistsContext.playlists);
      setCategories(playlistsContext.categories);
    }
  }
  ,[isFocused]);

  const onViewPlaylists = () => {
    navigation.navigate("PlaylistListScreen");
  }

  const onManageCategories = () => {
    navigation.navigate("CategoryScreen");
  }

  const saveState = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status === "granted") {
    try {
      let fileUri = FileSystem.documentDirectory + "app-state.txt";
      const appState = { playlists, categories };
      const appStateJSON = JSON.stringify(appState);
      await FileSystem.writeAsStringAsync(fileUri, appStateJSON, { encoding: FileSystem.EncodingType.UTF8 });
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      const result = await MediaLibrary.createAlbumAsync("Document", asset, false);
        Alert.alert(
          "App State Was Successfuly Saved To File app-state.txt","",
          [
            { text: "OK", onPress: ()=>setStateWasSaved(true) }
          ]
        );
      
      
    } catch (e) {
      console.log('Error while saving app state: ', e);
    }
   
  }

  const loadState = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status === "granted") {
    if (stateWasSaved) {
      let fileUri = FileSystem.documentDirectory + "app-state.txt";
      const result = await FileSystem.readAsStringAsync(fileUri);
      const appState = JSON.parse(result);
      playlistsContext.loadPlaylistState(appState.playlists);
      playlistsContext.loadCategoryState(appState.categories);
    }
    
    //await FileSystem.writeAsStringAsync(fileUri, appStateJSON, { encoding: FileSystem.EncodingType.UTF8 });
    //const asset = await MediaLibrary.createAssetAsync(fileUri)
    //await MediaLibrary.createAlbumAsync("Document", asset, false)
  }


  return(
    <Card>
      <Card.Title>MEDIA MANAGER</Card.Title>
      <Card.Divider/>
      <Card.Image source={require('../assets/headphones-image.jpeg')} />
      <Card.Divider />
      <Text style={{marginBottom: 10}}>
          This app will help you manage files in your favourite playlists.
      </Text>
      <Card.Divider/>
      <Button
        onPress={onViewPlaylists}
        // icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='VIEW PLAYLISTS' />
      <Card.Divider/>
      <Button
        onPress={onManageCategories}
        // icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='MANAGE CATEGORIES' />
      <Card.Divider/>
      <Button
        onPress={saveState}
        // icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='SAVE TO FILE' />
        <Card.Divider />
      {stateWasSaved ? <Button
        onPress={loadState}
        // icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='LOAD STATE FROM FILE' /> : null}
    </Card>
  )
}

export default HomeScreen;




