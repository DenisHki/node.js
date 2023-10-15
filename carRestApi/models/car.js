let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CarSchema = new Schema(
  {
    brand: { type: String, required: true, maxlength: 150 },
    model: { type: String, required: true, maxlength: 150 },
    color: { type: String, required: true, maxlength: 150 },
    year: { type: Number, required: true },
  },
  {
    versionKey: false, // Disable versioning
  }
);

//Export model
module.exports = mongoose.model("Car", CarSchema);
