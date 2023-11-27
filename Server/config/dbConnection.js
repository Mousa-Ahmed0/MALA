const mongoose = require("mongoose");
module.exports = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/MALM");
    
    console.log("connected to database");
  } catch (error) {
    console.log("connected failde to database", error);
  }
};
