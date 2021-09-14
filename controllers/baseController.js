const ApiFeatures = require('./../utils/ApiFeatures')

exports.getAll = Model => 
  async(req, res) => {
    try{
      const features = new ApiFeatures(Model.find(), req.query)
                        .filter()
                        .sort()
                        .limitFields()
                        .paginate()
      
      const docs = await features.query

      res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
          docs
        }
      })
    }catch(err){
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  }


exports.getOne = Model => 
  async(req, res) => {
    try{
      const doc = await Model.findById(req.params.id)

      res.status(200).json({
        status: 'success',
        data: {
          doc
        }
      })
    }catch(err){
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  }


exports.addOne = Model => 
  async(req, res) => {
    try{
      const newDoc = await Model.create(req.body)
  
      res.status(200).json({
        status: 'success',
        data: {
          doc: newDoc
        }
      })
    }catch(err){
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  }


exports.updateOne = Model => 
  async(req, res) => {
    try{
      const newDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })

      res.status(200).json({
        status: 'success',
        data: {
          doc: newDoc
        }
      })
    }catch(err){
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  }


exports.deleteOne = Model => 
  async(req, res) => {
    try{
      await Model.findByIdAndDelete(req.params.id)
      
      res.status(204).json({
        status: 'success',
        data: null
      })
    }catch(err){
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  }
