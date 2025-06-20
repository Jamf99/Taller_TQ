import { useState, useEffect } from "react";
import axios from "axios";

export default function useReportes() {
  const [ciclos, setCiclos] = useState([]);
  const [form, setForm] = useState({
    cicloEvaluativoId: "",
    reporte: null
  });

  useEffect(() => {
    fetchCiclos();
  }, []);

  const fetchCiclos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/cicloevaluativo");
      setCiclos(res.data);
    } catch (err) {
      console.error("Error al obtener ciclos", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cicloEvaluativoId) {
      alert("Seleccione un ciclo");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5046/api/reportes/${form.cicloEvaluativoId}`);
      setForm(prev => ({ ...prev, reporte: res.data }));
    } catch (err) {
      console.error("Error al generar reporte", err);
      alert("Error al generar el reporte");
    }
  };

  return {
    ciclos,
    form,
    handleChange,
    handleSubmit
  };
}
