import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { Card, Button, Icon, ListItem, Avatar } from 'react-native-elements';
import { useContext, useEffect, useState } from 'react';
import { PlaylistsContext } from '../store/context/playlists-context';
import { useIsFocused  } from '@react-navigation/native';


const CategoryScreen = ({route, navigation}) => {

  const isFocused = useIsFocused();
  const playlistContext = useContext(PlaylistsContext);
  const [ categories, setCategories ] = useState(playlistContext.categories)
  const [ openCategoryForm, setOpenCategoryForm ] = useState(false);
  const [ categoryInput, setCategoryInput ] = useState("Type New Category");
  
  // const [categories, setCategories ] = useState([])

  useEffect(() => {
    isFocused && setCategories(playlistContext.categories);
  }, [isFocused, openCategoryForm])

  const onAddCategory = () => {
    setOpenCategoryForm(true);
  }

  const onSaveCategory = () => {
    playlistContext.addCategory(categoryInput);
    setCategoryInput("")
    setOpenCategoryForm(false);
  }

  return (
    <ScrollView>
    <Card>
    <Card.Title>CATEGORY MANAGER</Card.Title>
    <Card.Divider/>
    {categories.length > 0 ? 
      categories.map((cat, i) => {
        return (
          <ListItem key={i} bottomDivider>
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
      <Button  
        onPress={onAddCategory}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='ADD NEW CATEGORY' /> : null
  
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