import { user } from '../../models/User.js';
import { checkToken } from '../../utils/checkToken.js';

export async function deleteUser(req, res) {
    const { username } = req.params;
    const token = req.headers.cookie.split('=')[1];

    try {
        if(!checkToken(token)) {
            return res.status(401).json({
                "message": "You must be logged in to perform this operation."
            });
        }

        await user.destroy({
            where: { username }
        });

        return res.status(201).json({
            "message": "Account was deleted."
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}
