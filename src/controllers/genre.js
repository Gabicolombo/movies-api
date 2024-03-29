const Genre = require('../models/genre');

const getGenre = async(req, res, next) => {
  try{

    const genres = await Genre.aggregate([
      {
        $project: {
          id: 1,
          name: 1,
          _id: 0
        }
      }
    ]).allowDiskUse(true);
  
    if(genres.length == 0) return res.status(404).json({message: 'Genre not found!'});

    return res.status(200).json(genres);

  }catch(err){
    console.error(err);
    next(err);
  }
}

const registerGenre = async(req, res, next) => {
  try{
    const len = await Genre.find({});

    await Genre.create({
      id: len.length +1,
      name: req.body.name
    }).then().catch(error => {
      return res.status(400).json({message: 'Duplicate Genre'});
    });

    return res.status(200).json({message: 'Created successfully'});
  }catch(err) {
    console.error(err);
  }
}

module.exports = {
  registerGenre,
  getGenre
};