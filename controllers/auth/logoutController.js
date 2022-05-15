import Joi from "joi";
import { RefreshToken } from "../../models";

const logoutController = {
    async logout(req, res, next) {
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });

        const { error } = refreshSchema.validate(req.body.refresh_token);

        if(error){
            return next(error);
        }

        try {
            await RefreshToken.deleteOne({ token: req.body.refresh_token });
        } catch (err) {
            return next(new Error('Something went wrong in the database'));
        }

        res.json({mesage: 'success'});
    }
};

export default logoutController;