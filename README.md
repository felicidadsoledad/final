# 🧠 Sistema TDAH - Backend

Sistema web backend para la gestión de pacientes, evaluaciones y tareas. Desarrollado con Node.js, MySQL y Docker Compose.

---

## 🚀 Tecnologías utilizadas

- Node.js (Express)
- MySQL 8
- Docker & Docker Compose
- dotenv
- EJS

---

## 📦 ¿Cómo levantar el entorno?

1. Clona este repositorio:

```bash
git clone https://github.com/tu_usuario/sistema-tdah.git
cd sistema-tdah

---

Crea un archivo .env en la raiz con:
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Feli1234-qb
DB_NAME=sistema_tdah

--- 

Levanta el entorno con:
docker-compose up --build

---

Estructura
📂 C:\sistema_tdah
│
├── 📂 config
│    └── db.js
├── 📂 node_modules
├── 📂 public
│   ├── 📂 images
│       ├── img14.jpg
│       ├── img15.jpg
│       └── img13.jpg
├── 📂 Sistema_tdah
│   └── docker-compose.yml
│
├── 📂 views
│   ├── editar_evaluacion.ejs
│   ├── editar_paciente.ejs
│   ├── editar_tarea.ejs 
│   ├── menu.ejs
│   ├── registro.ejs
│   ├── registro_evaluacion.ejs
│   ├── registro_tarea.ejs
│   ├── reporte.ejs
│   ├── reporte_evaluaciones.ejs
│   ├── reporte_tareas.ejs
│   └── resultado.ejs
├── .env
├── app.js (Servidor principal)
├── Docker-compose.yml
├── Dockerfile
├── export_tdah.sql (Archivo de migración)
├── package-lock.json
├── package.json
├── README.md
├── Sistema_tdah_mysql.sql

---

Endpoints de ejemplo
/menu	-	Pagina principal
/reporte_evaluaciones	-	Reporte de avaluaciones
/reporte_tareas		-	Reporte tareas

---

Autor
Felicidad Quispe Balcazar
Desarrolladora backend enfocada en sistemas escalables y entornos Dockerizados.
