# Guía de Despliegue - NSL-KDD Dataset Explorer

Esta guía te ayudará a desplegar la aplicación completa en Render (backend) y Vercel (frontend) sin necesidad de IP estática ni modo standalone.

## 📋 Requisitos Previos

- Cuenta en [GitHub](https://github.com)
- Cuenta en [Render](https://render.com) (gratis)
- Cuenta en [Vercel](https://vercel.com) (gratis)
- Código subido a un repositorio de GitHub

## 🔧 Parte 1: Desplegar Backend en Render

### Opción A: Despliegue Automático con render.yaml (Recomendado)

1. **Sube tu código a GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   \`\`\`

2. **Conecta con Render**
   - Ve a [Render Dashboard](https://dashboard.render.com)
   - Click en "New +" → "Blueprint"
   - Conecta tu repositorio de GitHub
   - Render detectará automáticamente el archivo `backend/render.yaml`
   - Click en "Apply"

3. **Configuración Automática**
   - Render creará el servicio web automáticamente
   - Generará una `SECRET_KEY` segura
   - Configurará las variables de entorno necesarias

4. **Obtén la URL de tu API**
   - Una vez desplegado, copia la URL (ej: `https://nsl-kdd-api.onrender.com`)
   - La necesitarás para el frontend

### Opción B: Despliegue Manual

1. **Crea un Web Service**
   - Ve a [Render Dashboard](https://dashboard.render.com)
   - Click en "New +" → "Web Service"
   - Conecta tu repositorio de GitHub

2. **Configura el Servicio**
   - **Name**: `nsl-kdd-api` (o el nombre que prefieras)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**:
     \`\`\`bash
     pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
     \`\`\`
   - **Start Command**:
     \`\`\`bash
     gunicorn config.wsgi:application
     \`\`\`

3. **Variables de Entorno**
   - Click en "Environment" en el panel izquierdo
   - Agrega las siguientes variables:
     - `SECRET_KEY`: Genera una clave secreta (puedes usar [este generador](https://djecrety.ir/))
     - `DEBUG`: `False`
     - `PYTHON_VERSION`: `3.11.0`

4. **Despliega**
   - Click en "Create Web Service"
   - Espera a que el despliegue termine (5-10 minutos)
   - Copia la URL de tu API

### Verificar el Backend

Una vez desplegado, verifica que funciona:
\`\`\`bash
curl https://tu-app.onrender.com/api/
\`\`\`

Deberías recibir una respuesta JSON con la descripción de la API.

## 🌐 Parte 2: Desplegar Frontend en Vercel

### Método 1: Desde la Interfaz Web (Más Fácil)

1. **Importa el Proyecto**
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Click en "Add New..." → "Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

2. **Configura Variables de Entorno**
   - En la sección "Environment Variables", agrega:
     - **Key**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://tu-app.onrender.com` (la URL de tu backend en Render)
     - Aplica a: Production, Preview, Development

3. **Configura el Proyecto**
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Root Directory**: `./` (raíz del proyecto)
   - **Build Command**: `npm run build` (por defecto)
   - **Output Directory**: `.next` (por defecto)

4. **Despliega**
   - Click en "Deploy"
   - Espera a que el despliegue termine (2-3 minutos)
   - Vercel te dará una URL (ej: `https://tu-proyecto.vercel.app`)

### Método 2: Desde la CLI de Vercel

1. **Instala Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login en Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Configura Variables de Entorno**
   Crea un archivo `.env.production`:
   \`\`\`env
   NEXT_PUBLIC_API_URL=https://tu-app.onrender.com
   \`\`\`

4. **Despliega**
   \`\`\`bash
   vercel --prod
   \`\`\`

5. **Agrega Variables de Entorno en Vercel**
   \`\`\`bash
   vercel env add NEXT_PUBLIC_API_URL production
   # Pega la URL de tu backend cuando te lo pida
   \`\`\`

### Verificar el Frontend

Abre la URL de Vercel en tu navegador y verifica que:
- El dashboard carga correctamente
- Los datos se muestran (esto confirma la conexión con el backend)
- Las gráficas se renderizan
- No hay errores en la consola del navegador

## 🔄 Actualizaciones Automáticas

### Backend (Render)
- Cada vez que hagas push a la rama `main` en GitHub, Render desplegará automáticamente
- Puedes configurar ramas específicas en la configuración del servicio

### Frontend (Vercel)
- Cada vez que hagas push a cualquier rama, Vercel creará un preview deployment
- Los push a `main` se despliegan automáticamente a producción
- Puedes ver todos los deployments en el dashboard de Vercel

## 🐛 Solución de Problemas

### Backend no responde

1. **Verifica los logs en Render**
   - Ve a tu servicio en Render
   - Click en "Logs" en el panel izquierdo
   - Busca errores

2. **Problemas comunes**:
   - `SECRET_KEY` no configurada → Agrega la variable de entorno
   - Error de migración → Verifica que el build command incluya `migrate`
   - Error 502/503 → El servicio puede estar iniciando (espera 1-2 minutos)

### Frontend no conecta con Backend

1. **Verifica CORS**
   - El backend debe tener configurado CORS para aceptar peticiones desde Vercel
   - En `backend/config/settings.py`, verifica que `CORS_ALLOW_ALL_ORIGINS = True` en producción

2. **Verifica la URL de la API**
   - En Vercel, ve a Settings → Environment Variables
   - Verifica que `NEXT_PUBLIC_API_URL` tenga la URL correcta de Render
   - Debe ser `https://tu-app.onrender.com` (sin `/api/` al final)

3. **Redespliega el Frontend**
   - Después de cambiar variables de entorno, redespliega:
   - En Vercel: Deployments → Click en los tres puntos → Redeploy

### Error de CORS

Si ves errores de CORS en la consola del navegador:

1. **Agrega tu dominio de Vercel al backend**
   Edita `backend/config/settings.py`:
   \`\`\`python
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:3000",
       "https://tu-proyecto.vercel.app",  # Agrega tu dominio
   ]
   \`\`\`

2. **O permite todos los orígenes en producción** (ya configurado):
   \`\`\`python
   if not DEBUG:
       CORS_ALLOW_ALL_ORIGINS = True
   \`\`\`

## 📊 Monitoreo

### Backend (Render)
- **Logs**: Render Dashboard → Tu servicio → Logs
- **Métricas**: Render Dashboard → Tu servicio → Metrics
- **Health Check**: Render hace ping automático cada 5 minutos

### Frontend (Vercel)
- **Analytics**: Vercel Dashboard → Tu proyecto → Analytics
- **Logs**: Vercel Dashboard → Tu proyecto → Deployments → Click en deployment → Logs
- **Performance**: Vercel proporciona métricas de Web Vitals automáticamente

## 💰 Costos

### Render (Plan Gratuito)
- ✅ 750 horas/mes de servicio web
- ✅ Despliegues ilimitados
- ⚠️ El servicio se duerme después de 15 minutos de inactividad
- ⚠️ Primera petición después de dormir tarda ~30 segundos

### Vercel (Plan Hobby - Gratuito)
- ✅ Despliegues ilimitados
- ✅ 100 GB de ancho de banda/mes
- ✅ Dominios personalizados
- ✅ SSL automático

## 🚀 Mejoras Opcionales

### 1. Dominio Personalizado

**En Vercel:**
- Settings → Domains → Add Domain
- Sigue las instrucciones para configurar DNS

**En Render:**
- Settings → Custom Domain → Add Custom Domain
- Configura el CNAME en tu proveedor de DNS

### 2. Base de Datos PostgreSQL en Render

Si quieres usar PostgreSQL en lugar de SQLite:

1. Crea una base de datos PostgreSQL en Render
2. Copia la URL de conexión
3. Agrégala como variable de entorno `DATABASE_URL` en tu servicio web
4. El código ya está configurado para usar PostgreSQL automáticamente

### 3. Monitoreo Avanzado

- **Sentry**: Para tracking de errores
- **LogRocket**: Para sesiones de usuario
- **Vercel Analytics**: Ya incluido en el plan gratuito

## ✅ Checklist de Despliegue

### Backend
- [ ] Código subido a GitHub
- [ ] Servicio creado en Render
- [ ] Variables de entorno configuradas
- [ ] Despliegue exitoso
- [ ] API responde en `/api/`
- [ ] CORS configurado

### Frontend
- [ ] Proyecto importado en Vercel
- [ ] `NEXT_PUBLIC_API_URL` configurada
- [ ] Despliegue exitoso
- [ ] Dashboard carga correctamente
- [ ] Datos se muestran desde la API
- [ ] Sin errores en consola

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render y Vercel
2. Verifica las variables de entorno
3. Consulta la documentación oficial:
   - [Render Docs](https://render.com/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [Django Deployment](https://docs.djangoproject.com/en/5.0/howto/deployment/)
   - [Next.js Deployment](https://nextjs.org/docs/deployment)

---

¡Listo! Tu aplicación NSL-KDD Dataset Explorer está desplegada y lista para usar. 🎉
\`\`\`
