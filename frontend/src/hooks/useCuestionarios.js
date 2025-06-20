import { useState, useEffect } from "react";
import axios from "axios";

export function useCuestionarios() {
  const [cuestionarios, setCuestionarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    pregunta: "",
    cargoId: ""
  });

  useEffect(() => {
    fetchCuestionarios();
    fetchCargos();
  }, []);

  const fetchCuestionarios = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/cuestionario");
      setCuestionarios(res.data);
    } catch (err) {
      console.error("Error al obtener cuestionarios", err);
    }
  };

  const fetchCargos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/cargo");
      setCargos(res.data);
    } catch (err) {
      console.error("Error al obtener cargos", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.pregunta || !form.cargoId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (form.id) {
        await axios.put(`http://localhost:5046/api/cuestionario/${form.id}`, form);
      } else {
        await axios.post("http://localhost:5046/api/cuestionario", form);
      }
      fetchCuestionarios();
      limpiarForm();
    } catch (err) {
      console.error("Error al guardar cuestionario", err);
    }
  };

  const handleEdit = (cuestionario) => {
    setForm(cuestionario);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cuestionario?")) {
      try {
        await axios.delete(`http://localhost:5046/api/cuestionario/${id}`);
        fetchCuestionarios();
      } catch (err) {
        console.error("Error al eliminar cuestionario", err);
      }
    }
  };

  const handleCancel = () => {
    limpiarForm();
  };

  const limpiarForm = () => {
    setForm({ id: null, pregunta: "", cargoId: "" });
  };

  return {
    cuestionarios,
    cargos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
}
