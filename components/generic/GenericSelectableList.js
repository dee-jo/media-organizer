import { StyleSheet, Text, SafeAreaView, SectionList, FlatList, View, TouchableOpacity, StatusBar } from 'react-native';
import { useState } from 'react';
import GenericButtonGroup from '../generic/GenericButtonGroup';


const GenericSelectableList = ({onItemSelect, fileList, playlistId}) => {

  const [selectedId, setSelectedId] = useState(null);

  const onItemPress = (file) => {
    //console.log('file in onItemPress: ', file);
    setSelectedId(file.id);
    onItemSelect(file);
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        name={item.filename}
        item={item}
        onPress={() => onItemPress(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  }

  const Item = ({ item, onPress, backgroundColor, textColor, name }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{name}</Text>
        {/* <GenericButtonGroup /> */}
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container_1}>
      <FlatList
        data={fileList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
);
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
    fontSize: 16,
  },
});

export default GenericSelectableList;