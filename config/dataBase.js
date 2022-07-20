const { mongoose }  = require("mongoose");
const db = 'mongodb+srv://param:aQawvPWLUlgtSKoe@cluster0.gffac.mongodb.net/appDB?retryWrites=true&w=majority';
//mongoose.connect("mongodb://localhost:27017/userApp")
mongoose.Promise = global.Promise;
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.set('debug', true);
var dataBase = mongoose.connection;

dataBase.on("connected", function () {
  console.log("succesfull connected");
});
dataBase.on("error", function (err) {
  console.log("not connected" + err);
});
