const Country = require("../models/CountryModel");
const bcrypt =  require("bcrypt");
var jwt = require('jsonwebtoken');
const CONFIG =  require("../config.json")


const add =  async (req,res)=>{
    try {
        
        const payload =  req.body;
        console.log(payload);
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

        let data = await Country.find();
        return res.status(200).send({
            status:200,
            message:"Country get succesfully",
            data:data,
            success:true
        })
        
    } catch (error) {
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
