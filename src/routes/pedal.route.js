
const express = require("express");

// const { Pedal ,Pedal_Collection } = require("../models/index");

// attempts
const { Pedal } = require("../models/index");



const pedalRoutes = express();

// /RESTful  route declarations

// URL

pedalRoutes.get("/pedal", getPedals);
pedalRoutes.get("/pedal/:id", getPedal);
pedalRoutes.post("/pedal", createPedal);
pedalRoutes.put("/pedal/:id", updatePedal);
pedalRoutes.delete("/pedal/:id", deletePedal);

// async function getPedals(_, res) {
//   const allPedals = await Pedal_Collection.get();
//   res.json(allPedals);
// }

async function getPedals(_, res) {
  const allPedals = await Pedal.findAll();
  res.json(allPedals);
}

async function getPedal(req, res, next) {
  const id = req.params.id;
  const pedal = await Pedal.findOne({ where: { id: id }});
  if (pedal === null) {
    next();
  } else {
    res.json(pedal);
  } 
}

async function createPedal(req, res) {


  const pedalType = req.body.pedalType;
  const pedalName = req.body.pedalName
  const pedal = await Pedal.create({
    pedalType,
    pedalName,
  })
  // what I had before
  // const styles  = req.body.style ?? [];
  // for (const name of styles){
  //   await styles.createStyle({name});
  // }
  // const collections  = req.body.collection ?? [];
  // for (const name of collections){
  //   await collections.createPedal_Collection({ name });
  // pedal.setPedal_Collection([allCollections]);
  res.json(pedal);
}


async function deletePedal(req, res, next) {
  const id = req.params.id;
  const pedal = await Pedal.findOne({ where: { id: id } });
  if (pedal === null) {
    next();
  } else {
    await pedal.destroy({ where: { id } });
    res.json({});
  }
}

async function updatePedal(req, res) {
  const id = req.params.id;
  let pedal = await Pedal.findOne({ where: { id } });
  if (pedal === null) {
    next();
  } else {
    const pedalType = req.body.pedalType ?? pedal.pedalType;
    const pedalName = req.body.pedalName ?? pedal.pedalName;

    let updatedPedal = {
      pedalType,
      pedalName,
    }
    
    pedal = await pedal.update(updatedPedal);
    res.status(200).json(pedal);
  }
}

module.exports = {
   pedalRoutes
};
