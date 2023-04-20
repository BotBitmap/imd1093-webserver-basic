const express = require("express");

const app = express();
app.use(express.json());

let dispositivos = {}

app.get("/", (req, res) => {
  res.send(`Testando atualização! :)`);
});

app.get("/devices", (req, res) => {
  const values = Object.values(dispositivos)
  res.json(values)
});

app.get("/device", (req, res) => {
  const id = req.query.id
  if (id != undefined){
    const deviceId = dispositivos[id]
    if (deviceId != undefined) {
      res.json(deviceId)
    }else{
      res.status(404).json({ "msg": "Não existe dispositivo cadastrado no id indicado"})
    }
  }else{
    res.status(400).json({ "msg": "É necessário indicar um id que deseja buscar"})
  }
});

app.delete('/device', (req, res) => {
  const id = req.query.id
  if (id == undefined) {
    res.status(400).json({ "msg": "É necessário indicar um id que deseja buscar"})
    return
  }

  if (dispositivos[id] == undefined) {
    res.status(404).json({ "msg": "Não existe dispositivo cadastrado no id indicado"})
    return
  }

  delete dispositivos[id]
  res.json({"msg": "Dispositivo removido com sucesso!"})
})

function isValid(device){
  const existsId = device.id != undefined
  const existsName = device.name != undefined
  const existsUnidade = device.unidade != undefined
  return existsId && existsName && existsUnidade
}

app.post("/devices", (req, res) => {
  const device = req.body
  if (!isValid(device)) {
    res.status(400).json({msg: "Dispositivo inválido!!"})
    return;
  }

  if (dispositivos[device.id] == undefined) {
    dispositivos[device.id] = device
    res.json({"msg": "Sucesso ao adicionar o dispositivo de id " + device.id})
  }else{
    res.status(400).json({"msg": "Já existe um dispositivo cadastrado no id " + device.id})
  }
});

app.put('/devices', (req, res) => {
  const device = req.body
  if (dispositivos[device.id] == undefined) {
    res.status(404).json({"msg": "Não existe um dispositivo cadastrado no id " + device.id})
  }else{
    dispositivos[device.id] = device
    res.json({"msg": "Sucesso ao atualizar o dispositivo de id " + device.id})
  }
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
