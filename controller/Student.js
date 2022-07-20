const Student = require("../models/Student");
const { nodemailer } = require("../helper");
const StudentMarks = require("../models/StudentMarks");

const addStudent = async (req, res) => {
  try {
    const  stdDetails =  {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      age:req.body.age,
      address:req.body.address,
      phone:req.body.phone,
      email_id:req.body.email_id,
      Dob:req.body.Dob,
      School:req.body.School
    }

    const data = {
      email: req.body.email_id,
      name: req.body.firstName,
      subject: req.body.address,
    };

    // nodemailer({ data });
    
    const result = await Student.create(stdDetails);

      // const result = await Student.aggregate(
      //     [
      //       { $set: { School: { $concatArrays: [ "$School", [ 7 ] ] } } }
      //   ]
      //  )

    const  stdMarks =  {
      percentage:req.body.percentage,
      studentid:result._id
    
    }

    //const result_1 = await StudentMarks.create(stdMarks);

    return res.status(200).send({
      status: 200,
      message: "Student created successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

const addStudentMarks = async (req, res) => {
  try {
    const result = await StudentMarks.create(req.body);

    return res.status(200).send({
      status: 200,
      message: "Student Marks added successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};


const getStudentMarks = async (req, res) => {
  try {
    const getData = await StudentMarks.find().populate("studentid");;
    return res.status(200).send({
      status: 200,
      message: "Get Students Marks",
      data: getData,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    // const condition = {firstName:"dipesh"}
   // const condition = {firstName:{$in:["dipesh","paramjeet"]}}
   // const condition = {firstName:"dipesh",age:{$gte:"21"}}
   //const condition = {$or:[ {firstName:"paramjeet"},{ age:{$gte:21} } ] }

  // const condition = {
  // firstName:"dipesh", $or:[ {age:{$gte:22}},{lastName:/^c/} ]
  //  }

  //  const condition = { Dob: { month: "april", date: 14, year: 1994 } }

  //const condition = {"Dob.month": "april" }

  // const condition = {"Dob.date": {$lte:14}}

  // const condition = {firstName:"Kuku" , "Dob.date":{$lte:14} ,  "Dob.month":"april"}
  
  // const condition = {firstName:"Kuku" , "Dob.date":{$lte:14} ,  "Dob.month":"april"}

  //const condition = {School: [ "SBS", "SPS","GD" ] }

  // const condition = {School: {$all:[ "GD","SBS", "SPS" ] }}

 //const condition = {School: "SPS"} // it is array in database 
 // const condition = {School: { $gt: 40 } } // check atleast one element in array whose value is greater than 40

// const condition = { School: { $gt: 15, $lt: 20 } }  // it is array in database

 //  const condition = { School: { $elemMatch: { $gt: 15, $lt: 20 } } } 

 // const condition = { "School.1": {  $gt: 35  } }
 
 //const condition = { "School.1": {  $gt: 35  } }

 //const condition = { "School.1": {  $gt: 35  } }
 

  // const condition = { "School": { school: "sps", totalstudent: 1200 } }  

  // const condition = { "School": { totalstudent: 1200 ,school: "sps", } }  

  ///const condition = { "School.totalstudent": {$gt:700} }  
  //const condition = { "School.0.totalstudent": {$gte:500} } 
  ///const condition = { "School.totalstudent": {$gt:700} }  
  //const condition = { "School":{ $elemMatch: {totalstudent:500 , school:"sps" } } } 
  //const condition = { "School":{ $elemMatch: { totalstudent:{$gt:500 , $lt:1200} } } } 
  //const condition = { "School.totalstudent": { $gt: 700,  $lte: 1200 } } 
  //const condition = { "School.totalstudent":1200 , "School.school":"sbs"  } 

  //Projection field start here 
 // const reqfield = { lastName:1 } 
  // const reqfield = { _id: 0 } 
  // const reqfield = { _id: 0 } 
  // const reqfield = { lastName: 1 , "Dob.month":1 } 
  // const reqfield = { "School.totalstudent":1,"School.school":1  } // Array of object field 

  // const reqfield = { firstName: 1 , lastName: 1 , School:{$slice: -1 }  } Array of objects

  const reqfield = { firstName: 1 , lastName: 1 , School:{$slice: -1 }  }
  const condition = {firstName:"Kuku"}
  

  // const getData = await Student.find(condition).limit(10).sort( { lastName: -1 });

  // const getData = await Student.find(condition).limit(10).sort( { lastName: -1 });

    // getData.forEach( function(myDoc) {
    //  console.log("dfgf"+myDoc.firstName)
    // } );
    
    //const getData = await Student.find();

    // const getData = await Student.aggregate(
    //   [ { $sample: { size: 3 } } ]
    //  )

    // const getData = await Student.aggregate(
    //       [
    //         { $set: { "specs.fuel_type": "unleaded" } }
    //     ]
    //    )

    const getData = await Student.find();
    return res.status(200).send({
      status: 200,
      message: "Get Students",
      data: getData,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};



const getSingleStudent =  async (req, res) =>
{
  try {
    const getata = await Student.findOne({_id:req.params.id});
    return res.status(200).send({
      status: 200,
      message: "Get Single Students",
      data: getata,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }

};

const updateStudent =  async (req, res) => {
  try {
    const data =  await Student.updateOne( { _id: req.params.id },
      req.body)
    return res.status(200).send({
      status:200,
      message: "update student successfully",
      data: data,
    })
    
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message:"Something went wronng , please try again laler",
      error: err.message,
    })
  }
}


const deleteStudent =  async (req, res) => {
  try {
    const data =  await Student.deleteOne(  { _id: req.params.id },
      req.body)
    return res.status(200).send({
      status:200,
      message: "delete student successfully",
      data: data,
    })
    
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message:"Something went wronng , please try again laler",
      error: err.message,
    })
  }
}


const aggregationMethod = async (req, res) => {
  try {
    const result = await Student.aggregate([{ $match: { lastName: "chauhan",age:21} }]);

    return res.status(200).send({
      status: 200,
      message: "Aggregation Method Successs",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Something went wrong, please try again later!",
      error: err.message,
    });
  }
};

const aggergatelook = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $lookup: {
          from: "StudentMarks",
          localField: "_id",
          foreignField: "studentid",
          as: "aggregate",
        },
      },
    ]);
    
    return res.status(200).send({
      status: 200,
      message: "Aggregation Lookup Successs",
      data: result,
    });
  } catch (error) {
    console.log(error, "lllllll");
  }
};


module.exports = {
  addStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  addStudentMarks,
  getStudentMarks,
  aggregationMethod,
  aggergatelook
};
