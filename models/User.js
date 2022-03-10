import mongoose from "mongoose";
const {Schema} = mongoose;

const noteSchema = new Schema({
    title:String,
    body:String
});

const userSchema = new Schema({ //İç İçe Şema (Nested Schema) Kullanımı
    username:String,
    password:String,
    notes:[noteSchema]
});

export default mongoose.model("User",userSchema);