// mongo.ts
import mongoose from "mongoose";



const skylandsDBSSchema = new mongoose.Schema({
  userId: String,
  SkyCoins: Number,
  cardInventory: Array,
});

let SkylandsDBS:any;
try {
  // Check if the model is already defined
  SkylandsDBS = mongoose.model("SkylandsDBS");
} catch (error) {
  // If not, define the model
  SkylandsDBS = mongoose.model("SkylandsDBS", skylandsDBSSchema);
}

export default SkylandsDBS;
