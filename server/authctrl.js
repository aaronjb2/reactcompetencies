const bcrypt = require('bcryptjs');

module.exports = {
    async createStudent(req,res,next){
        const db = req.app.get('db');
        let {student_id,student_name,student_password} = req.body;
        let salt = bcrypt.genSaltSync(10);
        let student_hash = bcrypt.hashSync(student_password, salt);
        await db.create_student([student_id,student_name,student_hash]);
        res.sendStatus(200);
    },
    async login(req,res,next){
        const db = req.app.get('db');
        let {student_name,student_password} = req.body;
        let [findStudent] = await db.find_student([student_name]);
        if(!findStudent)return res.status(200).send('There is no such student');
        let result = bcrypt.compareSync(student_password, findStudent.student_hash);
        if (result){
            req.session.student = findStudent;
            res.status(200).send({status:'loggedIn', student_name:req.session.student.student_name, student_id: req.session.student.student_id});
        }else{
            res.status(401).send('invalid password');
        }
    },
    async logout(req,res,next){
        req.session.student = {student_name:'',student_id:0};
        req.session.destroy();
        res.status(200).send({status:'loggedOut',student_name:'',student_id:0});
    }
}