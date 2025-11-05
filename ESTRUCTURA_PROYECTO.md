# Estructura del Proyecto - NSL-KDD Dataset Explorer

Este documento explica la organización del código y la arquitectura de la aplicación.

## 📁 Estructura de Directorios

\`\`\`
nsl-kdd-explorer/
├── backend/                      # Backend Django
│   ├── api/                      # Aplicación principal de la API
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py            # Sin modelos (datos estáticos)
│   │   ├── views.py             # Vistas de la API con lógica de negocio
│   │   └── urls.py              # Rutas de la API
│   ├── config/                   # Configuración de Django
│   │   ├── __init__.py
│   │   ├── settings.py          # Configuración principal
│   │   ├── urls.py              # URLs principales
│   │   └── wsgi.py              # Configuración WSGI para Render
│   ├── manage.py                # Script de gestión de Django
│   ├── requirements.txt         # Dependencias de Python
│   ├── render.yaml              # Configuración para Render
│   ├── README.md                # Documentación del backend
│   └── .gitignore               # Archivos ignorados por Git
│
├── app/                          # Frontend Next.js (App Router)
│   ├── layout.tsx               # Layout principal con metadata
│   ├── page.tsx                 # Página principal del dashboard
│   └── globals.css              # Estilos globales con Tailwind
│
├── components/                   # Componentes React
│   ├── ui/                      # Componentes base de shadcn/ui
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   ├── dataset-overview.tsx     # Información general del dataset
│   ├── statistics-panel.tsx     # Gráficos y estadísticas
│   ├── attack-types-panel.tsx   # Panel de tipos de ataques
│   ├── columns-explorer.tsx     # Explorador de columnas
│   └── sample-data-table.tsx    # Tabla de datos de ejemplo
│
├── lib/                          # Utilidades
│   └── utils.ts                 # Funciones auxiliares (cn, etc.)
│
├── hooks/                        # Custom hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── .env.local.example           # Ejemplo de variables de entorno
├── vercel.json                  # Configuración de Vercel
├── next.config.mjs              # Configuración de Next.js
├── package.json                 # Dependencias de Node.js
├── tsconfig.json                # Configuración de TypeScript
├── README.md                    # Documentación principal
├── DEPLOYMENT.md                # Guía de despliegue
└── ESTRUCTURA_PROYECTO.md       # Este archivo
\`\`\`

## 🔧 Backend (Django)

### Arquitectura

El backend es una API REST sin base de datos que sirve información estática sobre el dataset NSL-KDD.

#### `api/views.py`

Contiene todas las vistas de la API:

- **`api_overview()`**: Endpoint raíz que describe la API
- **`dataset_info()`**: Información general del dataset
- **`get_columns()`**: Descripción de columnas (todas o por categoría)
- **`get_statistics()`**: Estadísticas y distribuciones
- **`get_attack_types()`**: Tipos de ataques con descripciones
- **`get_sample_data()`**: Datos de ejemplo del dataset

#### Datos Estáticos

Los datos están definidos como constantes en `views.py`:

- **`DATASET_COLUMNS`**: Diccionario con todas las columnas organizadas por categoría
- **`ATTACK_TYPES`**: Clasificación de tipos de ataques
- **`DATASET_STATISTICS`**: Estadísticas del dataset

### Configuración

#### `config/settings.py`

Configuración principal:
- **CORS**: Configurado para aceptar peticiones desde Vercel
- **WhiteNoise**: Para servir archivos estáticos
- **Database**: SQLite por defecto, PostgreSQL si `DATABASE_URL` está configurada
- **REST Framework**: Paginación y renderizado JSON

#### `render.yaml`

Configuración para despliegue automático en Render:
- Build command con instalación de dependencias y migraciones
- Start command con Gunicorn
- Variables de entorno automáticas

## 🎨 Frontend (Next.js)

### Arquitectura

El frontend es una aplicación Next.js 16 con App Router que consume la API de Django.

#### Componentes Principales

##### 1. `app/page.tsx`
Página principal que orquesta todos los componentes del dashboard.

##### 2. `components/dataset-overview.tsx`
- Muestra información general del dataset
- Grid con estadísticas clave
- Lista de casos de uso
- Fetch de `/api/dataset-info/`

##### 3. `components/statistics-panel.tsx`
- Gráficos de distribución (Pie Chart, Bar Chart)
- Top 5 servicios con barras de progreso
- Insights clave del dataset
- Usa Recharts para visualizaciones
- Fetch de `/api/statistics/`

##### 4. `components/attack-types-panel.tsx`
- Grid de tarjetas con tipos de ataques
- Cada tarjeta muestra descripción y ejemplos
- Colores diferenciados por categoría
- Fetch de `/api/attack-types/`

##### 5. `components/columns-explorer.tsx`
- Tabs para navegar entre categorías de columnas
- Cada columna muestra: nombre, tipo, descripción
- Badges para tipos de datos
- Notas especiales para columnas importantes
- Fetch de `/api/columns/`

##### 6. `components/sample-data-table.tsx`
- Tabla responsive con datos de ejemplo
- Badges para clasificación (normal/anomaly)
- Formato de números y datos
- Fetch de `/api/sample-data/`

### Patrón de Componentes

Todos los componentes siguen el mismo patrón:

\`\`\`tsx
'use client'  // Client component para usar hooks

import { useEffect, useState } from 'react'

export function Component() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/api/endpoint/\`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />
  if (!data) return null

  return <ComponentUI data={data} />
}
\`\`\`

### Estilos

#### `app/globals.css`

- Tailwind CSS v4 con configuración inline
- Design tokens para colores (light/dark mode)
- Variables CSS para temas
- Fuentes: Geist Sans y Geist Mono

#### Paleta de Colores

- **Azul** (`#3b82f6`): Elementos principales, gráficos
- **Verde** (`#10b981`): Datos normales, éxito
- **Rojo** (`#ef4444`): Anomalías, ataques
- **Púrpura** (`#8b5cf6`): Categorías, tipos
- **Naranja** (`#f59e0b`): Advertencias, highlights
- **Slate**: Fondos, textos, bordes

## 🔄 Flujo de Datos

\`\`\`
Usuario → Frontend (Next.js) → API (Django) → Datos Estáticos → JSON Response
                ↓
         Renderizado en UI
\`\`\`

### Ejemplo de Flujo

1. Usuario abre la aplicación en Vercel
2. `app/page.tsx` renderiza todos los componentes
3. Cada componente hace fetch a su endpoint correspondiente
4. Django procesa la petición y devuelve JSON
5. Componente actualiza su estado con los datos
6. React renderiza la UI con los datos

## 🌐 Variables de Entorno

### Backend (Render)

\`\`\`env
SECRET_KEY=clave-secreta-generada
DEBUG=False
PYTHON_VERSION=3.11.0
DATABASE_URL=postgresql://... (opcional)
\`\`\`

### Frontend (Vercel)

\`\`\`env
NEXT_PUBLIC_API_URL=https://tu-app.onrender.com
\`\`\`

## 📦 Dependencias

### Backend

- **Django 5.0**: Framework web
- **djangorestframework**: API REST
- **django-cors-headers**: CORS
- **whitenoise**: Archivos estáticos
- **gunicorn**: Servidor WSGI
- **dj-database-url**: Configuración de DB
- **psycopg2-binary**: Driver PostgreSQL

### Frontend

- **Next.js 16**: Framework React
- **React 19**: Biblioteca UI
- **TypeScript**: Tipado estático
- **Tailwind CSS v4**: Estilos
- **Recharts**: Gráficos
- **shadcn/ui**: Componentes
- **Lucide React**: Iconos

## 🔒 Seguridad

### Backend

- `SECRET_KEY` generada automáticamente en Render
- `DEBUG=False` en producción
- CORS configurado para dominios específicos
- WhiteNoise para servir archivos estáticos de forma segura

### Frontend

- Variables de entorno con prefijo `NEXT_PUBLIC_` para el cliente
- Sin secretos en el código del cliente
- HTTPS automático en Vercel

## 🚀 Optimizaciones

### Backend

- Sin base de datos = respuestas instantáneas
- Datos estáticos en memoria
- Gunicorn con múltiples workers
- WhiteNoise con compresión

### Frontend

- Server Components donde es posible
- Client Components solo cuando necesario
- Lazy loading de componentes
- Optimización automática de Next.js
- CDN global de Vercel

## 📊 Escalabilidad

### Backend

Para escalar el backend:
1. Agregar PostgreSQL para datos dinámicos
2. Implementar caché con Redis
3. Aumentar workers de Gunicorn
4. Usar plan pagado de Render

### Frontend

Vercel escala automáticamente:
- CDN global
- Edge Functions
- Serverless Functions
- Sin límite de tráfico en planes pagados

## 🧪 Testing

### Backend

\`\`\`bash
cd backend
python manage.py test
\`\`\`

### Frontend

\`\`\`bash
npm run test
\`\`\`

## 📝 Convenciones de Código

### Backend (Python)

- PEP 8 para estilo de código
- Snake_case para variables y funciones
- Docstrings para todas las funciones
- Type hints donde sea posible

### Frontend (TypeScript)

- ESLint + Prettier para formato
- camelCase para variables y funciones
- PascalCase para componentes
- Interfaces para tipos de datos
- Comentarios JSDoc para funciones complejas

## 🔗 Referencias

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)

---

Esta estructura está diseñada para ser mantenible, escalable y fácil de entender. Cada componente tiene una responsabilidad clara y el flujo de datos es predecible.
\`\`\`
