const mongoose = require('mongoose');


const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photoURL:String,
  description:String,
});

// homeSchema.pre('findOneAndDelete', async function (next) {
//   console.log("came to pre hook while deleting home");
//   const homeid = this.getQuery()._id;
//   await Favourite.deleteMany({ houseid: homeid });
//   next();
// })

module.exports = mongoose.model('Home', homeSchema);