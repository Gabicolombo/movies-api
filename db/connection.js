const mongoose = require('mongoose');

const connectDB = async() => {
  try{

    const url = `mongodb+srv://${process.env.user}:${process.env.pwd}@movies-1.43n9fpn.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(url);
    console.info('Connected to database');

  }catch(err) {
    console.error(err);
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.info('Disconnected from database');
  } catch (error) {
    console.error('Error disconnecting from database:', error);
  }
};

module.exports = {
  connectDB,
  disconnectDB
}