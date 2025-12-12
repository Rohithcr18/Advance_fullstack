const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = new express()
const port = 3000 || process.env.PORT

require('dotenv').config()


app.use(cors())
app.use(express.json())

const FoodModel = require('./models/Food')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


app.post('/insert',async(req,res)=>{
    const foodname = req.body.foodname
    const daysSinceIAte = req.body.daysSinceIAte
    const food = new FoodModel({foodname:foodname, daysSinceIAte:daysSinceIAte})
    try{
        await food.save()
        res.status(200).send("Food item inserted successfully")
    }catch(err){
        res.status(500).send("Error inserting food item")
    }
})

app.get('/read',async(req,res)=>{
    try{
        const foodItems = await FoodModel.find({})
        res.status(200).json(foodItems)
    }catch{
        res.status(500).send("Error reading food items")
    }
})

app.put('/update',async(req,res)=>{
    const newfoodname = req.body.newfoodname
    const id = req.body.id
    try{
        await FoodModel.findByIdAndUpdate(id,{foodname:newfoodname},{new:true})
        res.status(200).send("food item updated successfully")
    }catch(err){
        res.status(500).send("Error updating the food item")
    }
})

app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    console.log(id)
    try{
        await FoodModel.findByIdAndDelete(id)
        res.status(200).send("Food items deleted successfully")
    }catch(err){
        res.status(500).send(err)
    }
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})