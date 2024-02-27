const UserModel = require('../models/user-model');
const DeletedUserModel = require('../models/deletedUser-model');
const bcrypt = require('bcrypt');


class AdminService {
    async getAllUsers() {
        try {
            const users = await UserModel.find({});
            const deletedUsers = await DeletedUserModel.find({});
            return { users, deletedUsers };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addUser(username, email, password, role) {
        try {
            const userExists = await UserModel.findOne({ email });
            if (userExists) {
                throw new Error('User with that Email already exists!');
            }

            const userExistsUsername = await UserModel.findOne({ username });
            if (userExistsUsername) {
                throw new Error('User with that Username already exists!');
            }

            const salt = await bcrypt.genSalt(5);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                role
            });

            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async editUser(userId, username, email, password, role) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const updatedData = { username, email, role, updateDate: new Date() };

            if (password) {
                const salt = await bcrypt.genSalt(5);
                updatedData.password = await bcrypt.hash(password, salt);
            }

            const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteUser(userId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const deletedUser = new DeletedUserModel({ ...user.toObject(), deletionDate: new Date() });
            await deletedUser.save();

            await UserModel.deleteOne({_id: userId});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserDetails(userId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new AdminService();
