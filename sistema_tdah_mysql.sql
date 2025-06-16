DROP TABLE IF EXISTS pacientes;
DROP TABLE IF EXISTS evaluaciones;
DROP TABLE IF EXISTS tareas;

-- Crear tabla pacientes
CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT NOT NULL,
  sexo VARCHAR(20) NOT NULL,
  tutor VARCHAR(100) NOT NULL
);

-- Insertar pacientes
INSERT INTO pacientes VALUES
(1,'Mathias Rodrigues',7,'Masculino','Edwin Rodrigues'),
(2,'Brian Vargas',15,'Masculino','Alberto Vargas'),
(3,'Emely Leon',10,'Femenino','Felicidad Quispe'),
(4,'Stephany Chumacero',12,'Femenino','Felicidad Quispe'),
(5,'Laura rojas',5,'Femenino','Alex Rojas'),
(9,'Laura Treviño',5,'Femenino','Ever Treviño'),
(10,'Johanna Añez',12,'Femenino','Emilia Duarte');

-- Crear tabla evaluaciones
CREATE TABLE evaluaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  fecha DATE NOT NULL,
  resultado TEXT NOT NULL,
  psicopedagoga VARCHAR(100) NOT NULL,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- Insertar evaluaciones
INSERT INTO evaluaciones VALUES
(1,1,'2025-03-03','El niño, ingreso con un cuadro de hiperactividad incontrolable...','Martha Guerrero'),
(2,4,'2025-04-07','Se reforzó en el área de matemáticas, le gusta las matemáticas...','Gabriela Garcia'),
(3,5,'2025-03-06','Tiene problemas para seguir instrucciones, pierde la concentración...','Gabriela Garcia'),
(4,2,'2025-04-16','Dificultad para concentrarse en una tarea...','Martha Guerrero'),
(5,7,'2025-04-10','Es una niña con hiperactividad y falta de atención en clases.','Martha Guerrero'),
(6,11,'2025-06-06','Es de gran ayuda que lea libros.','Martha Guerrero'),
(7,3,'2025-06-04','Es una niña con déficit de atención, no puede concentrarse.','Martha Guerrero'),
(8,13,'2025-06-03','Es un niño hiperactivo, con déficit de atención, tiene problemas en el colegio.','Martha Guerrero');

-- Crear tabla tareas
CREATE TABLE tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  descripcion TEXT NOT NULL,
  fecha DATE NOT NULL,
  avance TEXT NOT NULL,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- Insertar tareas
INSERT INTO tareas VALUES
(1,1,'Se concentró al armar los rompecabezas...','2025-03-03','- Rompecabezas de abecedario\n- Rompecabezas vocales\n- Lectura\n- Caligrafía'),
(2,5,'Hizo la tarea del colegio, le gustó aprender los colores...','2025-04-04','- Apoyo Escolar\n- Aprendiendo colores y texturas'),
(3,7,'Palpó diferentes texturas para reconocer, apoyo escolar.','2025-06-12','- Rompecabezas\n- Texturas\n- Apoyo escolar'),
(4,2,'Le gusta tocar la guitarra, clases sincronizadas con adaptación.','2025-06-02','- Refuerzo matemático\n- Lectura por gusto\n- Clases de guitarra'),
(5,11,'Joven hiperactiva que le gusta cantar.','2025-06-09','- Lectura de libros\n- Canta'),
(6,13,'Niño hiperactivo con déficit de atención.','2025-06-12','- Lectura\n- Ejercicios matemáticos\n- Invitación a talleres de apoyo');
