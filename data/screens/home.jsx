import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useEffect, useState, useCallback,  } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { change_city } from "../redux/actions";

export default function Home() {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const date = new Date();
  const [isDay,setIsDay] = useState(false);
  var isFirstlunch = true;
  myCity = useSelector((state) => state.myReducer.CITY); 
  
  var apikey = "e8c4b89351d439eada100debf916bc74";
  const [mytemp, setMytemp] = useState('%');
  const [myhum, setMyhum] = useState('%');
  const [myWind, setMyWind] = useState("%");
  const [myMain, setMyMain] = useState("%");
  const [mydescription, setMydescription] = useState("%");
  const [myclou, setMyclou] = useState('%');




  // ------------------------------------- //

  useEffect(() => {
    const hour = date.getHours();
    console.log('hour = '+hour);
    
    if(17>hour){
      if(hour>5){
      setIsDay(true);
      console.log('17>hour>6 is true');
      }
    }
    MyMyFetch();
  }, []);

  const myFetch = async (apikey) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apikey}`);
      var temp = Number(response.data.main.temp) - 273.15;
      setMytemp((Number(temp).toFixed(2)).toString());
      setMyhum((Number(response.data.main.humidity).toFixed(2)).toString());
      setMyMain((response.data.weather[0].main).toString());
      setMydescription((response.data.weather[0].description).toString());
      console.log('city disctription = '+mydescription);
      setMyclou((response.data.clouds.all).toString());
      setMyWind(response.data.wind.speed+' km/h');
      await AsyncStorage.setItem('description',(response.data.weather[0].description).toString());
      await AsyncStorage.setItem('temp',(Number(temp).toFixed(2)).toString());
      await AsyncStorage.setItem('hum',(Number(response.data.main.humidity).toFixed(2)).toString());
      await AsyncStorage.setItem('clou',response.data.clouds.all+ '');
      await AsyncStorage.setItem('wind',response.data.wind.speed+' km/h');
      
    } catch (error) {
      // handle the error
      console.error(error+'fetching error , loading from local data');
      localFetch();
    }
    
  };

  const MyMyFetch = async()=>{
    if(isFirstlunch){
      console.log('this is first lunch')
      var oldCity = '';
      oldCity = await AsyncStorage.getItem('city');
      
      if(oldCity===null){
        oldCity = 'Doha';
        console.log('no city in asyncStrg, getting default')
      }
      console.log(oldCity)
      
      await dispatch(change_city(oldCity));
      isFirstlunch = false;
    }
    await myFetch(apikey);
  }

  const localFetch = async()=>{
    console.log('local fetch starrrrrrrrted')
    const description = await AsyncStorage.getItem('description');
  if (description !== null) {
    setMydescription(description); // Convert string to object
  }
  const temp = await AsyncStorage.getItem('temp');
  if (temp !== null) {
    setMytemp(temp); // Convert string to object
  }
  const hum = await AsyncStorage.getItem('hum');
  if (hum !== null) {
    setMyhum(hum); // Convert string to object
  }
  const clou = await AsyncStorage.getItem('clou');
  if (clou !== null) {
    setMyclou(clou); // Convert string to object
  }
  const wind = await AsyncStorage.getItem('wind');
  if (wind !== null) {
    setMyWind(wind); // Convert string to object
  }
  }

  const makeUpdate = () => {
    

    console.log('make update lunched');
    
    console.log('isday = '+isDay)
    switch (mydescription){
          
      case 'clear sky':
        if(isDay){
          return(require("../imgs/clear_day.png"));
        }else{
          return(require("../imgs/clear_night.png"));
        }
        break;

        case 'few clouds':

          if(isDay){
            return(require("../imgs/few_clouds_day.png"));
          }else{
            return(require("../imgs/few_clouds_night.png"));
          }
        break;

        case 'scattered clouds':
        case 'overcast clouds':
          if(isDay){
            return(require("../imgs/scattered_clouds_day.png"));
          }else{
            return(require("../imgs/scattered_clouds_night.png"));
          }
         break;

        case 'broken clouds':
          if(isDay){
            return(require("../imgs/broken_clouds_day.jpg"));
          }else{
            return(require("../imgs/broken_clouds_night.png"));
          }
         break;
      

       case 'shower rain':
        case 'rain':
       case 'light rain':
        case 'light intensity drizzle':
        if(isDay){
          return(require("../imgs/shower_rain-day.png"));
        }else{
          return(require("../imgs/shower_rain_night.png"));
        }
       break;

       case 'thunderstorm':
        return(require("../imgs/thunderstorm_night.png"))
       break;
      
       case 'snow':
       case 'light snow':
         return(require("../imgs/snow_night.png"))
        break;

        case 'mist':
        case 'fog':
        case 'haze':
          if(isDay){
            return(require("../imgs/mist_day.png"));
          }else{
            return(require("../imgs/mist_night.png"));
          }
         break;
        

         default:
          return(require("../imgs/clear_night.png"))
          break;
    }
  }



  return (
    <SafeAreaView style={styles.containter} >
      <ImageBackground
        style={{  width: '100%', height: '100%',
         resizeMode: 'cover',
         position: 'absolute', zIndex: 0}}
        source={makeUpdate()}
      />
      <View style={{flex: 1, padding: 60,}}>
        <TouchableOpacity
          onPress={() => {
            MyMyFetch();
          }}
        >
          <View style={{ flex: 2, marginTop: -30 }}>
            <TouchableOpacity 
            onPress={()=>{
              navigation.push('PickCity');
              }}>
            <Text style={styles.txtCity}>{myCity}</Text>
            </TouchableOpacity>
            
            
            <View style={styles.Temptab}>

              <View style={{flex: 1,}}/>
              <View style={{flex: 100,}}>
                <Text style={styles.text}>{mydescription}</Text>
                <Text></Text>
                <Text style={{fontFamily: 'font01',
                              fontSize: 20,
                              textAlign: "center",
                              color: "rgba( 23, 23, 23, 0.8)",}}>
                  Temp
                </Text>
                <Text></Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 56, fontFamily: 'numFont',
                    color: "rgba( 23, 23, 23, 0.8)", marginLeft: 40,}}>
                    {mytemp}
                  </Text>
                  <Text style={{fontSize: 28,}}>
                  °C
                  </Text>
                </View>
              </View>
              <View style={{flex: 1,}}/>


            </View>
          </View>

          <View style={{ flex: 4 }} />

          <View style={{ flex: 1,  flexDirection: "row",
           justifyContent: 'flex-start',marginLeft: -8, width: '80%' }}>
            <View style={styles.tab}>
              <Text style={styles.title}>
                Humidity
              </Text>
              <Text style={styles.text}>
              {myhum}%{" "}
              </Text>
            </View>
            
            <View style={styles.tab}>
              <Text style={styles.title}>
                Clouds
                </Text>
                <Text style={styles.text}>{myclou}%{" "}
              </Text>
            </View>

            <View style={styles.tab}>
              <Text style={styles.title}>
                Wind Speed
                </Text>
                <Text style={styles.text}>{myWind}</Text>
            </View>

          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    width: '100%', height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'font01',
    fontSize: 14,
    textAlign: "center",
    color: "rgba( 23, 23, 23, 0.8)",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    color: "rgba( 23, 23, 23, 0.8)",
  },
  txtCity: {
    fontSize: 33,
    fontFamily: "FREEDOM",
    color: "white",
  },
  Temptab: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    marginRight: 50,
    marginTop: 10,
    backgroundColor: "rgba(219, 219, 219, 0.3)",
    borderRadius: 15,
    padding: 1,
    margin: 5,
    alignItems: 'center',
  },
  tab: {
    height: '90%',
    width: '40%',
    backgroundColor: "rgba(219, 219, 219, 0.6)",
    borderRadius: 15,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
