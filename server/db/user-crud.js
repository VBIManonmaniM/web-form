const User = require('./models/user.model');

const addUserDetails  = async (req, res) => {
    try {
        const resume = req.files[0];
        await User.create({
            ...req.body,
            resume: {
                data: resume.buffer,
                contentType: resume.mimetype,
                name: resume.originalname
            }
        });
        res.sendStatus(201);
    } catch(e) {
        res.send({
            message: 'dberror'
        });
    }
}
module.exports = addUserDetails;