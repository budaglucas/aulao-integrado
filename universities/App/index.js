const express = require('express')
const app = express()

const db = require('./server')

const mongoose = require('mongoose')

const axios = require('axios')

const routes = express.Router()

const university_model = require('./Models/University')

const Universities = require('./Universities')


mongoose.connect(db.uri)
  .then(() => {
    console.log('Conectado ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))


app.post('/person', async (req, res) => {
  try {
    for (const country of Universities) {
      const universities_api = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`
      );

      for (const university of universities_api) {
        console.log('university', university)
        process.exit()
        const uni_name = university.name
        const university = {
          country,
          uni_name,
        };
  
        await university_model.create(university);
  
        console.log('Universidade salva no banco');
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar as universidades do país ${country}` })
  }
})

module.exports = routes;