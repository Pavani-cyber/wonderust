
const mongoose=require("mongoose");
const Listing=require("../models/listing.js");

const initData=require("./data.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderust";
main().then(()=>{
    console.log("connection successful!!");
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:"6926a5477e0cf8d34c43df92"}));
    await Listing.insertMany(initData.data);
    console.log("data initialized");
}

initDB();