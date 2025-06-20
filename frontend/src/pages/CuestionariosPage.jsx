import { useCuestionarios } from "../hooks/useCuestionarios";

export default function CuestionariosPage() {
  const { cuestionarios, cargos, form, handleChange, handleSubmit, handleEdit, handleDelete, handleCancel } = useCuestionarios();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cuestionarios</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          name="pregunta"
          value={form.pregunta}
          onChange={handleChange}
          placeholder="Pregunta"
          className="border p-2 rounded"
        />
        <select
          name="cargoId"
          value={form.cargoId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione un cargo</option>
          {cargos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombreCargo}
            </option>
          ))}
        </select>

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
            <th className="border p-2">Pregunta</th>
            <th className="border p-2">Cargo</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuestionarios.map((q) => (
            <tr key={q.id}>
              <td className="border p-2">{q.pregunta}</td>
              <td className="border p-2">
                {cargos.find((c) => c.id === q.cargoId)?.nombreCargo || q.cargoId}
              </td>
              <td className="border p-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(q)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(q.id)}
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
