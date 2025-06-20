import React from "react";
import { useCiclos } from "../hooks/useCiclos";

export default function CiclosPage() {
  const {
    ciclos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel,
  } = useCiclos();

  const formatDate = (dateString) => {
    return dateString ? dateString.split("T")[0] : "";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ciclos Evaluativos</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          type="number"
          name="anio"
          placeholder="Año"
          value={form.anio}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          min="1"
        />
        <input
          type="date"
          name="fechaInicio"
          value={form.fechaInicio}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          min={form.anio ? `${form.anio}-01-01` : undefined}
          max={form.anio ? `${form.anio}-12-31` : undefined}
        />
        <input
          type="date"
          name="fechaFin"
          value={form.fechaFin}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          min={form.anio ? `${form.anio}-01-01` : undefined}
          max={form.anio ? `${form.anio}-12-31` : undefined}
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

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Año</th>
            <th className="border p-2">Fecha Inicio</th>
            <th className="border p-2">Fecha Fin</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ciclos.map((ciclo) => (
            <tr key={ciclo.id}>
              <td className="border p-2">{ciclo.anio}</td>
              <td className="border p-2">{formatDate(ciclo.fechaInicio)}</td>
              <td className="border p-2">{formatDate(ciclo.fechaFin)}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(ciclo)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(ciclo.id)}
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
