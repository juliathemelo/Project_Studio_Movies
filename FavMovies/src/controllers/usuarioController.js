const Usuaria = require('../models/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const create = async (req, res) => {

    const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
    req.body.senha = senhaComHash

    const usuaria = new Usuaria(req.body)

    try {
        const novaUsuaria = await usuaria.save()
        res.status(201).json(novaUsuaria)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}

const login = (req, res) => {
    Usuaria.findOne({ email: req.body.email }, (err, usuariaEncontrada) => {
      if (!usuariaEncontrada) {
        return res.status(404).send({ message: 'Usuária não encontrada', email: `${req.body.email}`})
      }
  
      const senhaValida = bcrypt.compareSync(req.body.senha, usuariaEncontrada.senha)
  
      if (!senhaValida) {
        return res.status(401).send({message: "Login não autorizado"})
      }
  
      const token = jwt.sign({email: req.body.email}, process.env.SECRET)
      res.status(200).send({ messagem: "Login realizado com sucesso", token: token})
  })
}

module.exports = { 
    create,
    login
}