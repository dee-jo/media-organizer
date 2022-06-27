import { ButtonGroup } from "react-native-elements";
import { useState } from "react";

// constructor () {
//   super()
//   this.state = {
//     selectedIndex: 2
//   }
//   this.updateIndex = this.updateIndex.bind(this)
// }

const GenericButtonGroup = () => {

  const [ selectedIndex , setSelectedIndex ] = useState(1);
  const buttons = ['Edit File', 'Delete File'];

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  }
  
  return (
    <ButtonGroup
      onPress={updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 30, width: 200, position: 'relative'}}
    />
  )

}

export default GenericButtonGroup;

