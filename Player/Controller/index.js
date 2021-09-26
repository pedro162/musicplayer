import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";

export default function Controller({ onNext, onPrv, tocando, playSound, parar, setTocando }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv}>
        <MaterialIcons name="skip-previous" size={45} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>setTocando(!tocando)}
      >
        {  tocando == true ?  <MaterialIcons name="pause" size={45} tocando={tocando} /> : <MaterialIcons name="play" size={45} tocando={tocando} />}
                
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext}>
        <MaterialIcons name="skip-next" size={45} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});