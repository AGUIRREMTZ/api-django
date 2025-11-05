# NSL-KDD Dataset API - Backend Django

API REST para explorar y analizar el dataset NSL-KDD de detección de intrusiones en redes.

## 🚀 Características

- **Información del Dataset**: Descripción completa del dataset NSL-KDD
- **Columnas Detalladas**: Explicación de cada columna y su significado
- **Estadísticas**: Distribución de protocolos, servicios y tipos de ataque
- **Tipos de Ataque**: Clasificación y descripción de ataques de red
- **Datos de Ejemplo**: Muestras representativas del dataset

## 📋 Endpoints Disponibles

- `GET /api/` - Descripción general de la API
- `GET /api/dataset-info/` - Información del dataset
- `GET /api/columns/` - Todas las columnas con descripciones
- `GET /api/columns/<category>/` - Columnas por categoría
- `GET /api/statistics/` - Estadísticas del dataset
- `GET /api/attack-types/` - Tipos de ataques
- `GET /api/sample-data/` - Datos de ejemplo

## 🛠️ Instalación Local

\`\`\`bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Recolectar archivos estáticos
python manage.py collectstatic --noinput

# Iniciar servidor de desarrollo
python manage.py runserver
\`\`\`

La API estará disponible en `http://localhost:8000/api/`

## 🌐 Despliegue en Render

### Opción 1: Usando render.yaml (Recomendado)

1. Sube tu código a GitHub
2. Conecta tu repositorio en [Render](https://render.com)
3. Render detectará automáticamente el archivo `render.yaml`
4. El servicio se desplegará automáticamente

### Opción 2: Configuración Manual

1. Crea un nuevo **Web Service** en Render
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - **Start Command**: `gunicorn config.wsgi:application`
   - **Environment**: Python 3
4. Agrega las variables de entorno:
   - `SECRET_KEY`: (genera una clave secreta)
   - `DEBUG`: `False`
   - `PYTHON_VERSION`: `3.11.0`

## 🔒 Variables de Entorno

\`\`\`env
SECRET_KEY=tu-clave-secreta-aqui
DEBUG=False
ALLOWED_HOSTS=.onrender.com,.vercel.app
DATABASE_URL=postgresql://... (opcional, usa SQLite por defecto)
\`\`\`

## 📊 Estructura del Dataset

El dataset NSL-KDD contiene:
- **125,973 registros** de conexiones de red
- **42 columnas** con características de las conexiones
- **Clasificación binaria**: normal vs anomaly
- **4 categorías de ataques**: DoS, Probe, R2L, U2R

## 🔗 CORS

La API está configurada para aceptar peticiones desde:
- `localhost:3000` (desarrollo)
- Dominios de Vercel (producción)

## 📝 Notas

- No requiere IP estática
- No usa modo standalone
- Compatible con despliegue serverless
- Base de datos SQLite incluida (puede usar PostgreSQL en Render)
