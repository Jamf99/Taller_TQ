import { useEvaluaciones } from "../hooks/useEvaluaciones";

export default function EvaluacionesPage() {
  const {
    evaluaciones,
    grupos,
    colaboradores,
    form,
    grupoSeleccionado,
    handleChange,
    handleGrupoChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  } = useEvaluaciones();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Evaluaciones</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <select
          name="grupoEvaluativoId"
          value={form.grupoEvaluativoId}
          onChange={handleGrupoChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione un grupo</option>
          {grupos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nombreGrupo}
            </option>
          ))}
        </select>

        <select
          name="colaboradorId"
          value={form.colaboradorId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione colaborador</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          name="evaluadorId"
          value={form.evaluadorId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione evaluador</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="border p-2 rounded"
          min={grupoSeleccionado?.fechaInicio?.substring(0, 10) || ""}
          max={grupoSeleccionado?.fechaFin?.substring(0, 10) || ""}
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
            <th className="border p-2">Grupo</th>
            <th className="border p-2">Colaborador</th>
            <th className="border p-2">Evaluador</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {evaluaciones.map((e) => (
            <tr key={e.id}>
              <td className="border p-2">
                {grupos.find((g) => g.id === e.grupoEvaluativoId)?.nombreGrupo || e.grupoEvaluativoId}
              </td>
              <td className="border p-2">
                {colaboradores.find((c) => c.id === e.colaboradorId)?.nombre || e.colaboradorId}
              </td>
              <td className="border p-2">
                {colaboradores.find((c) => c.id === e.evaluadorId)?.nombre || e.evaluadorId}
              </td>
              <td className="border p-2">{e.fecha?.substring(0, 10)}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(e)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(e.id)}
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
