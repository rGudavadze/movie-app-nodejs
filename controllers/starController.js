const Star = require('./../models/starModel')


exports.getAllStars = async(req, res) => {
  try{
    const stars = await Star.find()

    res.status(200).json({
      status: "success",
      results: stars.length,
      data: {
        cast: stars
      }
    })

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

exports.getStar = async(req, res) => {
  try{
    const star = await Star.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: {
        star
      }
    })

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

exports.createStar = async(req, res) => {
  try{
    const newStar = await Star.create(req.body)

    res.status(201).json({
      message: 'success',
      data: {
        star: newStar
      }
    })

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

exports.updateStar = async(req, res) => {
  try{
    const newStar = await Star.findByIdAndUpdate(req.params.id, rea.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      message: 'success',
      data: {
        star: newStar
      }
    })

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err.message
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
      message: err.message
    })
  }
}