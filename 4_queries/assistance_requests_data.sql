SELECT completed_at - started_at as duration, teachers.name as teacher, students.name as student, assignments.name as assignment
FROM assistance_requests
JOIN assignments ON assignments.id = assignment_id
JOIN students ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
ORDER BY duration;