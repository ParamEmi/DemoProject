const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema(
  {
    country_name : {type:String , unique : true,required: [true, "Country name is required"] },
    abbreviation : {type:String},
    stateList:[
        {
            state_name:{type:String ,unique : true,required: [true, "State name is required"] },
            abbreviation:{type:String},
            cityList:[
                {
                    city_name:{type:String ,unique : true, required: [true, "City name  is required"] },
                    abbreviation:{type:String}
                },
            ]
            
        }
    ]
  },
  { collection: "country" , timestamps: { createdAt: true, updatedAt: true }  }
);

var Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
