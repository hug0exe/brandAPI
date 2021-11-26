// THIS IS A NEAR COMPLETED TEMPLATE FOR YOUR CA1
// Everything is commented and explained step by step
// If there are any questions, please let me know
// EDIT/UPDATE and DELETE is not finished yet
// Make sure to also check the "brand.js" file


//declarations 
//express for server and routes
const express = require('express')
//bodyParser for x-www-urlencoded (html form like) variables
const bodyParser = require('body-parser')
// defining the actual app to handle the requests (e.g. push, get, etc.)
const app = express()
const port = 3000
// require the driver to connect to the database
const mongoose = require('mongoose')
// require the class constructor from different file
const Brand = require('./brand.js')
//defining one object using our new constructor
//only as a testing purpose, this code should be deleted after testing is completed
//let brand = new Brand({age:25, name: "Hermes", type: "Bags/Clothes", isEcoResp: false})


//make the app use the bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}))

//API ROUTES
//show all brands from the database using GET request
app.get('/brand', (req, res) => {
  //find all brands in the database and store them in the "result" variable
  //use the Model created in the brand.js file to retrieve all brand entries from the database
  Brand.find((err, brands) => {
    //in case there is an error with our Brand model, we we will send it to the user(postman)
    if (err) {
      res.send("Error occured no brand retrieved")
      return
    }
    //if no error send the array conting brands to the user/postman
    res.send(brands)
    //log the result in the console as well
    console.log(brands)
  })
})
// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/brand/:id', (req, res) => {
  const id = req.params.id;
  // we use the findById query, details on https://mongoosejs.com/docs/queries.html
  // this query only returns one element
  // you can also use findOneById
  // you can also use findOne({_id:req.paramas.id}) - this query will find depending on other properties,
  //                                    e.g. type, name
  //                                    will only return first element found
  // to return more then 1 element use find({}) // see previous request
  Brand.findById(id, (err, brand) => {
    if (err) {
      res.send("Brand not found")
      return
    }
    //"brand" is an object file retrieved from the database
    //"brand" will only be defined if there is a brand with the specific id
    // inside the Database
    // for a wrong ID, "brand" will be undefined

    //we will send it back to the user/postman
    res.send(brand)
    console.log(brand)
  })
})

//insert request using POST to add a brand into the database
app.post('/brand', (req, res) => {
  console.log("Inserting a brand in the database")
  //inser the brand into the database
  // brand.save() // insert the brand into the database

  let isEcoResp = false;
  if (req.body.isEcoResp === 'true') {
    isEcoResp = true;
  }
  let brand = new Brand({
    age: parseInt(req.body.age), //Number
    name: req.body.name, //String
    type: req.body.type || "No type inserted", //String
    isEcoResp: isEcoResp //Boolean
  });
  //inserting a brand and checking to see if any errors occured
  brand.save(err => {
    if (err) {
      // if error send a message to let the user know
      res.send(`Brand not inserted into the database, error is: ${err}`)
      //return to be used in order to not send to res.send and crash the program
      return
    }
    //send a message to the user with the result
    res.send("Brand inserted into the database")
    console.log("Brand is in the database")
  })

  //if return runs, code will start from here
  return
})
// -->
// PUT request to update or modify one brand from the database
app.put('/brand/:id', (req, res) => {
  // you can use fineOneAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  // or
  // you can use findByIdAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  // You can use req.params.id to send the _id and req.body for your new variables
  // or you can send all variables, including id, in req.body
  console.log("Trying to edit brand")
  console.log(parseInt(req.body.age))


  Brand.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: ((parseInt(req.body.age) == NaN) ? 0 : parseInt(req.body.age)),
    type: req.body.type,
    isEcoResp: (req.body.isEcoResp === 'true')
  }, err => {
    if (err) {
      res.send("It didn't edit. The error is: " + err)
      return;
    }
    res.send("It did edit")
  })
})


//delete request using DELETE and a PARAMETER (id)
app.delete('/brand/:id', (req, res) => {

  // You can use findOneAndDelete({_id:})
  // or
  // You can use findByIdAndDelete(id)
  //see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
  Brand.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("Brand did not delete")
      return
    }
    res.send("Brand deleted")
    console.log(`Brand with id ${req.params.id} is now deleted`)
    // console.log("Brand with id "+req.params.id + "is now deleted")
  })
})

//start the server
app.listen(port, () => {
  //change the link to your database
  mongoose.connect('mongodb+srv://admin:admin@brandapi.yvwcf.mongodb.net/brandAPI?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})

