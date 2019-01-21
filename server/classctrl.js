module.exports = {
    async addClass(req,res,next){
        let db = req.app.get('db');
        let {student_name,class_name} = req.body;
        await db.add_class([student_name,class_name]);
        let a = await db.get_my_classes([student_name]);
        res.status(200).send(a);
    },
    async editClass(req,res,next){
        let db = req.app.get('db');
        let {student_name,new_class_name,class_name} = req.body;
        await db.edit_class([new_class_name,student_name,class_name]);
        let a = await db.get_my_classes([student_name]);
        res.status(200).send(a);
    },
    async deleteClass(req,res,next){
        let db = req.app.get('db');
        let {student_name,class_name} = req.params;
        await db.delete_class([student_name,class_name]);
        let a = await db.get_my_classes([student_name]);
        res.status(200).send(a);
    }
}