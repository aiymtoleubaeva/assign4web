const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
    async register(userData) {
        const {email, username, password} = userData;

        const userExists = await UserModel.findOne({ email: email })
        if(userExists){
            throw new Error('User with that Email already exists!')
        }

        const userExistsUsername = await UserModel.findOne({ username: username })
        if(userExistsUsername){
            throw new Error('User with that Username already exists!')
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new UserModel({
            username: username,
            email: email,
            password: hashedPassword
        })
        await user.save()

        const token = this.generateToken(user)
        console.log(token)
        return { user, token };
    }

    async login(loginData){
        const { username, password } = loginData;

        const user = await UserModel.findOne({ username })
        if (!user) {
            throw new Error("User with that Username doesn't exist")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Invalid Password')
        }

        const token = this.generateToken(user);
        console.log(token)
        return { user, token };
    }

    generateToken(user) {
        return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '3h'});
    }
}

module.exports = new AuthService();