const express = require('express')

const app = express()

const db = require('./server')

const mongoose = require('mongoose')

const axios = require('axios')

const university_model = require('./Models/University')

const Universities = require('./Universities')

const UniParser = require('./UniParser')


mongoose.connect(db.uri)
  .then(() => {
    console.log('Conectado ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

const App = {}

App.getUniversity = async () => {
  for (const country of Universities.Universities) {
    try {
      console.log(`Buscando universidades do país ${country}`)
      const universities_api = await axios.get(
        `http://universities.hipolabs.com/search?country=${country}`
      );

      for (const university of universities_api.data) {
        const parsed_university = await UniParser.parser(university)
        await university_model.create(parsed_university)

        console.log("Universidade salva no banco")
      }
    } catch (error) {
      console.log(error);
      continue;
    }
  }
}

App.getUniversity()
