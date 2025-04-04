const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    therapist_id: {
        type:String,
        required:true,
        unique:true
    },
    username: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default: Date.now
    },

});

// パスワードを保存する前にハッシュ化
userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();    
})

// comparePassword メソッドを追加
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  

module.exports = mongoose.model('User', userSchema);