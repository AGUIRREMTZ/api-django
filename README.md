# NSL-KDD Dataset Explorer

Aplicación full-stack para explorar y analizar el dataset NSL-KDD de detección de intrusiones en redes.

## 🏗️ Arquitectura

- **Frontend**: Next.js 16 + React 19 + Tailwind CSS (desplegado en Vercel)
- **Backend**: Django + Django REST Framework (desplegado en Render)
- **Dataset**: NSL-KDD (125,973 registros, 42 columnas)

## ✨ Características

### Frontend (Next.js)
- Dashboard interactivo con visualizaciones
- Explorador de columnas con descripciones detalladas
- Gráficos de distribución de protocolos y clases
- Panel de tipos de ataques con ejemplos
- Tabla de datos de ejemplo
- Diseño responsive y modo oscuro

### Backend (Django API)
- API REST con 7 endpoints
- Información detallada del dataset
- Estadísticas y análisis
- Clasificación de tipos de ataque
- Sin base de datos externa requerida

## 🚀 Instalación y Desarrollo

### Backend (Django)

\`\`\`bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Iniciar servidor
python manage.py runserver
\`\`\`

El backend estará disponible en `http://localhost:8000/api/`

### Frontend (Next.js)

\`\`\`bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local y configurar NEXT_PUBLIC_API_URL

# Iniciar servidor de desarrollo
npm run dev
\`\`\`

El frontend estará disponible en `http://localhost:3000`

## 📦 Despliegue

### Backend en Render

1. Sube el código a GitHub
2. Crea un nuevo **Web Service** en [Render](https://render.com)
3. Conecta tu repositorio
4. Render detectará automáticamente `render.yaml`
5. Configura las variables de entorno:
   - `SECRET_KEY`: (genera una clave secreta)
   - `DEBUG`: `False`
6. Despliega

### Frontend en Vercel

1. Sube el código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura la variable de entorno:
   - `NEXT_PUBLIC_API_URL`: URL de tu API en Render (ej: `https://tu-app.onrender.com`)
4. Despliega

## 🔗 Endpoints de la API

- `GET /api/` - Descripción general de la API
- `GET /api/dataset-info/` - Información del dataset
- `GET /api/columns/` - Todas las columnas
- `GET /api/columns/<category>/` - Columnas por categoría
- `GET /api/statistics/` - Estadísticas del dataset
- `GET /api/attack-types/` - Tipos de ataques
- `GET /api/sample-data/` - Datos de ejemplo

## 📊 Sobre el Dataset NSL-KDD

El dataset NSL-KDD es una versión mejorada del KDD Cup 1999, utilizado para:
- Detección de intrusiones en redes
- Clasificación de tráfico normal vs anómalo
- Entrenamiento de modelos de Machine Learning en ciberseguridad

**Características:**
- 125,973 registros de conexiones de red
- 42 columnas con características de las conexiones
- 5 categorías: Normal, DoS, Probe, R2L, U2R
- Clasificación binaria: normal vs anomaly

## 🛠️ Tecnologías

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Recharts (visualizaciones)
- shadcn/ui (componentes)

### Backend
- Django 5.0
- Django REST Framework
- CORS Headers
- WhiteNoise (archivos estáticos)
- Gunicorn (servidor WSGI)

## 📝 Notas

- No requiere IP estática
- No usa modo standalone
- Compatible con despliegue serverless
- CORS configurado para Vercel
- Base de datos SQLite incluida (puede usar PostgreSQL)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
