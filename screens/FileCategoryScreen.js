import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { Card, Icon, ListItem, Avatar, Divider } from 'react-native-elements';
import { useContext, useEffect, useState } from 'react';
import { PlaylistsContext } from '../store/context/playlists-context';
import { useIsFocused } from '@react-navigation/native';

const FileCategoryScreen = ({route, navigation}) => {

  const isFocused = useIsFocused();
  const playlistContext = useContext(PlaylistsContext);
  const { file, playlistId } = route.params;
  const [ unassignedCategories, setUnassignedCategories ] = useState([]);
  const  [ assignedCategories, setAssignedCategories ] = useState([]);
  const [ selectedNew, setSelectedNew] = useState([]);
  const [ selectedOld, setSelectedOld ] = useState([]);

  useEffect(() => {
    isFocused && pullFileFromContext();
  }, [isFocused]);

  const pullFileFromContext = () => {
    const categories = playlistContext.categories;
    const unassignedCategories = categories.filter(val => !file.category.includes(val));
    const assignedCategories = categories.filter(val => file.category.includes(val));
    setAssignedCategories(assignedCategories);
    setUnassignedCategories(unassignedCategories);
  }

  const onUnassignedSelect = (category) => {
    
    if (selectedNew.length === 0) {
      setSelectedNew([
        category
      ])
    }
    // if previously selected, remove from selected list
    if (selectedNew.length > 0 && selectedNew.includes(category)) {
      setSelectedNew(selectedNew.filter(sel => sel != category))
    }
    // add to selected list if not previously selected
    else if (selectedNew.length > 0 && !selectedNew.includes(category)){
      setSelectedNew(selectedNew => {
        return [
          ...selectedNew,
          category
        ]
      })
    }
  }

  const onAssignedSelect = (category) => {
    // remove category if previously selectedNew
    if (selectedOld.length === 0) {
      setSelectedOld([
        category
      ])
    }
    if (selectedOld.length > 0 && selectedOld.includes(category)) {
      setSelectedOld(selectedOld.filter(sel => sel != category))
    }
    else if (selectedOld.length > 0 && !selectedOld.includes(category)){
      setSelectedOld(selectedOld => {
        return [
          ...selectedOld,
          category
        ]
      })
    }
  }

  const onAddCategory = () => {
    playlistContext.addFileCategory(playlistId, file.id, selectedNew);
    navigation.navigate("FileViewScreen", {...file, playlistId});
  }

  const onDeleteOldCategories = () => {
    playlistContext.deleteOldCategories({fileId: file.id, playlistId, selectedOld: [...selectedOld]});
    navigation.navigate("FileViewScreen", {...file, playlistId});
  }

  // const onManageCategories = () => {
  //   navigation.navigate("CategoryScreen");
  // }

  const renderUnassignedList = () => {
    return (
      <Card>
      {unassignedCategories.length > 0 ? <Card.Title>SELECT CATEGORIES TO ADD TO FILE</Card.Title> : null}
      <Card.Divider/>

      {unassignedCategories.length > 0 ? unassignedCategories.map((cat, i) => {
          //console.log(selectedNew);
          const backgroundColor = selectedNew.length > 0 && selectedNew.includes(cat) ? "#f9c2ff" : "white";
          const color = selectedNew.length > 0 && selectedNew.includes(cat) ? 'white' : 'black';
          return (
            <ListItem key={cat} bottomDivider onPress={()=>onUnassignedSelect(cat)} containerStyle={{
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
        }) : (<Card.Title>All existing categories have already been assigned to this file!</Card.Title>)
      }

      <Card.Divider />
         {unassignedCategories.length > 0  && selectedNew.length > 0 ?
         <Button
          onPress={onAddCategory}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title={selectedNew.length > 1 ? 'ADD selectedOld CATEGORIES' : 'ADD selectedOld CATEGORY'} />
        : null}
      <Card.Divider />
        {/* <Button
        onPress={onManageCategories}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='MANAGE CATEGORIES' /> */}
        </Card>
    )
  }

  const renderAssignedList = () => {
    return (
      <Card>
      {assignedCategories.length > 0 ? <Card.Title>CATEGORIES ASSIGNED TO THIS FILE</Card.Title> : null}
      <Card.Divider/>
      <Card.Title>Select Categories you'd like to delete</Card.Title>
      <Card.Divider/>
      {assignedCategories.length > 0 ? 
        assignedCategories.map((cat, i) => {
          //console.log(selectedOld);
          const backgroundColor = selectedOld.length > 0 && selectedOld.includes(cat) ? "#f9c2ff" : "white";
          const color = selectedOld.length > 0 && selectedOld.includes(cat) ? 'white' : 'black';
          return (
            <ListItem key={cat} bottomDivider onPress={()=>onAssignedSelect(cat)} containerStyle={{
              backgroundColor: backgroundColor, 
              color: color
              }}>
              <Avatar source={{uri: '../assets/icon.png'}} />
              <ListItem.Content>
                <ListItem.Title>{cat}</ListItem.Title>
                <ListItem.Subtitle>{cat}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
  
          )
        }) : (
            
            <Card.Title>There are no categories assigned to this file!</Card.Title>
            
        )
      }
      
          <Card.Divider />
         {/* {assignedCategories.length > 0  && selectedOld.length > 0? 
         <Button  
          onPress={onAddCategory}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title={selectedOld.length > 1 ? 'ADD selectedOld CATEGORIES' : 'ADD selectedOld CATEGORY'} />
        : null} */}
        <Card.Divider />
        <Button  
          onPress={onDeleteOldCategories}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='DELETE' 
          color='red' />
        
        </Card>
    )
  }

  return (
    <ScrollView>
      {renderUnassignedList()}
      {assignedCategories.length > 0 ? renderAssignedList() : null}
    </ScrollView>
  )
}

export default FileCategoryScreen;