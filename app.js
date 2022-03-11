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
    const userId="622a476908ded63af0c938a7";//mipkin _id
    User.findById(userId).then(doc=>{
        const title="everest mermer";
        const body="5 ocak açılması";
        doc.notes.push({
            title,
            body
        });
        doc.save();//Veritabanına Kaydetme
    });
    res.end();
});

app.get("/notsil",(req,res)=>{
    const userId="622a476908ded63af0c938a7";//mipkin _id
    const noteIdToDel="622a60569477122bac9d643e";//Silinecek Not Id
    User.findById(userId).then(doc=>{
        doc.notes.map(note=>{
            if(note._id==noteIdToDel) note.remove();
        });
        doc.save();
    });
    res.end();
});

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Server is running on ${PORT} Port...`);
});
