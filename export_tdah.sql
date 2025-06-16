PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        edad INTEGER NOT NULL,
        sexo TEXT NOT NULL,
        tutor TEXT NOT NULL
    );
INSERT INTO pacientes VALUES(1,'Mathias Rodrigues',7,'Masculino','Edwin Rodrigues');
INSERT INTO pacientes VALUES(2,'Brian Vargas',15,'Masculino','Alberto Vargas');
INSERT INTO pacientes VALUES(3,'Emely Leon',10,'Femenino','Felicidad Quispe');
INSERT INTO pacientes VALUES(4,'Stephany Chumacero',12,'Femenino','Felicidad Quispe');
INSERT INTO pacientes VALUES(5,'Laura rojas',5,'Femenino','Alex Rojas');
INSERT INTO pacientes VALUES(9,'Laura Treviño',5,'Femenino','Ever Treviño');
INSERT INTO pacientes VALUES(10,'Johanna Añez',12,'Femenino','Emilia Duarte');
CREATE TABLE evaluaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        paciente_id INTEGER NOT NULL,
        fecha TEXT NOT NULL,
        resultado TEXT NOT NULL,
        psicopedagoga TEXT NOT NULL,
        FOREIGN KEY (paciente_id) REFERENCES pacientes (id)
    );
INSERT INTO evaluaciones VALUES(1,1,'2025-03-03','El niño, ingreso con un cuadro de hiperactividad incontrolable, se trabajo con las tareas de cada sesión, y se encargo ayuda en casa al tutor para que siga con el tratamiento y sepa controlar su hiperactividad.','Martha Guerrero');
INSERT INTO evaluaciones VALUES(2,4,'2025-04-07','Se reforzo en el área de matemáticas, le gusta las matemática, no le gusta la lectura ya que va perdiendo el interés, pero le gusta contar cuentos que se las inventa al momento de contar.','Gabriela Garcia');
INSERT INTO evaluaciones VALUES(3,5,'2025-03-06','Tiene problemas para seguir instrucciones, pierde la concentración fácilmente y al mismo tiempo es muy inquieta, habla demasiado e interrumpe.','Gabriela Garcia');
INSERT INTO evaluaciones VALUES(4,2,'2025-04-16','dificultad para concentrarse en una tarea, dificultad para manejar su tiempo, parece sentirse apático y desmotivado.','Martha Guerrero');
INSERT INTO evaluaciones VALUES(5,7,'2025-04-10','Es una niña con hiperactividad y falta de atención en clases.','Martha Guerrero');
INSERT INTO evaluaciones VALUES(6,11,'2025-06-06','Es e gran ayuda que lea libros.','Martha Guerrero');
INSERT INTO evaluaciones VALUES(7,3,'2025-06-04','Es una niña con déficit de atención, no puede concentrarse.','Martha Guerrero');
INSERT INTO evaluaciones VALUES(8,13,'2025-06-03','Es un niño hiperactivo, con déficit de atención, tiene problemas en el colegio.','Martha Guerrero');
CREATE TABLE tareas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        paciente_id INTEGER NOT NULL,
        descripcion TEXT NOT NULL,
        fecha TEXT NOT NULL,
        avance TEXT NOT NULL,
        FOREIGN KEY (paciente_id) REFERENCES pacientes (id)
    );
INSERT INTO tareas VALUES(1,1,'Se concentro al momento de armar las rompecabezas, sin embargo al momento de la lectura se distrajo varias veces, al igual en la caligrafía algunas letras confunde, ejemplo la letra d con la t. ','2025-03-03','- Rompecabezas de abecedario.- Rompecabezas vocales.- Lectura.-Caligrafia.');
INSERT INTO tareas VALUES(2,5,'Hizo la tarea del colegio, se le ayudo, le gusto aprender los colores y sentir las diferentes texturas.','2025-04-04',unistr('- Apoyo Escolar\u000d\u000a- aprendiendo los colores y texturas'));
INSERT INTO tareas VALUES(3,7,'Palpo diferentes texturas para que pueda reconocer, apoyo escolar.','2025-06-12',unistr('- Rompecabeza\u000d\u000a- Texturas\u000d\u000a- Apoyo escolar'));
INSERT INTO tareas VALUES(4,2,'Le gustar tocar la guitarra, sincroniza sus clases de adaptación tomando clases de guitarra.','2025-06-02',unistr('- Le gusta la matemática, refuerza lo avanzado\u000d\u000a- Lee un libro que le gusta\u000d\u000a- Tomo clases de guitarra.'));
INSERT INTO tareas VALUES(5,11,'Es una joven que le gusta cantar, es hiperactiva, conflictiva.','2025-06-09',unistr('- Lectura de libros\u000d\u000a- Canta'));
INSERT INTO tareas VALUES(6,13,'Es un niño hiperactivo, con déficit de atención.','2025-06-12',unistr('- Practica la lectura.\u000d\u000a- Realiza ejercicios matemáticos\u000d\u000a- como sugerencia se le invito a los talleres\u000d\u000a- En esos talleres ayudan '));
INSERT INTO sqlite_sequence VALUES('pacientes',13);
INSERT INTO sqlite_sequence VALUES('evaluaciones',8);
INSERT INTO sqlite_sequence VALUES('tareas',6);
COMMIT;
