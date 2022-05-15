import Joi from "joi";
import { RefreshToken, User } from "../../models";
import bcrypt from 'bcrypt';
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";

const loginController = {
    async login(req, res, next) {
        // Validation
        const loginScheme = Joi.object({
           email: Joi.string().email().required(),
           password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(), 
        });

        const { error } = loginScheme.validate(req.body);

        if(error){
            return next(err);
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email });
            if(!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // Compare the password
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // Token generation
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
            
            await RefreshToken.create({ token: refresh_token });
            res.json({ access_token, refresh_token });

        } catch (err) {
            return next(err);
        }

    }
};

export default loginController