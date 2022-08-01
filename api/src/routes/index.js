//const { default: axios } = require('axios');
const { Router } = require('express');
const {Country, Activity} = require("../db")
const { Op } = require("sequelize")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
let idDb = 1

router.get("/countries",async (req, res)=>{
  const name = req.query.name
  //console.log(await Country.findAll({limit:10}))
  if(!name)return res.json(await Country.findAll())
  if(name){
    try{
      let pais = await Country.findAll({
        where:{
          nombre:{
            [Op.iLike]: "%" + name + "%"
          }
        }
      });
      return res.json(pais)
    } 
    catch(error){
      console.log(error)
    }
  }
});

router.get("/countries/:id", async (req, res)=>{
  const id = req.params.id
  try{
    let coun = await Country.findOne({
      where:{
        id:{
          [Op.eq]:id.toUpperCase()
        } 
      }
    });
    if(coun)return res.json(coun)
    res.status(404).send(`ID: "${id}" no corresponde a un pais existente`)
  }
  catch(error){
    console.log(error)
  }
});

router.get("/activity", async(req,res)=>{
const activity = await Activity.findAll()
return res.json(activity)
})


router.post("/activity", async(req,res)=>{
  const {nombre, dificultad, Duracion, temporada, countryId }= req.body
  if(!nombre || !dificultad || !Duracion || !temporada || countryId.length === 0){res.send(404).json({msg: "Faltan datos"})}
  try{
    const [activity, created] = await Activity.findOrCreate({
      where:{
        nombre,
        Duracion,
        dificultad,
        temporada
      },
    });
    console.log(created)
    await activity.setCountries(countryId)
    return res.json(activity)
  }catch (error) {
    console.log("Error en alguno de los datos provistos");
    return res.status(404).send("Error en alguno de los datos provistos");
}})

module.exports = router;
