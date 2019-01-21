update hogwarts_roles
set class_id = (select hogwarts_classes.class_id from hogwarts_classes where hogwarts_classes.class_name = $1)
where hogwarts_roles.student_id = (select hogwarts_students.student_id from hogwarts_students where hogwarts_students.student_name=$2)
and class_id = (select hogwarts_classes.class_id from hogwarts_classes where hogwarts_classes.class_name = $3);