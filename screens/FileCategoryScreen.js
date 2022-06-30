import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card, Button, Icon, ListItem, Avatar, Divider } from 'react-native-elements';
import { useContext, useEffect, useState } from 'react';
import { PlaylistsContext } from '../store/context/playlists-context';
import { useIsFocused } from '@react-navigation/native';

const FileCategoryScreen = ({route, navigation}) => {

  const isFocused = useIsFocused();
  const playlistContext = useContext(PlaylistsContext);
  const { file, playlistId } = route.params;
  const [ unassignedCategories, setUnassignedCategories ] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    isFocused && pullFileFromContext();
  }, [isFocused]);

  const pullFileFromContext = () => {
    const categories = playlistContext.categories;
    const unassignedCategories = categories.filter(val => !file.category.includes(val));
    setUnassignedCategories(unassignedCategories);
  }

  const onCategorySelect = (category) => {
    // remove category if previously selected
    if (selected.length === 0) {
      setSelected([
        category
      ])
    }
    if (selected.length > 0 && selected.includes(category)) { 
      setSelected(selected.filter(sel => sel != category))
    }
    else if (selected.length > 0 && !selected.includes(category)){
      setSelected(selected => {
        return [
          ...selected,
          category
        ]
      })
    }
  }

  const onAddCategory = () => {
    playlistContext.addFileCategory(playlistId, file.id, selected);
    navigation.navigate("FileViewScreen", {...file, playlistId});
  }

  const onManageCategories = () => {
    navigation.navigate("CategoryScreen");
  }

  return (
    <ScrollView>
    <Card>
    {unassignedCategories.length > 0 ? <Card.Title>SELECT CATEGORIES TO ADD TO FILE</Card.Title> : null}
    <Card.Divider/>
    
    {unassignedCategories.length > 0 ? 
      unassignedCategories.map((cat, i) => {
        //console.log(selected);
        const backgroundColor = selected.length > 0 && selected.includes(cat) ? "#f9c2ff" : "white";
        const color = selected.length > 0 && selected.includes(cat) ? 'white' : 'black';
        return (
          <ListItem key={i} bottomDivider onPress={()=>onCategorySelect(cat)} containerStyle={{
            backgroundColor: backgroundColor, 
            color: color
            }} >
            <Avatar source={{uri: '../assets/icon.png'}} />
            <ListItem.Content>
              <ListItem.Title>{cat}</ListItem.Title>
              <ListItem.Subtitle>{cat}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

        )
      }) : (
          
          <Card.Title>All existing categories have already been assigned to this file!</Card.Title>
          
      )
    }
    
     
       {unassignedCategories.length > 0 ? 
       <Button  
        onPress={onAddCategory}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title={selected.length > 1 ? 'ADD CATEGORIES' : 'ADD CATEGORY'} />
      : null}
      <Card.Divider />
      <Button  
      onPress={onManageCategories}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='MANAGE CATEGORIES' />
      
      </Card>
      </ScrollView>
  )
}

export default FileCategoryScreen;