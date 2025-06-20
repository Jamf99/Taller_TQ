import React from "react";

const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bienvenido al Sistema de Evaluaciones</h1>

      <p className="mb-4 text-gray-700">
        Este sistema permite gestionar y evaluar el desempeño de los colaboradores de la organización. 
        A través de los distintos módulos puedes crear ciclos y grupos evaluativos, asignar cargos y modelos, 
        registrar evaluaciones y obtener reportes detallados sobre las calificaciones.
      </p>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">¿Cómo funciona?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <span className="font-medium">Ciclos evaluativos:</span> Definen el período en el que se realizan las evaluaciones.
          </li>
          <li>
            <span className="font-medium">Grupos evaluativos:</span> Agrupan a los colaboradores según el ciclo.
          </li>
          <li>
            <span className="font-medium">Cargos y modelos:</span> Asocian roles y cuestionarios que serán usados en la evaluación.
          </li>
          <li>
            <span className="font-medium">Evaluaciones:</span> Relacionan a un evaluador con un evaluado dentro de un grupo.
          </li>
          <li>
            <span className="font-medium">Respuestas:</span> Registros de calificaciones y comentarios a preguntas de los cuestionarios.
          </li>
          <li>
            <span className="font-medium">Reportes:</span> Muestran promedios y métricas consolidadas por cargo y ciclo.
          </li>
        </ul>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Resumen de Entidades</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Entidad</th>
              <th className="border p-2">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Ciclo Evaluativo</td>
              <td className="border p-2">Período definido para realizar evaluaciones.</td>
            </tr>
            <tr>
              <td className="border p-2">Grupo Evaluativo</td>
              <td className="border p-2">Subdivisión dentro de un ciclo, agrupa colaboradores.</td>
            </tr>
            <tr>
              <td className="border p-2">Cargo</td>
              <td className="border p-2">Rol asignado a un colaborador.</td>
            </tr>
            <tr>
              <td className="border p-2">Modelo Evaluativo</td>
              <td className="border p-2">Conjunto de preguntas para un cargo.</td>
            </tr>
            <tr>
              <td className="border p-2">Colaborador</td>
              <td className="border p-2">Persona que puede ser evaluador o evaluado.</td>
            </tr>
            <tr>
              <td className="border p-2">Evaluación</td>
              <td className="border p-2">Vínculo entre evaluador y evaluado en un grupo.</td>
            </tr>
            <tr>
              <td className="border p-2">Respuesta</td>
              <td className="border p-2">Calificación y comentario sobre una pregunta.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
