const Movie = require('./../models/movieModel')


exports.getAllMovies = async(req, res) => {
  try{
    const movies = await Movie.find()
  
    res.status(200).json({
      status: "success",
      results: movies.length,
      data: {
        movies
      }
    })

  }catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.createMovie = async(req, res) => {
  try{
    const movie = await Movie.create(req.body)
    
    res.status(201).json({
      message: 'success',
      data: {
        movie
      }
    })

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.updateMovie = async(req, res) => {
  try{
    const newMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    
    res.status(200).json({
      message: 'success',
      data: {
        movie: newMovie
      }
    })

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteMovie = async(req, res) => {
  try{
    await Movie.findByIdAndDelete(req.params.id)

    res.status(204).json({
      message: 'success',
      data: null
    })
  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}