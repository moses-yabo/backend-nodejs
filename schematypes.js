const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((err) => {
    console.error("could not connect to Mongo db...", err);
  });

const courseSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    //uppercase:true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: async (v) =>
        new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        }),
      message: "A course should have atleast one tag",
    },
  },
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  toObject: { getters: true, setters: true },

toJSON: { getters: true, setters: true },

runSettersOnQuery: true
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    _id: null,
    name: "Angular js course",
    category: "Web",
    author: "Lindile - Yabo",
    tags: ["frontend"],
    isPublished: true,
    price: 16.4,
  });

  try {
    const result = course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

async function getCourses() {
  const courses = await Course.find({ _id:"5a68fdf95db93f6477053ddd"
})

  
 
  console.log(courses.length);
}
getCourses();
//createCourse();
