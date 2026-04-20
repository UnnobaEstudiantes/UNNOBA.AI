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

5. Iniciar servidor de desarrollo:

```bash
npm run dev
```

El proyecto suele abrirse en **http://localhost:5173**. Si ese puerto está en uso, Vite elige **5174**, **5175**, etc.; es normal. Para liberar 5173: cerrá otras pestañas de `npm run dev` o buscá el proceso con `ss -tlnp | grep 5173`.
