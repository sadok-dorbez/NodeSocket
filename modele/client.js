//const { default: mongoose } = require('mongoose');
const mongo=require('mongoose');
const schema=mongo.Schema;

const Client=new schema ({

    nom: String,
    prenom: String,
    email: String,
    cin: Number,
    isValid: Boolean,
    tel: Number


})

//user: Collection Name
module.exports= mongo.model("client", Client);