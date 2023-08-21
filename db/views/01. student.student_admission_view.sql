-- View: student.student_admission_view

-- DROP VIEW student.student_admission_view;

CREATE OR REPLACE VIEW student.student_admission_view
 AS
 SELECT c.id,
    tm.id AS tran_id,
    tm.tran_code,
    c.admission_date AS admission_date_ad,
    core.date_np(c.admission_date)::character varying(50) AS admission_date,
    s.student_id,
    (((((s.first_name::text || ' '::text) || s.middle_name::text) || ' '::text) || s.last_name::text))::character varying(100) AS student_name,
    string_agg(cd.contact_number::text, ', '::text)::character varying(100) AS contact_number,
    ac.class_name,
    f.faculty_name,
    courses.course_name,
    (c.academic_session_type::character varying::text || ' '::text) ||
        CASE
            WHEN lower(at.academic_type::text) = lower('Yearly'::text) THEN 'Year'::character varying
            ELSE at.academic_type
        END::text AS academic_session_type
   FROM student.class_details c
     JOIN student.students s ON s.id = c.student_id
     JOIN academic.classes ac ON ac.id = c.class_id
     JOIN tran.transaction_master tm ON c.tran_id = tm.id
     LEFT JOIN academic.courses ON c.course_id = courses.id
     LEFT JOIN academic.faculties f ON f.id = courses."faculty_Id"
     LEFT JOIN student.contact_details cd ON cd.student_id = s.id
     LEFT JOIN academic.academic_type at ON at.id = courses.academic_type_id
  GROUP BY c.admission_date, s.student_id, s.first_name, s.middle_name, s.last_name, ac.class_name, f.faculty_name, courses.course_name, c.id, at.academic_type, tm.id, tm.tran_code;

ALTER TABLE student.student_admission_view
    OWNER TO postgres;

