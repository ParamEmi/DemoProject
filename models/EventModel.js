const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    class: String,
    project: String,
    number: Number,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "events" }
);

var Event = mongoose.model("Event", EventSchema);

module.exports = Event;
