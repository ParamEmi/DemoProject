const Country = require("../models/CountryModel");
const bcrypt =  require("bcrypt");
var jwt = require('jsonwebtoken');
const CONFIG =  require("../config.json")


const add =  async (req,res)=>{
    try {
        
        const payload =  req.body;
        let check = Country.find(
            { stateList: { $elemMatch: { state_name:payload.state_name } } }
         );

        let data  =  await Country.create(payload);
        if(data)
        {
            return res.status(200).send({
                status:200,
                message:"Country added succesfully",
                data:data
            })
        }

    } catch (err) {
        return res.status(500).send({
        status: 500,
        error: err.message,
        success: false,
        }); 
    }
}

const get =  async (req,res)=>{

    try {

        // let data = await Country.findOne({stateList: {$elemMatch: {state_name:"aabc",cityList:{$elemMatch:{city_name:"def"}}}}},{ "stateList.$": 1,"country_name":1,});
       // let data  = await Country.find({},{"stateList":1});

       // delete object from array 
       
       let data =  await Country.find();
        return res.status(200).send({
            status:200,
            message:"Country get succesfully",
            data:data,
            success:true
        })
        
    } catch (err) {
        return res.status(500).send({
        status: 500,
        error: err.message,
        success: false,
        }); 
    }
}


module.exports = {
    add,
    get
};
