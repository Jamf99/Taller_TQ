import useReportes from "../hooks/useReportes";

export default function ReportesPage() {
  const {
    ciclos,
    form,
    handleChange,
    handleSubmit
  } = useReportes();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reporte de Evaluaciones</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generar
        </button>
      </form>

      {form.reporte && form.reporte.length > 0 ? (
        <div className="overflow-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Cargo</th>
                <th className="p-2 border">Calificación Promedio</th>
                <th className="p-2 border">Personas Evaluadas</th>
              </tr>
            </thead>
            <tbody>
              {form.reporte.map((r, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border">{r.cargo}</td>
                  <td className="p-2 border text-center">{r.calificacionPromedio}</td>
                  <td className="p-2 border text-center">{r.personasEvaluadas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        form.reporte && (
          <div className="text-gray-600">No hay datos para este ciclo.</div>
        )
      )}
    </div>
  );
}
