const adminService = require('../services/admin-service')

class AdminController {
    async getAllUsers(req, res) {
        try{
            const { users, deletedUsers} = await adminService.getAllUsers()
            res.render('admin/admin', {req: req, users, deletedUsers })
        } catch (error){
            res.status(500).json({message: error.message})
        }
    }

    async addUser(req, res) {
        try {
            const { username, email, password, role} = req.body;
            const savedUser = adminService.addUser( username, email, password, role)
            res.status(201).json({message: 'User added successfully!', user: savedUser})
        } catch (error){
            res.status(500).json({ message: error.message });
        }
    }

    async editUser(req, res) {
        try {
            const { username, email, password, role} = req.body;
            const userId = req.params.id;
            const updatedUser = await adminService.editUser(userId, username, email, password, role)
            res.status(200).json({message: 'User edited successfully!', user: updatedUser})

        } catch (error){
            res.status(500).json({ message: error.message });

        }
    }

    async deleteUser(req, res){
        try {
            const userId = req.params.id;
            await adminService.deleteUser(userId);
            res.status(200).json({message: 'User deleted successfully!'})
        } catch (error){
            res.status(500).json({ message: error.message });
        }
    }

    async getUserDetails(req, res) {
        try {
            const userId = req.params.id;
            const user = await adminService.getUserDetails(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AdminController();