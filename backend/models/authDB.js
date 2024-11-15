const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true,
        validate: function () {
            return this.confirmPassword == this.password;
        }
    },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
}, {
    timestamps: true
})

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

userSchema.pre('save', async function (next) {
    try {
        const saltRounds = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;