import { openDatabase } from 'react-native-sqlite-storage';

var tableName = 'city';



  const db = openDatabase('city');

 export const getTable = (tableName) => {
    
    console.log('getTable')
    db.transaction( tx => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName}('id'	INTEGER,'name' TEXT,PRIMARY KEY('id')
        );`,null,()=>{console.log('table created success')},(err)=>{console.log('table created faaaailed')})
      });

  }


  export const getTodoItems= async () => {

    return new Promise((resolve, reject) => {
   
       db.transaction((tx) => {
   
         tx.executeSql('SELECT id, name FROM city', [], (tx, results) => {
   
           let rows = [];
   
           for (let i = 0; i < results.rows.length; i++) {
   
             rows.push({ id: results.rows.item(i).id, name: results.rows.item(i).name });
   
           }
   
           resolve(rows);
   
         });
   
       });
   
    });
   
   };

 export const addNew = (txt) => {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO city (name) VALUES (?);',[txt],()=>{console.log('record added success')},(txt,err)=>{console.log(err)})
    })
  }

  export const full = () => {
    const db = SQLite.openDatabase('city');

    db.transaction( tx => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS city('id'	INTEGER,'name' TEXT,PRIMARY KEY('id')
      );`,null,()=>{console.log('table created')},(err)=>{console.log('table error')})
    });

    db.transaction(tx => {
      tx.executeSql('INSERT INTO city (name) VALUES (?);',['this is city name'],
      ()=>{console.log('insert to db success')},(txt,err)=>{console.log(err)})
  })

    var theEnd = [];
    db.transaction( tx => {
        tx.executeSql(`SELECT * FROM city`,null,
        (txObject,resultSet)=>{
          console.log('record size = '+resultSet.rows._array.length);
              for( let i=0; i<resultSet.rows.length; i++){
                var name = resultSet.rows.item(i).name;
                theEnd.push({id: i.toString, name: resultSet.rows.item(i).name})
                //theEnd.push(resultSet.rows.item(i).name);
                console.log(resultSet.rows.item(i))
              }
          
            
            return theEnd;
        },
        (txt,err)=>{console.log(err)})
      });
  }
  