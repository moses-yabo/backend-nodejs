const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=>{
    console.log('connected to mongo db ...');
})
.catch((err)=>{
    console.log('err',err.message);
});

const courseSchema = mongoose.Schema({
name:String,
author:String,
tags:[String],
date:Date,
isPublished:Boolean,
price:Number
});


const Course = mongoose.model('Course',courseSchema);

async function getCourses(){
    return await Course
    .find({isPublished:true})
    .or([
        {price:{$gte:15}},
        {name:/.*by.*/i}
    ])
    .sort({price:-1})
    .select({name:1,author:1,price:1})
};

async function run() {
    const  courses = await getCourses();
    console.log(courses);
}
async function updateCourse(id) {
    
    const course = await Course.findById(id,(v)=>{
        console.log();
    });
    
    console.log(course);
    }
    updateCourse('5a68fe2142ae6a6482c4c9cb')