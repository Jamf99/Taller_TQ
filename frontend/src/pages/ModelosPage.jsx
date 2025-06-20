import { useModelos } from "../hooks/useModelos";

export default function ModeloEvaluativoPage() {
  const {
    modelos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel,
  } = useModelos();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Modelos Evaluativos</h1>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          name="nombreModelo"
          value={form.nombreModelo}
          onChange={handleChange}
          placeholder="Nombre del modelo"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {form.id ? "Actualizar" : "Crear"}
        </button>
        {form.id && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {modelos.map((m) => (
            <tr key={m.id}>
              <td className="border p-2">{m.id}</td>
              <td className="border p-2">{m.nombreModelo}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="bg-yellow-400 p-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
