module.exports = {
    async getMyClasses(req,res,next){
        let db = req.app.get('db');
        let {student_name} = req.params;
        let a = await db.get_my_classes([student_name]);
        res.status(200).send(a);
    },
    async getMyClassMates(req,res,next){
        let db = req.app.get('db');
        let a = await db.get_my_classmates([]);
        res.status(200).send(a);
    }

}