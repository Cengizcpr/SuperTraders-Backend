const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongodb Connected.')
  } catch (error) {
    throw Error(error);
  }
};

module.exports = connectDB;