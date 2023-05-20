const { urlencoded } = require('body-parser');
const express=require('express');
var router=express.Router();
const user=require('../modele/client')

router.get('/show',(req,res,next)=>{
    res.send('You are welcome');
    
});
////////////////////////////////// Post By parameters
router.post('/add/:nom/:prenom/:email/:cin/:isValid',(req,res,next)=>{
    console.log("notre data :"+JSON.stringify(req.params));
    new user({
        nom:req.params.name,
        prenom:req.params.prenom,
        email:req.params.email,
        cin:req.params.cin,
        isValid:req.params.isValid
    }).save((err,data)=>{
        if(err){
            console.log(err);
        }
        console.log(data);
        res.json(data);

    });
});

router.put("/:id",async function(req,res){
    try{
        await user.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send("updated successfully");

    }catch(err){
        res.send(err)
    }
})


router.delete("/delete/:id",async function(req,res){
    try{
        await user.findByIdAndRemove(req.params.id);
        res.send("deleted successfully");

    }catch(err){
        res.send(err)
    }
})





/*router.post("/add", async function(req,res,next){
    console.log("resultat:"+req.body);
    try{

        const User=new user(...req.body);
        await User.save();
    } catch(err){
        console.log(err);
    }
   

});*/

///////////////////////////////////////// Post By Json BodyRequest

router.post("/",(req,res,next)=>{
   // console.log("resultat:"+req.body);
    try{

        const User=new user(req.body);
        User.save();
        //res.json(req.body);
        res.send("added successfully");
    } catch(err){
        console.log(err);
    }
   

});

/////////////////////////////////////// Get all list
router.get('/', async (req, res) => {
    try{
        const data = await user.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



router.get("/getbycin/:cin", async (req, res, next) => {
    try {
      const c = parseInt(req.params.cin);
      if (c < 0) {
        throw new Error("cin must be positive");
      }
  
      const data = await user.find({ cin: c });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


 
module.exports=router;