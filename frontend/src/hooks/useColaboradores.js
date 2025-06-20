import { useState, useEffect } from "react";
import axios from "axios";

export function useColaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    cargoId: ""
  });

  useEffect(() => {
    fetchColaboradores();
    fetchCargos();
  }, []);

  const fetchColaboradores = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/colaborador");
      setColaboradores(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al obtener colaboradores", err);
    }
  };

  const fetchCargos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/cargo");
      setCargos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al obtener cargos", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.cargoId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (form.id) {
        await axios.put(`http://localhost:5046/api/colaborador/${form.id}`, form);
      } else {
        await axios.post("http://localhost:5046/api/colaborador", form);
      }
      fetchColaboradores();
      limpiarForm();
    } catch (err) {
      console.error("Error al guardar colaborador", err);
    }
  };

  const handleEdit = (colab) => {
    setForm(colab);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este colaborador?")) {
      try {
        await axios.delete(`http://localhost:5046/api/colaborador/${id}`);
        fetchColaboradores();
      } catch (err) {
        console.error("Error al eliminar colaborador", err);
      }
    }
  };

  const handleCancel = () => {
    limpiarForm();
  };

  const limpiarForm = () => {
    setForm({ id: null, nombre: "", cargoId: "" });
  };

  return {
    colaboradores,
    cargos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
}
