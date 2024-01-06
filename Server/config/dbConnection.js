const mongoose = require("mongoose");
module.exports = async () => {
  try {
    // await mongoose.connect("mongodb://0.0.0.0:27017/MALM");
    await mongoose.connect(process.env.DB_URL);
    
    console.log("connected to database"); 
  } catch (error) {
    console.log("connected failde to database", error);
  }
};
