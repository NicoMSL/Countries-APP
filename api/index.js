//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { default: axios } = require('axios');
const { conn, Country  } = require('./src/db.js');


const deleteW = (str) =>{
  return str.normalize("NFD").replace(/[\u0300-\u036fÅ]/g, "");
}

const cargarBase = async() => {
  const full = await Country.count();
  if(!full){
  const api = await axios.get("https://restcountries.com/v3/all")
  const data = api.data.map((a) =>{
    return{
      id: a.cca3,
      nombre: deleteW(a.name.common),
      bandera: a.flags[1],
      continente: a.continents[0],
      capital: a.capital? a.capital[0]: "no tiene capital",
      subregion: a.subregion,
      area: a.area,
      poblacion: a.population
    };
  });
  await Country.bulkCreate(data);
  }
  console.log("DATABASE READY")
  };
  
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    cargarBase()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
