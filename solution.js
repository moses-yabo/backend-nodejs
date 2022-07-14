const mongoose = require('mongoose');

// connect to the db
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=>{
console.log('Connected to the mongo db....');
})
.catch((err)=>{
    console.log('error',err);
})
;

// create collection Schema
const courseSchema = mongoose.Schema({
name:String,
author:String,
tags:[String],
date:Date,
isPublished:Boolean,
price:Number
});

// Model a collection
const Course =  mongoose.model('Course',courseSchema);

async function getCourses(){
    return await Course
    .find({isPublished:true, tags:'backend'})
    .sort({name:1})
    .select({name:1,author:1})
};

 async function run() {
    const courses =  await getCourses();
    console.log(courses);
 }
 run();
