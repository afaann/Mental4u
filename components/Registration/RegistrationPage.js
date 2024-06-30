import { View, Text, StyleSheet,TextInput,TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'; 
import { Colors } from '@/constants/Colors';

export default function RegistrationPage({ navigation }) {
    
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [isFormValid, setIsFormValid] = useState(false); 

    useEffect(() => { 
      validateForm(); 
  }, [name, email, password]); 

  const validateForm = () => { 
      let errors = {}; 

      // Validate name field 
      if (!name) { 
          errors.name = 'Name is required.'; 
      } 

      // Validate email field 
      if (!email) { 
          errors.email = 'Email is required.'; 
      } else if (!/\S+@\S+\.\S+/.test(email)) { 
          errors.email = 'Email is invalid.'; 
      } 

      // Validate password field 
      if (!password) { 
          errors.password = 'Password is required.'; 
      } else if (password.length < 6) { 
          errors.password = 'Password must be at least 6 characters.'; 
      } 

      // Set the errors and update form validity 
      setErrors(errors); 
      setIsFormValid(Object.keys(errors).length === 0); 
  }; 

  const handleSubmit = () => { 
      if (isFormValid) { 

          // Form is valid, perform the submission logic 
          console.log('Form submitted successfully!'); 
      } else { 
            
          // Form is invalid, display error messages 
          console.log('Form has errors. Please correct them.'); 
      } 
  }; 


    function onPressRegistrationBtn() {
      navigation.navigate('tabHome')
       }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Registration</Text> */}
 
      <TextInput 
                style={styles.input} 
                placeholder="Name"
                value={name} 
                onChangeText={setName} 
            /> 
            <TextInput 
                style={styles.input} 
                placeholder="Email"
                value={email} 
                onChangeText={setEmail} 
            /> 
            <TextInput 
                style={styles.input} 
                placeholder="Password"
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            /> 


      <TouchableHighlight
      style={[styles.inputbtn, { opacity: isFormValid ? 1 : 0.5 }]} 
      disabled={!isFormValid} 
       onPress={onPressRegistrationBtn} 
       underlayColor="white" >
      <Text style={styles.buttonText}>Registration</Text>
      </TouchableHighlight>

      {/* Display error messages */} 
      {Object.values(errors).map((error, index) => ( 
                <Text key={index} style={styles.error}> 
                    {error} 
                </Text> 
            ))} 
    </View>
  )
}

export const styles = StyleSheet.create({
    container:{
      backgroundColor: '#FF6666',
      flex: 1,
      height: '100%',
      width: '100%',
      alignItems: 'center',
     justifyContent: 'center'
     
    },
    
      title:{
        fontWeight: "bold",
        fontSize: 30,
        color: Colors.BLACK,
        marginBottom: 40,
       
        },
       
          input: {
            height: '10%',
            width: '90%',
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: Colors.WHITE,
            borderRadius:10
          },
  
          inputbtn: {
            height: '10%',
            width: '90%',
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: 'lightgrey',
            borderRadius:10
          },
  
  
          button: {
            // marginBottom: 30,
            borderWidth: 1,
            height: '30%',
           
            // backgroundColor: '#2196F3',
          },
          buttonText: {
            textAlign: 'center',
            padding: 10,
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
             
      // alignItems: 'center',
      // justifyContent: 'center'
          },
          text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: Colors.BLACK,
          },
  })