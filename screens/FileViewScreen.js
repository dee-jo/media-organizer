import { View, Text, Image, Input, TextInput, StyleSheet, TouchableOpacity, Alert, Platform, Button, ScrollView } from 'react-native';
import { Card, ListItem, Icon, Divider } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import { PlaylistsContext } from '../store/context/playlists-context';
import { pickImage } from '../components/file-search/_fileSearch';

const FileViewScreen = ({route, navigation}) => {

  const { playlistId } = route.params;
  const isFocused = useIsFocused();
  const playlistsContext = useContext(PlaylistsContext);
  const [ categoryInput, setCategoryInput ] = useState('Tap to Add Category');
  const [ showChangeCategory, setChangeCategory ] = useState(false);
  const [ showChangeComment, setChangeComment ] = useState(false);
  const [ commentInput, setCommentInput ] = useState('Tap to Add Comment');
  const [ file, setFile ] = useState(null); // 
  const [imageURI, setImageURI] = useState();
  //console.log('FileViewScreen, file, playlist: ', route.params);

  useEffect(() => {
    
    isFocused && pullFileFromContext();
    }
  ,[isFocused]);

  const pullFileFromContext = () => {
    const playlistFiles = playlistsContext.playlists.find(playlist => playlist.id === playlistId).linkedFiles;
    const file = playlistFiles.find(file => file.id === route.params.id)
    console.log('in pullFileFromContext, file: ', file);
    setFile({
      ...file,
      playlistName: route.params.playlistName,
      playlistId: route.params.playlistId
    });
    if (file.image.imagePath != "") {
      setImageURI(file.image.imagePath);
    }
  }


  const onSaveCategory = () => {
    navigation.navigate("FileCategoryScreen", { file, playlistId });
    
  }

  const onSaveComment = () => {
    if (commentInput != "") {
      playlistsContext.addFileComment(playlistId, file.id, commentInput);
      //console.log('commentInput value: ', commentInput);
      setFile({...file, comment: commentInput});
  
      Alert.alert(
        `Comment \n "${commentInput}" added to file!`,"",
        [
          { text: "OK", onPress: ()=>setChangeComment(false) }
        ]
      );
      const playlistFiles = playlistsContext.playlists.find(playlist => playlist.id === playlistId).linkedFiles;
      //const file = playlistFiles.find(file => file.id === route.params.id);
     // console.log('file after comment changed: ',  playlistFiles)

    } else {
      Alert.alert(
        `Comment cannot be empty!`,"",
        [
          { text: "OK", onPress: () => {
            setCommentInput("Type comment")
            setChangeComment(false);
          } }
        ]
      );
    }

  }

  const onAddImage = async () => {
    try {
      const result = await pickImage();
      if (!result.cancelled) {
        setImageURI(result.uri);
      }
      playlistsContext.addFileImage(playlistId, file.id, result.uri);
    }
    catch (e) {
      console.log('Error while adding image: ', e);
    }
    
  }

  const onDeleteFile = () => {
    playlistsContext.deleteFile(playlistId, file.id);
    navigation.navigate("PlaylistViewScreen", {playlistId});
  }

  const onDeleteComment = () => {
    playlistsContext.deleteComment(playlistId, file.id);
    setFile({
      ...file,
      comment: ""
    });
    setCommentInput("Type Comment...");
    setChangeComment(false);
  }

  const renderFile = () => {
    console.log('in render file: ', file);
    return (
      <ScrollView>
      <Card>
      <Card.Title>File Name: {file.filename}</Card.Title>
      <Card.Divider/>
      <Card.Title>Playlist Name: {file.playlistName}</Card.Title>
      <Card.Divider/>
      <Card.Title>Media Type: {file.mediaType}</Card.Title>
      <Card.Divider/>
      {file.category.length > 0 ? 
        <>
          <Card.Title>Assigned Categories:</Card.Title>
          <Card.Divider/>
          {file.category.map((category) => {
            return (<Text key={category}>{category}</Text>)
          })}
          <Card.Divider/>
        </> : <Text>No categories assigned to this file</Text>
      }
      <TouchableOpacity style={styles.button} onPress={onSaveCategory}>
          <Text style={styles.text}>Manage File Categories</Text>
        </TouchableOpacity>
    
    {!file.comment || showChangeComment ?
     (
        <>
           <FileTextInput
              numberOfLines={3}
              onChangeText={text => setCommentInput(text)}
              onFocus={()=>setCommentInput("")}
              value={commentInput}
              style={{padding: 10, backgroundColor: '#f0f0ed'}}
            />
            <Divider />
            <TouchableOpacity style={styles.button} onPress={onSaveComment}>
                <Text style={styles.text}>Add Comment</Text>
            </TouchableOpacity>
            </>
       
      )
      : (
        <>
          <Card.Title>Comment: {file.comment}</Card.Title>
          <View style={{flex: 1}}>
          <TouchableOpacity style={[styles.button, styles.buttonComment]} onPress={()=>setChangeComment(true)}>
            <Text style={styles.text}>Change Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonComment, styles.buttonDelete]} onPress={onDeleteComment}>
            <Text style={{color: 'white'}}>Delete Comment</Text>
          </TouchableOpacity>
          {/* <Button
            onPress={onDeleteFile}
            title="Delete Comment"
            color="red"
            styles={{width: '50%'}}
          /> */}

          </View>
          
        </> 
      )
    } 
      {imageURI 
        ? <Card.Image source={{ uri: imageURI}}style={{ width: 200, height: 200, marginBottom: 20 }} />
        : null} 
        
        <TouchableOpacity style={styles.button} onPress={onAddImage}>
          <Text style={styles.text}>{imageURI ? 'Change Image' : 'Add Image'}</Text>
        </TouchableOpacity>
        
        <Button
            onPress={onDeleteFile}
            title="Delete File"
            color="red"
          />
    </Card>
    </ScrollView>
    )
  }

  return(
    <View>
    {file ? renderFile() : (<Text>File not loaded</Text>)}
    </View>
   )
  }

  export const FileTextInput = (props) => {

    return (
      <TextInput
        {...props} 
        editable
        maxLength={40}
      />)
  }

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
  },
  buttonComment: {
    width: '45%'
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
});


export default FileViewScreen;