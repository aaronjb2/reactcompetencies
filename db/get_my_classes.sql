select hogwarts_classes.class_id, hogwarts_classes.class_name, hogwarts_classes.class_teacher from hogwarts_classes
inner join hogwarts_roles on hogwarts_classes.class_id = hogwarts_roles.class_id 
where hogwarts_roles.student_id = (select hogwarts_students.student_id from hogwarts_students where student_name = $1);