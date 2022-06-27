import { SafeAreaView, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { PlaylistsContext } from '../store/context/playlists-context';
import { findMediaFiles, getAllDirsOnDevice } from '../components/file-search/_fileSearch';

const DirectoryListScreen = ({route, navigation}) => {

  const { playlistId } = route.params; 
  console.log('playlistId in DirectoryListScreen: ', playlistId);

  //const playlistsContext = useContext(PlaylistsContext);
  const [ localDirs, setLocalDirs ] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [ searchInput, setSearchInput ] = useState("");
  const [ filteredDirs, setFilteredDirs ] = useState(null);

  const onSearchInputChange = (value) => {
    setSearchInput(value);
    const updated = localDirs.filter(dir => {
      const title = dir.title.toLowerCase();
      const input = searchInput.toLowerCase();
      return input === '' || title.includes(input)
    })
    setFilteredDirs(updated);
  }
  
  const onDirectorySelected = (dir) => {
    //console.log(dir)
    setSelectedId(dir);
    navigation.navigate("DirectoryViewScreen", {...dir, playlistId: playlistId })
  }

  useEffect(() => {
      getAllDirsOnDevice()
      .then((dirs) => {
        console.log(dirs);
        setLocalDirs(dirs);
        setFilteredDirs(dirs)
      })
      .catch(e => console.log('error while fetching local dirs: ', e));
  },[]);

  
  
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        title={item.title}
        item={item}
        onPress={() => onDirectorySelected(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  }

  const Item = ({ item, onPress, backgroundColor, textColor, title }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{title}</Text>
      </TouchableOpacity>
    );
  }


  const renderDirs = () => {
    
    return (
      <FlatList
      data={filteredDirs}
      renderItem={renderItem}
      keyExtractor={item => item.id}
  />
    )
  }

  return(
    <SafeAreaView>
      <Text>Type Directory Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => onSearchInputChange(value)}
        defaultValue={searchInput}
      />
      
      {filteredDirs && renderDirs()}
      {/* <PermissionsAndroidComponent /> */}
      <Button title="Find Files" type='outline' onPress={getAllDirsOnDevice}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container_1: {
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default DirectoryListScreen;