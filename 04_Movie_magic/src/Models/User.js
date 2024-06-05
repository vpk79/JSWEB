const {Schema, model, MongooseError} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid Email Address'],
        minLength: [10, 'Email should be at least 10 characters']

    },

    password: {
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'Only english letters allowed!'],
        minLength: 6,
        required: true
    },
});

// преди да се извърши действието - save, хешираме паролата и я презаписваме

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password,12);
    this.password = hash;
})


// тъй като не искаме rePass-а да се запазва във базата данни, създаваме виртуално пропърти за него,
// което се закача за модела, но няма да се запише в него
 
userSchema.virtual('rePassword')
    .set(function(value) {
        // validate 
        if(value !== this.password){
            throw new MongooseError('Password mismatch')
        }
    });

const User = model('User', userSchema);

module.exports = User;