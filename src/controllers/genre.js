const Genre = require('../models/genre');

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

module.exports = registerGenre;