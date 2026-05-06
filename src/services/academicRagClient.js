/**
 * Base URL del asistente RAG (FastAPI: academic_rag_api_colab.py).
 *
 * - Colab / ngrok: en `.env` poné `VITE_ACADEMIC_RAG_URL=https://xxxx.ngrok-free.app` (la que imprime Colab).
 * - API solo en tu PC (puerto 8000): `VITE_RAG_PROXY_LOCAL=true` y el proxy de Vite usa `/academic-rag` → 127.0.0.1:8000.
 * Sin URL ni proxy explícito, no se llama al RAG (evita ECONNREFUSED si no hay nada en :8000).
 */
function normalizeRagUrl(raw) {
  if (!raw || typeof raw !== "string") return "";
  let s = raw.trim().replace(/^["']|["']$/g, "");
  return s.replace(/\/$/, "");
}

/** True si la URL parece túnel ngrok (hace falta header anti-página de aviso). */
function isNgrokLikeUrl(url) {
  return /ngrok|trycloudflare\.com|localhost\.run/i.test(url);
}

function wrapRagNetworkFailure(err, baseUrl) {
  const name = err?.name;
  const msg = String(err?.message || err || "");
  if (
    name === "TypeError" ||
    msg.includes("NetworkError") ||
    msg.includes("Failed to fetch") ||
    msg.includes("Load failed")
  ) {
    return new Error(
      "No se pudo conectar con el servidor RAG. Revisá: " +
        "1) Colab sigue abierto y la última celda (ngrok + servidor) corrió sin error; " +
        "2) en .env, VITE_ACADEMIC_RAG_URL es exactamente la URL que imprime Colab (https://… sin comillas ni espacios); " +
        "3) después de cambiar .env reiniciá `npm run dev`; " +
        "4) probá en el navegador: " +
        baseUrl +
        "/health — si no carga, el túnel ya no existe (volvé a ejecutar la celda ngrok y actualizá .env)."
    );
  }
  return err;
}

export function getAcademicRagBaseUrl() {
  const raw = import.meta.env.VITE_ACADEMIC_RAG_URL;
  const normalized = normalizeRagUrl(raw);
  if (normalized) {
    return normalized;
  }
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_RAG_PROXY_LOCAL === "true"
  ) {
    return "/academic-rag";
  }
  return "";
}

/**
 * @returns {Promise<{ reply: string, error?: string } | null>}
 *          null si no hay URL base (modo solo frontend).
 */
export async function queryAcademicRag(message, options = {}) {
  const base = getAcademicRagBaseUrl();
  if (!base) return null;

  const timeoutMs = options.timeoutMs ?? 180000;
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), timeoutMs);

  const headers = {
    "Content-Type": "application/json",
  };
  if (isNgrokLikeUrl(base)) {
    headers["ngrok-skip-browser-warning"] = "true";
  }

  try {
    const res = await fetch(`${base}/v1/chat`, {
      method: "POST",
      mode: "cors",
      headers,
      body: JSON.stringify({ message }),
      signal: ctrl.signal,
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(
        "El RAG no devolvió JSON (¿página intermedia de ngrok?). Revisá la URL y los headers."
      );
    }
    if (!res.ok) {
      throw new Error(data.error || `RAG HTTP ${res.status}`);
    }
    return data;
  } catch (e) {
    if (e.name === "AbortError") {
      throw new Error(
        `Tiempo de espera agotado (${timeoutMs / 1000}s). El Colab puede estar lento o colgado en preprocess_query / Gemini.`
      );
    }
    throw wrapRagNetworkFailure(e, base);
  } finally {
    clearTimeout(tid);
  }
}

/**
 * Sube archivos al mismo host del RAG (Colab/ngrok o proxy local).
 * El servidor guarda en `data/` y ejecuta `get_or_create_index` (puede tardar).
 *
 * @param {File[]} files
 * @param {{ tema?: string }} options - categoría sugerida RF5 (valida Gemini en Colab)
 * @returns {Promise<{ ok: boolean, saved?: string[], tema?: string, error?: string }>}
 */
export async function uploadDocumentsToRag(files, options = {}) {
  const base = getAcademicRagBaseUrl();
  if (!base) {
    throw new Error(
      "Falta VITE_ACADEMIC_RAG_URL (o activá VITE_RAG_PROXY_LOCAL con la API en :8000)."
    );
  }
  if (!files?.length) {
    throw new Error("Seleccioná al menos un archivo.");
  }

  const formData = new FormData();
  for (const f of files) {
    formData.append("files", f);
  }
  formData.append("tema", options.tema || "Material de estudio");

  const headers = {};
  if (isNgrokLikeUrl(base)) {
    headers["ngrok-skip-browser-warning"] = "true";
  }

  let res;
  try {
    res = await fetch(`${base}/v1/documents`, {
      method: "POST",
      mode: "cors",
      body: formData,
      headers,
    });
  } catch (e) {
    throw wrapRagNetworkFailure(e, base);
  }

  let data = {};
  try {
    data = await res.json();
  } catch {
    throw new Error(
      "El servidor no devolvió JSON (¿URL de ngrok caída o HTML intermedio?)."
    );
  }

  if (!res.ok) {
    throw new Error(data.error || `RAG HTTP ${res.status}`);
  }
  if (!data.ok) {
    throw new Error(data.error || "La subida no se completó");
  }
  return data;
}
