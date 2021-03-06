const mongoose = require('mongoose')
const fs = require('fs')
const dotenv = require('dotenv')

const Movie = require('../models/movieModel')
const Star = require('../models/starModel')
const Review = require('../models/reviewModel')
const User = require('../models/userModel')


dotenv.config({path: './config.env'})

const app = require('./../app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log("DB connection successful!"))

const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, 'utf-8'))
const stars = JSON.parse(fs.readFileSync(`${__dirname}/stars.json`, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))


const importData = async() => {
  try{
    await Movie.create(movies, {validateBeforeSave: false})
    await Star.create(stars, {validateBeforeSave: false})
    await Review.create(reviews, {validateBeforeSave: false})
    await User.create(users, {validateBeforeSave: false})

    console.log('Data successfully imported')
  }catch(err){
    console.log(err)
  }
  process.exit()
}

const deleteData = async () => {
  try{
    await Movie.deleteMany()
    await Star.deleteMany()
    await Review.deleteMany()
    await User.deleteMany()
    console.log('Data successfully deleted')
  }
  catch(err){
    console.log(err)
  }
  process.exit()
}

if(process.argv[2] === '--import'){
  importData()
}
else if(process.argv[2] === '--delete'){
  deleteData()
}