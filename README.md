# UNNOBA.AI

UNNOBA.AI es un chatbot institucional desarrollado con **React.js**, **Tailwind CSS** y **Vite**.

## Requisitos previos

- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

## Cómo iniciar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/FeliLucero1/IA-unnoba.git
cd IA-unnoba
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

5. Iniciar servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en http://localhost:5173
