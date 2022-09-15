const express = require('express');
const cors = require('cors');
import { Request, Response, Application }  from 'express';
const bodyParser = require("body-parser");
let puppies = require('./puppies.js');

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

interface Puppie {
  id: number,
  name: string,
  breed: string,
  birthdate : string
  imgUrl: string
}

const findById = (id: number) => puppies.find((puppie:Puppie) => puppie.id === id);
const checkPuppie = (puppieById:Puppie, _req: Request ,res: Response) => {
  if (!puppieById){
    return res.status(404).json({error : `No puppie with the id: ${_req.params.id}`})
  }
  return;
}

app.get('/api/puppies', (_req: Request, res: Response) => {
 return res.status(200).json(puppies);
});

app.get('/api/puppies/:id', (_req: Request, res: Response) => {
  const puppieById: Puppie = findById(Number(_req.params.id));
  checkPuppie(puppieById ,_req, res);
  return res.status(200).json(puppieById);
});

app.post('/api/puppies', (_req : Request, res: Response) => {
  _req.body.id = +puppies.length;
  _req.body.imgUrl = "https://picsum.photos/400/400";
  if (!_req.body.name || !_req.body.breed || !_req.body.birthdate){
    return res.status(404).json({error : `Name, breed and birthdate are required`})
  }
  const newPuppie = _req.body;
  puppies.push(newPuppie)
  return res.status(200).json(puppies);
})

app.put('/api/puppies/:id', (_req: Request, res: Response) => {
  const oldPuppie = findById(Number(_req.params.id));
  checkPuppie(oldPuppie ,_req, res);
  if(!_req.body.name || !_req.body.breed || !_req.body.birthdate){
    return res.status(404).json({error : `Name, breed and birthdate are required`})
  }
  const newPuppie = {id: Number(_req.params.id), ..._req.body};
  puppies.splice(puppies.indexOf(oldPuppie), 1, newPuppie)
  return res.status(200).json(puppies);
})

app.delete('/api/puppies/:id', (_req: Request, res: Response) => {
  const oldPuppie = findById(Number(_req.params.id));
  checkPuppie(oldPuppie ,_req, res);
  puppies.splice(puppies.indexOf(oldPuppie), 1)
  return res.status(200).json(puppies);
})

export default app;
