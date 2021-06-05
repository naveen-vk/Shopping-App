const mongoose=require('mongoose');

const uiqueValidator =require('mongoose-unique-validator');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phnnumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
     createdAt:{
         type:Date,
         default:Date.now
        },
});
userSchema.plugin(uiqueValidator);


//methods

// userSchema.methods.verifyPassword=function(password){
//     return bcrypt.compareSync(password,this.password);
// };

// userSchema.methods.generateJwt = function () {
//     return jwt.sign({ _id: this._id},
//         process.env.JWT_SECRET,
//     {
//         expiresIn: process.env.JWT_EXP
//     });
// }

const user=module.exports=mongoose.model('user',userSchema);