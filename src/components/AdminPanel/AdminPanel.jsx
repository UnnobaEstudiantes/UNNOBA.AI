import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { getAcademicRagBaseUrl, uploadDocumentsToRag } from "../../services/academicRagClient";
import "./AdminPanel.css";

/** Mismas categorías RF5 que el notebook (celda RAG). */
const TEMA_OPCIONES = [
  "Material de estudio",
  "Administrativo y fechas",
  "Guía de trabajos prácticos",
  "Programa de asignatura",
  "Examen o evaluación",
  "Bibliografía",
  "Otro",
];

/**
 * Carga de documentos hacia el API del Colab (ngrok) o local vía proxy.
 */
const AdminPanel = ({ open, onClose }) => {
  const [fileList, setFileList] = useState([]);
  const [tema, setTema] = useState(TEMA_OPCIONES[0]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const ragBase = getAcademicRagBaseUrl();

  const onFiles = (e) => {
    const list = e.target.files;
    if (!list?.length) {
      setFileList([]);
      return;
    }
    setFileList(Array.from(list));
    setError("");
    setStatus("");
  };

  const onSubmit = useCallback(async () => {
    if (!ragBase) {
      setError(
        "Configurá VITE_ACADEMIC_RAG_URL con la URL de ngrok (o proxy local) y reiniciá Vite."
      );
      return;
    }
    if (!fileList.length) {
      setError("Seleccioná al menos un archivo.");
      return;
    }
    setUploading(true);
    setError("");
    setStatus("Subiendo e indexando en Colab… puede tardar varios minutos.");
    try {
      const data = await uploadDocumentsToRag(fileList, { tema });
      setStatus(
        `Listo: ${data.saved?.length ?? 0} archivo(s) en el servidor. Ya podés consultarlos en el chat.`
      );
      setFileList([]);
    } catch (err) {
      setError(err?.message || String(err));
      setStatus("");
    } finally {
      setUploading(false);
    }
  }, [fileList, ragBase, tema]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="admin-panel-backdrop"
          role="presentation"
          onClick={onClose}
        >
          <motion.div
            className="admin-panel"
            role="dialog"
            aria-labelledby="admin-panel-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="admin-panel-title" className="admin-panel-title">
              Carga de documentos
            </h2>
            <p className="admin-panel-p">
              <strong>Orden:</strong> primero en Colab tenés que tener corriendo la API +
              ngrok (última celda) y en <code>.env</code> la misma URL en{" "}
              <code>VITE_ACADEMIC_RAG_URL</code> (reiniciá <code>npm run dev</code>).
              Después elegís archivos y <strong>Subir e indexar</strong>: van al servidor
              RAG, se guardan en <code>data/</code> en Colab y se reindexa. No hace falta
              subir a mano al panel de archivos de Colab si usás esto.
            </p>
            {!ragBase && (
              <p className="admin-panel-note admin-panel-note--warn">
                No hay URL del RAG configurada: agregá{" "}
                <code>VITE_ACADEMIC_RAG_URL</code> en <code>.env</code>.
              </p>
            )}
            <label className="admin-panel-label" htmlFor="admin-tema">
              Categoría temática (RF5)
            </label>
            <select
              id="admin-tema"
              className="admin-panel-select"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              disabled={uploading}
            >
              {TEMA_OPCIONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <label className="admin-panel-file-label">
              <input
                type="file"
                className="admin-panel-file"
                onChange={onFiles}
                multiple
                accept=".pdf,.doc,.docx,.md,.txt,.csv,.xlsx"
                disabled={uploading}
              />
              <span>Seleccionar archivos</span>
            </label>
            {fileList.length > 0 && (
              <ul className="admin-panel-list">
                {fileList.map((f) => (
                  <li key={f.name + f.size}>{f.name}</li>
                ))}
              </ul>
            )}
            {error && <p className="admin-panel-error">{error}</p>}
            {status && !error && <p className="admin-panel-status">{status}</p>}
            <div className="admin-panel-actions">
              <button
                type="button"
                className="admin-panel-close"
                onClick={onClose}
                disabled={uploading}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="admin-panel-submit"
                onClick={onSubmit}
                disabled={uploading || !ragBase || fileList.length === 0}
              >
                {uploading ? "Enviando…" : "Subir e indexar"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

AdminPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminPanel;
