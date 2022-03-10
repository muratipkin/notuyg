import express from "express"; //modern kullanım. bunun için esm package lazım.
import mongoose from "mongoose";//import ve export için çalıştırma: "node -r esm app.js"
import bodyParser from "body-parser";
import User from "./models/User";
require("dotenv").config();

const app=express();
const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.DB_URI,err=>{
    if(err) throw err;
    console.log("Mongoose connected...");
})

app.get("/",(req,res)=>{
    res.send("Server is running");
});

app.get("/kullaniciekle",(req,res)=>{
    const tmpData= new User({
        username:"mipkin",
        password:"1234",
        notes:{title:"everest mermer", body:"1 fabrika yapımı"}
    });
    tmpData.save(err=>{
        if(err) throw err;
        console.log("Saved successfuly...");
    });
    res.end();
});

app.get("/notekle",(req,res)=>{
    const userId="622a476908ded63af0c938a7";
    User.findById(userId).then(doc=>{
        const title="everest mermer";
        const body="5 ocak açılması";
        doc.notes.push({
            title,
            body
        });
        doc.save();
    });
    res.end();
});

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Server is running on ${PORT} Port...`);
});
