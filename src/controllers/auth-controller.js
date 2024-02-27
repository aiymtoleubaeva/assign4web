const authService = require('../services/auth-service')

class AuthController {
    async registerUser( req, res ){
        try {
            const { user, token } = await authService.register(req.body);
            res.redirect('/login');

        }catch (error) {
            res.redirect(`/register?error=${encodeURIComponent(error.message)}`);
        }
    }

    async loginUser(req, res) {
        try {
            const { user, token } = await authService.login(req.body);

            res.cookie("token", token, { httpOnly: true });
            res.redirect('/');
        } catch (error) {
            res.redirect(`/login?error=${encodeURIComponent(error.message)}`);
        }
    }

    async logoutUser(req, res) {
        try{
            res.clearCookie('token')
            res.redirect('/')
        } catch (error) {
            res.redirect(`/?error=${encodeURIComponent(error.message)}`)
        }
    }

}

module.exports = new AuthController();