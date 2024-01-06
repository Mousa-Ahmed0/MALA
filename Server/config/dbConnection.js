const mongoose = require("mongoose");
module.exports = async () => {
  try {
    // await mongoose.connect("mongodb://0.0.0.0:27017/MALM");
    await mongoose.connect("mongodb+srv://mousa:4lA0Oc18IGzJc8w0@cluster0.ixgeo.mongodb.net/MALM");
    
    console.log("connected to database"); 
  } catch (error) {
    console.log("connected failde to database", error);
  }
};
