import { useCargos } from "../hooks/useCargos";

export default function CargosPage() {
  const { cargos, modelos, form, handleChange, handleSubmit, handleEdit, handleDelete, handleCancel } = useCargos();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cargos</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          name="nombreCargo"
          value={form.nombreCargo}
          onChange={handleChange}
          placeholder="Nombre del cargo"
          className="border p-2 rounded"
        />
        <select
          name="modeloEvaluativoId"
          value={form.modeloEvaluativoId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione un modelo</option>
          {modelos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombreModelo}
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
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Modelo Evaluativo</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargos.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.nombreCargo}</td>
              <td className="border p-2">
                {modelos.find((m) => m.id === c.modeloEvaluativoId)?.nombreModelo || c.modeloEvaluativoId}
              </td>
              <td className="border p-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(c)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(c.id)}
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
