import { useRespuestas } from "../hooks/useRespuestas";

export default function RespuestasPage() {
  const {
    respuestas,
    cuestionarios,
    grupos,
    evaluaciones,
    cuestionariosFiltrados,
    colaboradores,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  } = useRespuestas();

  const getEvaluacionDetalle = (id) => {
    const ev = evaluaciones.find((e) => e.id === id);
    if (!ev) return `ID ${id}`;
    const colaborador = colaboradores.find((c) => c.id === ev.colaboradorId);
    const evaluador = colaboradores.find((c) => c.id === ev.evaluadorId);
    const grupo = grupos.find((g) => g.id === ev.grupoEvaluativoId);

    return `${grupo?.nombreGrupo || "Grupo"} - ${colaborador?.nombre || "Colaborador"} evaluado por ${evaluador?.nombre || "Evaluador"}`;
  };

  const getCuestionarioPregunta = (id) => {
    const q = cuestionarios.find((q) => q.id === id);
    return q ? q.pregunta : "N/A";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Respuestas</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <select
          name="evaluacionId"
          value={form.evaluacionId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione evaluación</option>
          {evaluaciones.map((e) => (
            <option key={e.id} value={e.id}>
              {getEvaluacionDetalle(e.id)}
            </option>
          ))}
        </select>

        <select
          name="cuestionarioId"
          value={form.cuestionarioId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione cuestionario</option>
          {cuestionariosFiltrados().map((q) => (
            <option key={q.id} value={q.id}>
              {q.pregunta}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="calificacion"
          value={form.calificacion}
          onChange={handleChange}
          min="1"
          max="5"
          className="border p-2 rounded w-40"
          placeholder="Calificación (1-5)"
        />

        <input
          type="text"
          name="comentario"
          value={form.comentario}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Comentario"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {form.id ? "Actualizar" : "Crear"}
        </button>

        {form.id && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Evaluación</th>
            <th className="border p-2">Cuestionario</th>
            <th className="border p-2">Calificación</th>
            <th className="border p-2">Comentario</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {respuestas.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{getEvaluacionDetalle(r.evaluacionId)}</td>
              <td className="border p-2">{getCuestionarioPregunta(r.cuestionarioId)}</td>
              <td className="border p-2">{r.calificacion}</td>
              <td className="border p-2">{r.comentario}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(r)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(r.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
