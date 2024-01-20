const mongoose = require('mongoose');

module.exports = async() => {
  try{

    const url = `mongodb+srv://${process.env.user}:${process.env.pwd}@movies-1.43n9fpn.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(url);
    console.info('Connected to database');

  }catch(err) {
    console.error(err);
  }
}