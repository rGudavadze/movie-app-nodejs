class ApiFeatures {
  constructor(query, queryString){
    this.query = query
    this.queryString = queryString
  }

  filter(){
    let queryStr = {...this.queryString}
    const excludeFields = ['limit', 'fields', 'page', 'sort']
    excludeFields.forEach(el => delete queryStr[el])

    queryStr = JSON.stringify(queryStr)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    
    return this
  }

  sort(){
    if(this.queryString.sort){
      this.query = this.query.sort(this.queryString.sort)

    }else{
      this.query = this.query.sort('-release_date')
    }

    return this
  }

  limitFields(){
    if(this.queryString.fields){
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    }else{
      this.query = this.query.select('-__v')
    }

    return this
  }

  paginate(){
    const page = this.queryString.page * 1 | 1
    const limit = this.queryString.limit * 1 | 20
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }

}

module.exports = ApiFeatures