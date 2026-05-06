# UNNOBA.AI

UNNOBA.AI es un chatbot institucional desarrollado con **React.js**, **Tailwind CSS** y **Vite**.

## Requisitos previos

- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

## Cómo iniciar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/felijlucero/UNNOBA.AI.git
cd UNNOBA.AI
```

2. Instalar npm:

```bash
sudo apt install npm
```

3. Instalar dependencias:

```bash
npm install
```

4. API Key de Gemini (no commitear la clave)

Creá un archivo `.env` en la raíz del proyecto (está en `.gitignore`) con:

```bash
VITE_GEMINI_API_KEY=tu_clave_de_google_ai_studio
```

Obtené la clave en [Google AI Studio](https://aistudio.google.com/app/apikey). Sin esta variable, las partes del chat que usan el modelo no funcionarán.

**Asistente RAG (Colab + ngrok):** el front en `http://localhost:5173` **no** habla con Colab solo: tenés que poner en `.env` la URL pública que imprime el notebook (ngrok), por ejemplo:

```bash
VITE_ACADEMIC_RAG_URL=https://xxxx.ngrok-free.app
```

Si esa URL da “offline” en el navegador, la sesión de Colab se cortó o el servidor dejó de correr: volvé a ejecutar las celdas del API + ngrok y **actualizá** `.env` con la URL nueva.

**API del RAG solo en tu máquina (puerto 8000):** en `.env` agregá `VITE_RAG_PROXY_LOCAL=true` para que Vite reenvíe `/academic-rag` → `http://127.0.0.1:8000`. Si no tenés nada escuchando en 8000, no actives esto (evita el error `ECONNREFUSED`).

Con esta variable, cada mensaje intenta primero el RAG; si no hay URL o falla la petición, el chat sigue con la lógica local (Gemini y reglas del proyecto).

**Cargar solo desde el front (sin arrastrar archivos en Colab):**

1. En Colab: ejecutá el notebook hasta la **última celda** (API + ngrok) y copiá la URL que imprime.
2. En `.env`: `VITE_ACADEMIC_RAG_URL=https://….ngrok-free.app` (sin comillas) y `VITE_ENABLE_ADMIN=true` + `VITE_ADMIN_KEY=…` para el botón *Cargar material*.
3. Reiniciá `npm run dev`, abrí el chat, *Cargar material* → clave → *Cargar documentos*, elegí PDF/DOCX/etc., categoría y **Subir e indexar**. Los archivos van a `POST /v1/documents` en el mismo host que el chat; Colab los escribe en `data/` y reindexa (puede tardar). Mantené Colab abierto.

El notebook tiene que incluir el endpoint `POST /v1/documents` (ver `colab/README.md`).

**Coherencia con la bitácora (Fase 1, RF1–RF7):** la carga, fragmentación, embeddings, FAISS, validación temática, recuperación y generación viven en el **pipeline RAG (p. ej. Colab + `storage/`)** descrito en la bitácora. El **front React** es la interfaz de **consulta en lenguaje natural** (RF6–RF7 en uso) y, si activás el admin, un **panel de carga** acotado. El **diseño de la bitácora** (panel a la derecha, FAQ, aportes con etiqueta sugerida) es la **especificación**; la UI actual se centra en el chat y el panel de documentos bajo *Cargar material*.

**Roles (bitácora vs. este repo):** la bitácora prevé que quien sube un archivo puede sugerir la **categoría temática** y el LLM la **valida** (RF5); eso aplica al **módulo de indexación en Python**, no a “cuentas de alumno” en el navegador. En el **front**, el *login* solo **habilita la pantalla de carga** para quien despliega o mantiene el material (un operador, docente o equipo con la clave del `.env`); **los alumnos** usan el chat **sin inicio de sesión**. Para un enlace compartido con toda la cursada, podés compilar con `VITE_ENABLE_ADMIN=false` y dejar el modo carga en otro entorno, o aceptar el botón *Cargar material* a la vista (la mayoría no lo usa).

**Carga de material (TPI, opcional, prototipo):** en el encabezado aparece *Cargar material*: un solo campo **clave** (no hace falta usuario). Quien arme el `.env` pone la clave; el docente solo la ingresa. Opcional: `VITE_ADMIN_LABEL=Profesor` para mostrar un texto corto al lado cuando hay sesión (por defecto *Carga*). Reiniciá Vite. Es solo para el TPI; no reemplaza autenticación en servidor.

```bash
VITE_ENABLE_ADMIN=true
VITE_ADMIN_KEY=la_clave_que_compartis_con_el_docente
# opcional: VITE_ADMIN_LABEL=Profesor
```

5. Iniciar servidor de desarrollo:

```bash
npm run dev
```

El proyecto suele abrirse en **http://localhost:5173**. Si ese puerto está en uso, Vite elige **5174**, **5175**, etc.; es normal. Para liberar 5173: cerrá otras pestañas de `npm run dev` o buscá el proceso con `ss -tlnp | grep 5173`.
