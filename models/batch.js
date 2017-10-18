const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = new Schema({
  // name: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  // style: [{ type: Schema.Types.ObjectId, ref: 'Recipe'}],
  name: [{ type: String, required: true, unique:true }],
  style: [{ type: String, required: true }],
  availVol: { type: Number, required: false },
  totalVol: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  isReady: { type: Boolean, required: true, default: false }
});

const Batch = mongoose.model("Batch", batchSchema, "Batch");

module.exports = Batch;
