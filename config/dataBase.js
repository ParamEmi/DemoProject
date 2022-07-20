const { mongoose }  = require("mongoose");
const CONFIG =  require("../config.json")

//mongoose.connect("mongodb://localhost:27017/userApp")
mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.DB_URL, {
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
