const mongoose = require('mongoose')
const mongodbsend=()=>{
    mongoose.connect('mongodb+srv://ram211296:root@cluster0.zn1ryhi.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 1000000,

})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
}

module.exports=mongodbsend