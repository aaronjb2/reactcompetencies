const bcrypt = require('bcryptjs');

module.exports = {
    async createStudent(req,res,next){
        const db = req.app.get('db');
        let {student_id,student_name,student_password} = req.body;
        let salt = bcrypt.genSaltSync(10);
        let student_hash = bcrypt.hashSync(student_password, salt);
        await db.create_student([student_id,student_name,student_hash]);
        res.sendStatus(200);
    }
}