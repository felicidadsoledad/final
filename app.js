require('dotenv').config(); // para usar el archivo .env
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db'); // conexión MySQL

const app = express();
 app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// para que public sea accesible
app.use(express.static('public'));

// Configurar la carpeta 'views' para EJS
app.set('views', __dirname + '/views');
// Ruta principal
app.get('/', (req, res) => {
    res.redirect('/menu');
});
// Muestra la pagina principal menu
app.get('/menu', (req, res) => {
    res.render('menu');
});

// Ruta para mostrar formulario de registro de pacientes
app.get('/registro', (req, res) => {
    res.render('registro');
});

// Guardar el registro en la base de datos, tabla pacientes
app.post('/guardar-paciente', async (req, res) => {
    const { nombre, edad, sexo, tutor } = req.body;
    try {
        const [resultado] = await db.query(
            'INSERT INTO pacientes (nombre, edad, sexo, tutor) VALUES (?, ?, ?, ?)',
            [nombre, edad, sexo, tutor]
        );

        console.log("Paciente registrado con éxito, ID:", resultado.insertId);
        res.render('resultado', {
            mensaje: "Paciente registrado satisfactoriamente",
            id: resultado.insertId,
            rutaEliminar: null
        });

    } catch (err) {
        console.error("Error al insertar paciente:", err.message);
        res.render('resultado', { mensaje: "Error al registrar paciente", id: null, rutaEliminar: null });
    }
});

// Mostrar formulario para registrar evaluación (con lista de pacientes)
app.get('/registro_evaluacion', async (req, res) => {
    try {
        const [pacientes] = await db.query("SELECT id, nombre FROM pacientes");
        res.render('registro_evaluacion', { pacientes });
    } catch (err) {
        console.error("Error al cargar pacientes:", err.message);
        res.send("Error al mostrar el formulario de evaluación.");
    }
});

// Guardar evaluación
app.post('/guardar-evaluacion', async (req, res) => {
    const { paciente_id, fecha, resultado, psicopedagoga } = req.body;
    try {
        const [resultadoQuery] = await db.query(
            "INSERT INTO evaluaciones (paciente_id, fecha, resultado, psicopedagoga) VALUES (?, ?, ?, ?)",
            [paciente_id, fecha, resultado, psicopedagoga]
        );

        console.log("Evaluación registrada con éxito, ID:", resultadoQuery.insertId);
        res.render('resultado', {
            mensaje: "Evaluación registrada satisfactoriamente",
            id: resultadoQuery.insertId,
            rutaEliminar: null
        });
    } catch (err) {
        console.error("Error al insertar evaluación:", err.message);
        res.render('resultado', { mensaje: "Error al registrar evaluación", id: null, rutaEliminar: null });
    }
});

// Mostrar formulario para registrar tarea (con lista de pacientes)
app.get('/registro_tarea', async (req, res) => {
    try {
        const [pacientes] = await db.query("SELECT id, nombre FROM pacientes");
        res.render('registro_tarea', { pacientes });
    } catch (err) {
        console.error("Error al cargar pacientes para tareas:", err.message);
        res.send("Error al mostrar el formulario de tarea.");
    }
});

// Guardar tarea
app.post('/guardar-tarea', async (req, res) => {
    const { paciente_id, descripcion, fecha, avance } = req.body;
    try {
        const [resultadoQuery] = await db.query(
            "INSERT INTO tareas (paciente_id, descripcion, fecha, avance) VALUES (?, ?, ?, ?)",
            [paciente_id, descripcion, fecha, avance]
        );

        console.log("Tarea registrada con éxito, ID:", resultadoQuery.insertId);
        res.render('resultado', {
            mensaje: "Tarea registrada satisfactoriamente",
            id: resultadoQuery.insertId,
            rutaEliminar: null
        });
    } catch (err) {
        console.error("Error al insertar tarea:", err.message);
        res.render('resultado', { mensaje: "Error al registrar tarea", id: null, rutaEliminar: null });
    }
});

// Ruta para generar reporte de pacientes
app.get('/reporte', async (req, res) => {
    try {
        const [pacientes] = await db.query("SELECT * FROM pacientes");
        res.render('reporte', { pacientes });
    } catch (err) {
        console.error("Error al consultar pacientes:", err.message);
        res.send("Error al generar el reporte.");
    }
});

// Ruta para reporte de evaluaciones con nombre del paciente
app.get('/reporte_evaluaciones', async (req, res) => {
    try {
        const [evaluaciones] = await db.query(`
            SELECT e.id, p.nombre AS paciente, e.fecha, e.resultado, e.psicopedagoga
            FROM evaluaciones e
            JOIN pacientes p ON e.paciente_id = p.id
        `);
        res.render('reporte_evaluaciones', { evaluaciones });
    } catch (err) {
        console.error("Error al consultar evaluaciones:", err.message);
        res.send("Error al generar el reporte de evaluaciones.");
    }
});

// Ruta para reporte de tareas con nombre del paciente
app.get('/reporte_tareas', async (req, res) => {
    try {
        const [tareas] = await db.query(`
            SELECT t.id, p.nombre AS paciente, t.descripcion, t.fecha, t.avance
            FROM tareas t
            JOIN pacientes p ON t.paciente_id = p.id
        `);
        res.render('reporte_tareas', { tareas });
    } catch (err) {
        console.error("Error al consultar tareas:", err.message);
        res.send("Error al generar el reporte de tareas.");
    }
});

//  Editar paciente
app.get('/editar_paciente/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM pacientes WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.render('editar_paciente', { paciente: rows[0] });
        } else {
            res.send("No se encontró el paciente especificado.");
        }
    } catch (err) {
        console.error("Error al cargar datos del paciente:", err.message);
        res.send("Error al cargar el formulario.");
    }
});

app.post('/actualizar-paciente/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, edad, sexo, tutor } = req.body;
    try {
        await db.query(
            'UPDATE pacientes SET nombre = ?, edad = ?, sexo = ?, tutor = ? WHERE id = ?',
            [nombre, edad, sexo, tutor, id]
        );
        res.redirect('/reporte');
    } catch (err) {
        console.error("Error al actualizar el paciente:", err.message);
        res.send("Error al guardar los cambios.");
    }
});

//  Editar evaluación
app.get('/editar_evaluacion/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM evaluaciones WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.render('editar_evaluacion', { evaluacion: rows[0] });
        } else {
            res.send("No se encontró la evaluación especificada.");
        }
    } catch (err) {
        console.error("Error al cargar la evaluación:", err.message);
        res.send("Error al cargar el formulario.");
    }
});

app.post('/actualizar-evaluacion/:id', async (req, res) => {
    const id = req.params.id;
    const { fecha, resultado, psicopedagoga } = req.body;
    try {
        await db.query(
            'UPDATE evaluaciones SET fecha = ?, resultado = ?, psicopedagoga = ? WHERE id = ?',
            [fecha, resultado, psicopedagoga, id]
        );
        res.redirect('/reporte_evaluaciones');
    } catch (err) {
        console.error("Error al actualizar la evaluación:", err.message);
        res.send("Error al guardar los cambios.");
    }
});

// ✏️ Editar tarea
app.get('/editar_tarea/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM tareas WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.render('editar_tarea', { tarea: rows[0] });
        } else {
            res.send("No se encontró la tarea especificada.");
        }
    } catch (err) {
        console.error("Error al cargar la tarea:", err.message);
        res.send("Error al cargar el formulario.");
    }
});

app.post('/actualizar-tarea/:id', async (req, res) => {
    const id = req.params.id;
    const { descripcion, fecha, avance } = req.body;
    try {
        await db.query(
            'UPDATE tareas SET descripcion = ?, fecha = ?, avance = ? WHERE id = ?',
            [descripcion, fecha, avance, id]
        );
        res.redirect('/reporte_tareas');
    } catch (err) {
        console.error("Error al actualizar la tarea:", err.message);
        res.send("Error al guardar los cambios.");
    }
});

// Rutas para eliminar un paciente en la tabla pacientes
app.get('/eliminar_paciente/:id', async (req, res) => {
    const id = req.params.id;
    const volver = req.query.volver || '/menu';
    try {
        const [rows] = await db.query('SELECT nombre FROM pacientes WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.render('resultado', { mensaje: "Paciente no encontrado", id: null, rutaEliminar: null });
        }
        const mensaje = `¿Estás seguro de que deseas eliminar al paciente ${rows[0].nombre}?`;
        const rutaEliminar = `/eliminar-paciente/${id}?volver=${volver}`;
        res.render('resultado', { mensaje, id, rutaEliminar, volverA: volver });
    } catch (err) {
        console.error("Error al buscar paciente:", err.message);
        res.send("Error al buscar el paciente.");
    }
});

app.post('/eliminar-paciente/:id', async (req, res) => {
    const id = req.params.id;
    const volver = req.query.volver || '/menu';
    try {
        await db.query('DELETE FROM pacientes WHERE id = ?', [id]);
        res.render('resultado', { mensaje: "Paciente eliminado correctamente", id, rutaEliminar: null, volverA: volver });
    } catch (err) {
        console.error("Error al eliminar paciente:", err.message);
        res.render('resultado', { mensaje: "Error al eliminar", id: null, rutaEliminar: null, volverA: volver });
    }
});

// Rutas para eliminar datos de un paciente en la tabla evaluaciones
app.get('/eliminar_evaluacion/:id', async (req, res) => {
    const id = req.params.id;
    const volver = req.query.volver || '/menu';
    try {
        const [rows] = await db.query(`
            SELECT e.id, p.nombre AS paciente
            FROM evaluaciones e
            JOIN pacientes p ON e.paciente_id = p.id
            WHERE e.id = ?
        `, [id]);
        if (rows.length === 0) {
            return res.render('resultado', { mensaje: "Evaluación no encontrada", id: null, rutaEliminar: null });
        }
        const mensaje = `¿Deseas eliminar la evaluación de ${rows[0].paciente}?`;
        const rutaEliminar = `/eliminar-evaluacion/${id}?volver=${volver}`;
        res.render('resultado', { mensaje, id, rutaEliminar, volverA: volver });
    } catch (err) {
        console.error("Error al buscar evaluación:", err.message);
        res.send("Error al buscar la evaluación.");
    }
});

app.post('/eliminar-evaluacion/:id', async (req, res) => {
    const id = req.params.id;
    const volver = req.query.volver || '/menu';
    try {
        await db.query('DELETE FROM evaluaciones WHERE id = ?', [id]);
        res.render('resultado', { mensaje: "Evaluación eliminada correctamente", id, rutaEliminar: null, volverA: volver });
    } catch (err) {
        console.error("Error al eliminar evaluación:", err.message);
        res.render('resultado', { mensaje: "Error al eliminar evaluación", id: null, rutaEliminar: null, volverA: volver });
    }
});

// Rutas para eliminar datos de un paciente en la tabla tareas
app.get('/eliminar_tarea/:id', async (req, res) => {
    const id = req.params.id;
    const volver = req.query.volver || '/menu';
    try {
        const [rows] = await db.query(`
            SELECT t.id, p.nombre AS paciente
            FROM tareas t
            JOIN pacientes p ON t.paciente_id = p.id
            WHERE t.id = ?
        `, [id]);
        if (rows.length === 0) {
            return res.render('resultado', { mensaje: "Tarea no encontrada", id: null, rutaEliminar: null });
        }
        const mensaje = `¿Deseas eliminar la tarea de ${rows[0].paciente}?`;
        const rutaEliminar = `/eliminar-tarea/${id}?volver=${volver}`;
        res.render('resultado', { mensaje, id, rutaEliminar, volverA: volver });
    } catch (err) {
        console.error("Error al buscar tarea:", err.message);
        res.send("Error al buscar la tarea.");
    }
});

app.post('/eliminar-tarea/:id', async (req, res) => {
    const id = req.params.id;
    const volver = req.query.volver || '/menu';
    try {
        await db.query('DELETE FROM tareas WHERE id = ?', [id]);
        res.render('resultado', { mensaje: "Tarea eliminada correctamente", id, rutaEliminar: null, volverA: volver });
    } catch (err) {
        console.error("Error al eliminar tarea:", err.message);
        res.render('resultado', { mensaje: "Error al eliminar tarea", id: null, rutaEliminar: null, volverA: volver });
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("Servidor ejecutándose en el puerto 3000");
});