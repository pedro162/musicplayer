import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const ModalOpcoes = ({data, modalVisible, setModalVisible}) => {
  //const [modalVisible, setModalVisible] = useState(false);
  if(! (data && Array.isArray(data) && data.length > 0)){
  	return null;
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
        	
          <View style={[styles.modalView, {paddingTop:0, paddignRight:0}]}>
          	<View
          		 style={[styles.modalText,{flexDirection:'column', textAlign:'center',marginBottom:35, width:'100%', padding:5, marginRight:-200}]}
          	>
        		<TouchableOpacity
            			
		              style={[{}]}
		              onPress={() => {setModalVisible(!modalVisible)}}>

		              	<FontaWesome5 name='times-circle' color="red" size={30} style={[{textAlign:'right'}]} />

		            </TouchableOpacity>
        	</View>
            <Text style={styles.modalText}>Menu de opções</Text>
            {data && Array.isArray(data) && data.length > 0 && data.map((item, index, arr)=>{

            	let label=item.hasOwnProperty('label') ? item.label : 'Hide Modal';
            	let propsLabel=item.hasOwnProperty('propsLabel') ? item.propsLabel : {};
            	let actionLabel=item.hasOwnProperty('actionLabel') ? item.actionLabel : ()=>null;

            	let propsActionLabel=item.hasOwnProperty('propsActionLabel') ? item.propsActionLabel : {};

            	return(
            		<TouchableOpacity
            			key={'menu-'+index+arr.length+label}
		              style={[styles.button, styles.buttonClose]}
		              onPress={() => {setModalVisible(!modalVisible);actionLabel()}} {...propsActionLabel}  >

		              	<Text style={styles.textStyle} {...propsLabel} >{label}</Text>

		            </TouchableOpacity>

            	)

            })}
            
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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

export default ModalOpcoes;