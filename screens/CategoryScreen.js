import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert, Button } from 'react-native';
import { Card, Icon, ListItem, Avatar } from 'react-native-elements';
import { useContext, useEffect, useState } from 'react';
import { PlaylistsContext } from '../store/context/playlists-context';
import { useIsFocused  } from '@react-navigation/native';


const CategoryScreen = ({route, navigation}) => {

  const [ inputHint, setInputHint ] = useState("Type New Category");
  const isFocused = useIsFocused();
  const playlistContext = useContext(PlaylistsContext);
  const [ categories, setCategories ] = useState(playlistContext.categories)
  const [ openCategoryForm, setOpenCategoryForm ] = useState(false);
  const [ categoryInput, setCategoryInput ] = useState(inputHint);
  const [selected, setSelected] = useState([]);
  
  // const [categories, setCategories ] = useState([])

  useEffect(() => {
    isFocused && setCategories(playlistContext.categories);
  }, [isFocused, openCategoryForm, selected])

  const onAddCategory = () => {
    setOpenCategoryForm(true);
  }

  const onSaveCategory = () => {
    const wasAdded = playlistContext.addCategory(categoryInput);
    if (wasAdded) {
      Alert.alert(
        "",`The category "${categoryInput}" was added!`,
        [
          { text: "OK", onPress: () => {
              setCategoryInput(inputHint)
              setOpenCategoryForm(false);
            }
          }
        ]
      );
    }
    if(!wasAdded) {
      Alert.alert(
        "",`The category "${categoryInput}" already exists!`,
        [
          { text: "OK", onPress: () => {
              setCategoryInput(inputHint)
              setOpenCategoryForm(false);
            } 
          }
        ]
      );
    }
  }

  const onDeleteCategory = () => {
    playlistContext.deleteCategories(selected);
    const msgSngl = `Category: "${selected.toString()}" has been deleted!`;
    const msgPlrl = `The folowing categories: "${selected.toString()} have been deleted!`
    Alert.alert(
      "", selected.length > 1 ? msgPlrl : msgSngl,
      [
        { text: "OK", onPress: () => {
            setSelected([]);
          }
        }
      ]
    );

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



  return (
    <ScrollView>
    <Card>
    <Card.Title>CATEGORY MANAGER</Card.Title>
    <Card.Divider/>
    {categories.length > 0 ? 
      categories.map((cat, i) => {
        const backgroundColor = selected.length > 0 && selected.includes(cat) ? "#f9c2ff" : "white";
        const color = selected.length > 0 && selected.includes(cat) ? 'white' : 'black';
        return (
          <ListItem key={i} bottomDivider onPress={()=>onCategorySelect(cat)} containerStyle={{
            backgroundColor: backgroundColor,
            color: color
            }} >
            <Avatar source={{uri: '../assets/icon.png'}} />
            <ListItem.Content onPress={()=>{}}>
              <ListItem.Title>{cat}</ListItem.Title>
              {/* <ListItem.Subtitle>{cat}</ListItem.Subtitle> */}
            </ListItem.Content>
          </ListItem>

        )
      })  
      : (
        <>
        <Text>There are no categories</Text>
        </>
      )
    }
    { openCategoryForm ?
      (  
        <>
        <CategoryTextInput
          numberOfLines={1}
          onChangeText={text => setCategoryInput(text)}
          onFocus={()=>setCategoryInput("")}
          value={categoryInput}
          style={{padding: 10}}/>
        <Button  
          onPress={onSaveCategory}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='SAVE CATEGORY' />
        </> 
      ) : null
    }
    { !openCategoryForm ?
      (
      <>
        <Card.Divider />
        <Button
          onPress={onAddCategory}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='ADD NEW CATEGORY' />
        <Card.Divider />
        <Button
          onPress={onDeleteCategory}
          title="DELETE SELECTED CATEGORIES"
          color="red"
        />
      </>) : null
  }
    
    </Card>
    </ScrollView>
  )
}

export const CategoryTextInput = (props) => {

  return (
    <TextInput
      {...props} 
      editable
      maxLength={40}
    />)
}

const styles = StyleSheet.create({
  name: {

  },
  image: {

  },
  user: {}
})

export default CategoryScreen;