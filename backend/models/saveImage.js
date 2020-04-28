const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var imageSchema = new Schema(
    { img: 
        { data: Buffer, contentType: String }
    }
  );

let Image = mongoose.model('Images',imageSchema);

module.exports = Image