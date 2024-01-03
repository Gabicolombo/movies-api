const mongoose = require('mongoose');

module.exports = async() => {
  try{

    const url = 'mongodb+srv://movies-api:mpxbGD18g6sWzXST@movies-1.43n9fpn.mongodb.net/?retryWrites=true&w=majority';
    await mongoose.connect(url);
    console.info('Connected to database');

  }catch(err) {
    console.error(err);
  }
}