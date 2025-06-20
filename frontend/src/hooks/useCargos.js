import { useState, useEffect } from "react";
import axios from "axios";

export function useCargos() {
  const [cargos, setCargos] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombreCargo: "",
    modeloEvaluativoId: ""
  });

  useEffect(() => {
    fetchCargos();
    fetchModelos();
  }, []);

  const fetchCargos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/cargo");
      setCargos(res.data);
    } catch (err) {
      console.error("Error al obtener cargos", err);
    }
  };

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
    if (!form.nombreCargo || !form.modeloEvaluativoId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (form.id) {
        await axios.put(`http://localhost:5046/api/cargo/${form.id}`, form);
      } else {
        await axios.post("http://localhost:5046/api/cargo", form);
      }
      fetchCargos();
      limpiarForm();
    } catch (err) {
      console.error("Error al guardar cargo", err);
    }
  };

  const handleEdit = (cargo) => {
    setForm(cargo);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cargo?")) {
      try {
        await axios.delete(`http://localhost:5046/api/cargo/${id}`);
        fetchCargos();
      } catch (err) {
        console.error("Error al eliminar cargo", err);
      }
    }
  };

  const handleCancel = () => {
    limpiarForm();
  };

  const limpiarForm = () => {
    setForm({ id: null, nombreCargo: "", modeloEvaluativoId: "" });
  };

  return {
    cargos,
    modelos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
}
