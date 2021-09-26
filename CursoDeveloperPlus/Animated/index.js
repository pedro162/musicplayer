import React, {useRef} from 'react';
import {View, Text, Button, Animated} from 'react-native';
import estilos from './estilos.js'

const AnimatedComponent = ({naivigation})=>{

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 5000
        }).start();
      };
    
      const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 5000
        }).start();
      };

    return(
        <View>
            <Animated.View
                style={
                   [ estilos.fadingContainer,
                    {opacity: fadeAnim}
                ]
                }
            >
                <Text style={estilos.fadingText} >Fadin in View</Text>
            </Animated.View>

            <View style={estilos.buttonRow} >
                <Button title="dade in" onPress={fadeIn} />

                <Button title="fade out" onPress={fadeOut} />
            </View>
        </View>
    )
}

export default AnimatedComponent;