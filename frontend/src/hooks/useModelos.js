import { useState, useEffect } from "react";
import axios from "axios";

export function useModelos() {
  const [modelos, setModelos] = useState([]);
  const [form, setForm] = useState({ id: null, nombreModelo: "" });

  useEffect(() => {
    fetchModelos();
  }, []);

  const fetchModelos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/modeloevaluativo");
      setModelos(res.data);
    } catch (err) {
      console.error("Error al obtener modelos", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombreLimpio = form.nombreModelo.trim();

    if (!nombreLimpio) {
      alert("El nombre es obligatorio");
      return;
    }

    const yaExiste = modelos.some(
      (m) =>
        m.nombreModelo.toLowerCase() === nombreLimpio.toLowerCase() &&
        m.id !== form.id
    );

    if (yaExiste) {
      alert(`Ya existe un modelo con el nombre "${nombreLimpio}".`);
      return;
    }

    try {
      if (form.id) {
        await axios.put(`http://localhost:5046/api/modeloevaluativo/${form.id}`, {
          id: form.id,
          nombreModelo: nombreLimpio
        });
      } else {
        await axios.post("http://localhost:5046/api/modeloevaluativo", {
          nombreModelo: nombreLimpio
        });
      }
      fetchModelos();
      limpiarForm();
    } catch (err) {
      console.error("Error al guardar modelo", err);
    }
  };

  const handleEdit = (modelo) => {
    setForm({
      id: modelo.id,
      nombreModelo: modelo.nombreModelo
    });
  };

  const handleDelete = async (id) => {
    if (confirm("¿Está seguro de eliminar este modelo?")) {
      try {
        await axios.delete(`http://localhost:5046/api/modeloevaluativo/${id}`);
        fetchModelos();
      } catch (err) {
        console.error("Error al eliminar modelo", err);
      }
    }
  };

  const handleCancel = () => {
    limpiarForm();
  };

  const limpiarForm = () => {
    setForm({ id: null, nombreModelo: "" });
  };

  return {
    modelos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
}
