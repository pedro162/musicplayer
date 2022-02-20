import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, StatusBar } from 'react-native';
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const ModalView = ({modalVisible, setModalVisible, modalTitle, moreStylesObjModal, children}) => {
  //const [modalVisible, setModalVisible] = useState(false);
 
  return (
    <View style={[styles.centeredView]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
        	
          <View style={[styles.modalView, {paddingTop:0, paddignRight:0, ...moreStylesObjModal}]}>
          	<View
          		 style={[styles.modalText,{flexDirection:'column', textAlign:'center',marginBottom:5, width:'100%', padding:5, marginRight:-60}]}
          	>
          		<TouchableOpacity
              			
  		              style={[{}]}
  		              onPress={() => {setModalVisible(!modalVisible)}}>

  		              	<FontaWesome5 name='times-circle' color="red" size={30} style={[{textAlign:'right'}]} />

  		            </TouchableOpacity>
          	</View>
            <Text style={styles.modalText}> {modalTitle ? modalTitle : 'Titulo'}</Text>
            {

            	children
            }
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:(StatusBar.currentHeight + 10),//20,
  },
  modalView: {
    margin: 20,
    width: "90%",
    height: "90%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    elevation: 2,
    marginBottom:6,
    minWidth:180
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight:'bold',
  },
});

export default ModalView;