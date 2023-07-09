import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,Alert,ImageBackground } from 'react-native';
import React,{useState,useEffect} from 'react'
import { Configuration, OpenAIApi } from "openai";
import Clipboard from '@react-native-clipboard/clipboard';

export default function App() {
  const [key,setKey]=useState("");
  const [roles,setroles]=useState("");
  const[output,setOutput]=useState("");
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState("Loading......");
  const[text_roles,set_text_role]=useState("");
  const backGround={uri:"https://cdn.pixabay.com/photo/2022/11/15/12/23/winter-7593872_960_720.jpg"}
 
const configuration = new Configuration({
    organization: "org-k8JSQF52Z9AQo1SWe4RLeC83",
    apiKey: key,
});
const openai = new OpenAIApi(configuration);
// const response = openai.listEngines();
// console.log(response);
const Chat=async()=>{
  setOutput(loading)

  try{
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content":roles}, {"role": "user", "content":input}],
    temperature:.9,
    max_tokens:512
  });
  
  console.log(completion.data.choices[0].message.content);
  setOutput(completion.data.choices[0].message.content);
  }
  catch(err)
  {

    setOutput(err.message);
    err.message ==="Request failed with status code 401"?setOutput("Entweder hast du dein API Key vergessen, kein Zugriff auf OpenAI API"):null;

  }

}

const infos=()=>{
// auf apps bitte nutze Alert.alert
// alert("wie soll ich antworten: schreib z.B antworte detailiert oder kurz und Knapp\n"+

// "oder z.B antworte im stil von John Wick, im stil von Meister Yoda.... kann ruhig auf alles sprachen sein er versteht alles")
set_text_role("wie soll ich antworten: schreib z.B antworte detailiert oder kurz und Knapp\n"+

 "oder z.B antworte im stil von John Wick, im stil von Meister Yoda.... kann ruhig auf alles sprachen sein er versteht alles")

};
const copytoClipboard=()=>{
Clipboard.setString(output)

};

const fetchCopiedText=async()=>{

  const text=Clipboard.getString();
  
};
  return (
    <View style={styles.container}>
    <ImageBackground source={backGround}>
      <Text style={styles.welcome}>Willkommen zum persölichen ChatGPT</Text>
      <View style={styles.output} >
      <Text style={styles.output} >{output}</Text>
      
      </View>

      <StatusBar style="auto" />
      <View style={styles.texInput} >
      <TextInput style={styles.schrift} onChangeText={(text)=>{setKey(text);}} value={key} placeholder='API Key' secureTextEntry="password"/>
      <Text style={styles.infoTexte}>{text_roles}</Text>
      <TextInput style={styles.schrift} 
      onTouchStart={infos}
       onChangeText={(text)=>{setroles(text);console.log(text)}} 
       value={roles} placeholder='Wie soll ich antworten'/>
       
      <TextInput style={styles.schrift} onChangeText={(text)=>{setInput(text);console.log(text)}} value={input} placeholder='prompt'/>
      </View>
      <Button onPress={copytoClipboard} title='kopieren'/>
      <Button onPress={Chat} title='Los...'/>
      
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(147deg, rgba(24,24,14,0.9429972672662815) 0%, rgba(241,169,18,0.6628852224483543) 100%) ',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  schrift:{

    color: 'white',
    fontSize:20,
    height:60,
    width:200,
    alignContent:"center",
    alignItems:"center"

  },
  output:{
    borderBottomColor:'yellow',
    borderLeftColor:"green",
    borderRightColor:"red",
    borderTopColor:"blue",
    fontSize:16,
    color: 'white',


  },
  texInput:{

    alignItems: 'center',
    alignContent:"center",
    // margin:40

  },
  welcome:{

    // flex:0.003,
    fontFamily:"Helvetica",
    fontSize:25,
    color: 'white',
    alignItems:"center",
    alignContent:"center",

  },
  infoTexte:{

    fontSize:10,
    color:"yellow",
    fontFamily:"Helvetica",

  }
  
});






