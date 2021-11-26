//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const brandSchema = new Schema({
  
    age : Number, // Decimal128 // String
    name: String,
    type: String,
    isEcoResp: Boolean
  })
//defining the name of the constructor for our class
const Brand = mongoose.model('Brand', brandSchema);
//export the class, also called a model or a document, to use in different files
module.exports = Brand
