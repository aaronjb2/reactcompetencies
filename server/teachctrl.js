module.exports = {
    async getClassITeach(req,res,next){
        let db = req.app.get('db');
        let {professor_name} = req.params;
        let [a] = await db.get_class_i_teach([professor_name]);
        res.status(200).send(a);
    }
}