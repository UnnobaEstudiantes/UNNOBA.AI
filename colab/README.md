# Conectar el notebook del asistente RAG con el frontend

## Notebook “todo en uno” (recomendado)

Usá **`colab/Asistente_RAG_API_Listo.ipynb`**: incluye el código RAG del asistente, `main()` **sin** `input()` (no se congela), la API FastAPI y la celda de ngrok+uvicorn. Subilo a Google Colab y ejecutá las celdas **en orden** de arriba abajo.

En Colab → **Secretos** (llave): configurá el mismo nombre de API key de Gemini que usa el notebook (p. ej. `gemini_si`) y `NGROK_TOKEN` para ngrok.

---

## Flujo manual (si seguís el notebook viejo)

El archivo `academic_rag_api_colab.py` **no se ejecuta solo**: asume que ya corriste en Colab el código de `Copy_of_Asistente_academico_correcciones.ipynb` (mismo kernel), de modo que existan `index`, `llm`, `embed_model`, `preprocess_query`, etc.

## Pasos en Google Colab

1. Abrí el notebook y ejecutá las celdas de dependencias y la celda grande de código del RAG (carga de índice, funciones, `main` definido).
2. **No ejecutes** el bloque `if __name__ == "__main__": main()` si eso abre `run_query_loop` con `input()` (bloquea la celda). Comentá esa llamada o no ejecutes esa celda.
3. Asegurate de tener el índice creado. Podés replicar lo esencial de `main()` sin el bucle interactivo, por ejemplo:
   - Obtener la API key (`userdata.get('gemini_si')` según tu notebook).
   - Crear `llm`, `embed_model`, `Settings`, y ejecutar `index = get_or_create_index(llm, embed_model)` hasta que `index` no sea `None`.
4. Instalá el servidor HTTP y el túnel:
   ```python
   !pip install -q fastapi uvicorn pyngrok pydantic
   ```
5. Copiá el contenido de `academic_rag_api_colab.py` en una **nueva celda** y al final ejecutá:
   ```python
   from pyngrok import ngrok
   ngrok.set_auth_token("TU_TOKEN")  # https://dashboard.ngrok.com
   app = build_app()
   tunnel = ngrok.connect(8000)
   print("API:", tunnel.public_url)
   import uvicorn
   uvicorn.run(app, host="0.0.0.0", port=8000)
   ```
6. Copiá la URL pública (termina en `ngrok-free.app` o similar) y en el proyecto React creá `.env`:
   ```env
   VITE_ACADEMIC_RAG_URL=https://xxxx.ngrok-free.app
   ```
7. Reiniciá `npm run dev`. Las consultas que vayan al flujo `generateResponse` intentarán primero este endpoint; si falla o no hay URL, sigue la lógica local del chat.

## Endpoints

- `GET /health` — comprobación rápida.
- `POST /v1/chat` — cuerpo JSON `{ "message": "..." }`, respuesta `{ "reply": "..." }` o `{ "error": "..." }`.

La sesión de Colab y el túnel ngrok **caducan** al cerrar el runtime; tendrás que repetir el paso 5 y actualizar `.env` con la nueva URL.

### Error `asyncio.run() cannot be called from a running event loop`

En Colab/Jupyter ya hay un *event loop* activo. No uses `uvicorn.run()` en la celda principal: el notebook **`Asistente_RAG_API_Listo.ipynb`** ya arranca uvicorn en un **hilo en segundo plano** (`threading`).
