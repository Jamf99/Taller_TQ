import useGrupos from "../hooks/useGrupos";

export default function GruposPage() {
  const {
    grupos,
    ciclos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  } = useGrupos();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Grupos Evaluativos</h2>

      <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-2">
        <select
          name="cicloEvaluativoId"
          value={form.cicloEvaluativoId}
          onChange={handleChange}
          className="border p-2 rounded min-w-[150px]"
          required
        >
          <option value="">Seleccione un ciclo</option>
          {ciclos.map(c => (
            <option key={c.id} value={c.id}>
              {c.anio}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="nombreGrupo"
          value={form.nombreGrupo}
          onChange={handleChange}
          className="border p-2 rounded min-w-[150px]"
          placeholder="Nombre del grupo"
          required
        />

        <input
          type="date"
          name="fechaInicio"
          value={form.fechaInicio}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="fechaFin"
          value={form.fechaFin}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
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

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Ciclo</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Fecha Inicio</th>
            <th className="border p-2">Fecha Fin</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map(g => (
            <tr key={g.id}>
              <td className="border p-2">
                {ciclos.find(c => c.id === g.cicloEvaluativoId)?.anio || ""}
              </td>
              <td className="border p-2">{g.nombreGrupo}</td>
              <td className="border p-2">{g.fechaInicio.split("T")[0]}</td>
              <td className="border p-2">{g.fechaFin.split("T")[0]}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(g)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
