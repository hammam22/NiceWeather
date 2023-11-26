import { SafeAreaView, View, Text, TouchableOpacity, Dimensions,
     ImageBackground,  StyleSheet, TextInput, FlatList, ActivityIndicator, } from "react-native";
import { Icon, Dialog } from '@rneui/themed';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { getTodoItems, getTable, addNew, } from "../sql/sql";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { change_city } from "../redux/actions";


export default PickCity = () => {
  
    const dispatch = useDispatch();
    const navigation = useNavigation();    
    var localData;
    const screenWidth = Dimensions.get('window').width;
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState(false);
    const [inTxt, setInTxt] = useState("");
    const [cityList, setCityList] = useState([]);
    const [errDialog, setErrDialog] = useState('');

    useEffect(()=>{
      const mission = async() =>{
        await bring();
      }
        getTable('city');
        mission();
    },[]);
      

    const completeCity = async(upCity) => {
              await AsyncStorage.setItem('city',upCity);
              await dispatch(change_city(upCity));
              setLoading(false);
              
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home'}]
              })
    }

      
      

      const getCity = (city)=>{

        const myFetch = async (city, apikey) => {
          var upCity = city.charAt(0).toUpperCase() + city.substring(1).toLowerCase();
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
              );

              if(!checkIfExist(upCity)){
                addNew(upCity);
              }
              
              completeCity(upCity);
              
            } catch(err){
              console.log('fail fetch');
              console.log(err);
              setErrDialog("Sorry, Can't find the city");
              setFail(true);
              setLoading(false);
            }
        }

        setLoading(true);
        myFetch(city,'e8c4b89351d439eada100debf916bc74');
      }

      const myRender = ({item})=>{
        return(
            <TouchableOpacity onPress={()=>{
                completeCity(item.name)
              }}>
                <Text style={{fontFamily: 'font01', fontSize: 24, color: "rgba( 23, 23, 23, 0.8)",}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
      }

      

      const bring = async () => {
      console.log('bring');
        var ll = await getTodoItems();
        console.log(ll);
        setCityList(ll);
      }

      const checkIfExist = (city) => {
        var isExist = false;
        for(let i = 0 ; i< cityList.length; i++){
          if(city===cityList[i].name){
            isExist = true;
          }
        }
        //console.log('city '+city+' return '+isExist);

        return isExist;
      }

    return(
        
        <SafeAreaView style={styles.containter}>
            <ImageBackground
                    style={{  width: '100%', height: '100%',
                    position: 'absolute', zIndex: 1,}}
                    source={require('../imgs/map.png')}>

                



                    </ImageBackground>
                    
                    <View   style={{zIndex: 2,}}>
                        <View style={{flex: 2,}}/>
                        <View style={{ flex: 2, borderRadius: 20,  
                                        padding: 30,  }}>
                                <View style={{backgroundColor: "rgba(219, 219, 219, 0.8)",
                                padding: 20,
                                                borderRadius: 20,}}>
                                    <Text style={{
                                        fontSize: 30,
                                        fontFamily: "font01",
                                        color: "rgba( 23, 23, 23, 0.8)",
                                        textAlign: 'center',
                                    }}>Pick Your City</Text>
                                </View>
                        </View>

                        <View style={{flex: 4,backgroundColor: "rgba(219, 219, 219, 0.8)",
                                      borderRadius: 15, marginBottom: 20,}}>







                                
                                        <View style={{backgroundColor: "rgba(219, 219, 219, 0.8)", padding: 10,
                                                        borderRadius: 15, flexDirection: 'row', alignItems: 'center',
                                                        width: '100%',}}>
                                            <TextInput  style={{backgroundColor: 'white', width: screenWidth*0.8,
                                                                height: 45, borderRadius: 20, padding: 10,
                                                                fontSize: 14, color: "rgba( 23, 23, 23, 0.8)",}}
                                                        placeholder="City name"
                                                        value={inTxt}
                                                        onChangeText={(txt)=>setInTxt(txt)}/>
                                            <TouchableOpacity onPress={
                                                ()=>{
                                                  if(inTxt.length===0){
                                                    setErrDialog("Please Enter city name");
                                                    setFail(true);
                                                  }else{
                                                    getCity(inTxt);
                                                  }
                                                
                                                }
                                                }>
                                                <Icon
                                                    style={{margin: 2,}}
                                                    name='search'
                                                    color='#ffffff'
                                                    size={35}/>
                                            </TouchableOpacity>
                                        </View>
                                
                                <View style={{flex: 3, borderRadius: 20,}}>
                                    <View style={{flex: 1, backgroundColor: "rgba(200, 200, 200, 0.8)", 
                                                           padding: 10, borderRadius: 20,
                                                            width: '100%',}}>
                                        <FlatList
                                        data={cityList}
                                        renderItem={myRender}
                                        keyExtractor={item => item.id.toString()}
                                        />
                                    </View>
                                </View>









                        </View>
                    </View>


                    <View>
                        <Dialog
                            isVisible={loading}
                            onBackdropPress={()=>{}}
                            >
                            <Dialog.Title title="Loading"/>
                            <ActivityIndicator
                                size={80}
                                color={"rgba(5, 5, 5, 0.8)"}/>
                        </Dialog>
                        <Dialog
                            isVisible={fail}
                            onBackdropPress={()=>{setFail(false);}}
                            >
                              <Dialog.Title title="Error"/>
                              <Text>{errDialog}</Text>
                              <Dialog.Actions>
                                <Dialog.Button
                                  title="OK"
                                  onPress={() => {
                                    setFail(false);
                                  }}
                                />
                              </Dialog.Actions>                   
                        </Dialog>
                    </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        alignItems: 'center',
    },
});