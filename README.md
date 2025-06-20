# Sistema de Evaluaciones

Este proyecto implementa un sistema de evaluaciones de desempeño que permite registrar ciclos evaluativos, grupos, evaluaciones, colaboradores, cargos y reportes de calificaciones.

## 🌟 Idea central del negocio

El sistema facilita la gestión de evaluaciones de desempeño para empresas. Permite:

- Configurar ciclos y grupos evaluativos.
- Asignar cargos, colaboradores y modelos de evaluación.
- Registrar respuestas a cuestionarios y calificaciones.
- Generar reportes agregados por cargo y ciclo.

## 🏛️ Arquitectura

El backend está implementado en **.NET Clean Architecture**:

```
EvaluacionDesempenoSolution
 ├── Domain            # Entidades y modelos de dominio
 ├── Application       # Interfaces de servicios
 ├── Infrastructure    # Repositorios y acceso a datos (SQLite)
 └── WebAPI            # Exposición de API REST
```

El frontend está hecho en **React + Vite + TailwindCSS**, consumiendo la API REST del backend.

La base de datos es **SQLite**, embebida en el proyecto.

## ⚙️ Cómo ejecutar

### Backend (.NET WebAPI)

1️⃣ Navega al proyecto WebAPI:

```bash
cd EvaluacionDesempenoSolution/EvaluacionDesempeno.WebAPI
```

2️⃣ Restaura y ejecuta:

```bash
dotnet restore
dotnet ef database update  # Asegúrate que la base de datos está migrada
dotnet run
```

Esto expondrá la API en `https://localhost:5001` o `http://localhost:5000`.

---

### Frontend (React + Vite + Tailwind)

1️⃣ Navega al frontend:

```bash
cd frontend
```

2️⃣ Instala dependencias:

```bash
npm install
```

3️⃣ Ejecuta el proyecto:

```bash
npm run dev
```

Esto abrirá la app en `http://localhost:5173`.

---

## 📊 Base de datos

El proyecto incluye el archivo `app.db` en la carpeta WebAPI `Data`, para que puedas usarlo sin crear una nueva base de datos.

Si necesitas regenerarla:

```bash
dotnet ef database update
```

---

## 📁 Estructura relevante

```
Taller_TQ/
 ├── EvaluacionDesempenoSolution/
 │    ├── *.sln                   # Solución .NET
 │    └── WebAPI/Data/app.db       # Base de datos SQLite
 ├── frontend/
 │    └── src/                     # Componentes React
 └── README.md                     # Este archivo
```

---

## 👨‍💻 Autor

Desarrollado como solución técnica para un sistema de evaluaciones de desempeño.
