import { View, Text, Image, Input, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements';
import { useState, useContext, useEffect } from 'react';
import { PlaylistsContext } from '../store/context/playlists-context';


const FileViewScreen = ({route, navigation}) => {

  const playlistsContext = useContext(PlaylistsContext);
  const { playlistId } = route.params;
  const [ categoryInput, setCategoryInput ] = useState('Tap to Add Category');
  const [ showChangeCategory, setChangeCategory ] = useState(false);
  const [ showChangeComment, setChangeComment ] = useState(false);
  const [ commentInput, setCommentInput ] = useState('Tap to Add Comment');
  const [ file, setFile ] = useState(null); // 
  
  //console.log('FileViewScreen, file, playlist: ', route.params);

  useEffect(() => {
    pullFileFromContext();
  }, [])

  const pullFileFromContext = () => {
    const playlistFiles = playlistsContext.playlists.find(playlist => playlist.id === playlistId).linkedFiles;
    const file = playlistFiles.find(file => file.id === route.params.id)
    //console.log('in pullFileFromContext, file: ', file);
    setFile({
      ...file,
      playlistName: route.params.playlistName,
      playlistId: route.params.playlistId
    });
  }

  const onCommentInput = (value) => {
    setCommentInput(value);
  }

  const onCategoryInput = (event) => {
    
  }

  const onSaveCategory = () => {
    playlistsContext.addFileCategory(playlistId, file.id, categoryInput);
    //pullFileFromContext()
    console.log('categoryInput value: ', categoryInput);
    setFile({...file, category: categoryInput})
    Alert.alert(
      `Category ${categoryInput} added to file!`,"",
      [
        { text: "OK", onPress: ()=>setChangeCategory(false) }
      ]
    );
    const playlistFiles = playlistsContext.playlists.find(playlist => playlist.id === playlistId).linkedFiles;
    //const file = playlistFiles.find(file => file.id === route.params.id);
    console.log('file after category changed: ',  playlistFiles)
    
  }

  const onSaveComment = () => {
    playlistsContext.addFileComment(playlistId, file.id, commentInput);
    console.log('commentInput value: ', commentInput);
    setFile({...file, comment: commentInput});

    Alert.alert(
      `Comment \n "${commentInput}" added to file!`,"",
      [
        { text: "OK", onPress: ()=>setChangeComment(false) }
      ]
    );
    const playlistFiles = playlistsContext.playlists.find(playlist => playlist.id === playlistId).linkedFiles;
    //const file = playlistFiles.find(file => file.id === route.params.id);
    console.log('file after category changed: ',  playlistFiles)
  }

  const renderFile = () => {
    //console.log('in render file: ', file);
    return (
      <Card>
      <Card.Title>File Name: {file.filename}</Card.Title>
      <Card.Divider/>
      <Card.Title>Playlist Name: {file.playlistName}</Card.Title>
      <Card.Divider/>
      <Card.Title>Media Type: {file.mediaType}</Card.Title>
      <Card.Divider/>
      <Card.Divider/>
      {!file.category || showChangeCategory ? (
          <>
            <FileTextInput
              numberOfLines={1}
              onChangeText={text => setCategoryInput(text)}
              onPress={()=>setCategoryInput('')}
              value={categoryInput}
              style={{padding: 10}}
            />
            <Divider />
            <TouchableOpacity style={styles.button} onPress={onSaveCategory}>
                <Text style={styles.text}>Save Category</Text>
            </TouchableOpacity>
          </>
      )
       : 
        <>
        <Card.Title>Category: {file.category}</Card.Title>
        <TouchableOpacity style={styles.button} onPress={()=>setChangeCategory(true)}>
          <Text style={styles.text}>Change Category</Text>
        </TouchableOpacity>
      </> 
       
      
    } 
    {!file.comment || showChangeComment ?
     (
        <>
           <FileTextInput
              numberOfLines={3}
              onChangeText={text => setCommentInput(text)}
              value={commentInput}
              style={{padding: 10}}
            />
            <Divider />
            <TouchableOpacity style={styles.button} onPress={onSaveComment}>
                <Text style={styles.text}>Save Comment</Text>
            </TouchableOpacity>
            </>
       
      )
      : (
        <>
          <Card.Title>Comment: {file.comment}</Card.Title>
          <TouchableOpacity style={styles.button} onPress={()=>setChangeComment(true)}>
            <Text style={styles.text}>Change Comment</Text>
          </TouchableOpacity>
        </> 
      )
    }
      <Divider /> 
      {file.image.name ? <Card.Image source={{ uri: file.image.imagePath}} />
      : (
        <TouchableOpacity style={styles.button} onPress={()=> {}}>
          <Text style={styles.text}>Add Image</Text>
        </TouchableOpacity>
      )}
      
      
      {/* <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
      </Text>
      {/* <Button
        icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='Add Image' /> */}
    
    </Card>
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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 20,
    fontSize: 20
  },
  text: {
    fontSize: 15,
    textAlign: 'center'
  },
});


export default FileViewScreen;