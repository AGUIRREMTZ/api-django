# 🚀 Guía Rápida de Despliegue

Esta es una guía simplificada para desplegar tu aplicación NSL-KDD Dataset Explorer en la web.

## 📝 Resumen en 3 Pasos

### 1️⃣ Sube tu código a GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
\`\`\`

### 2️⃣ Despliega el Backend en Render
1. Ve a [render.com](https://render.com) y crea una cuenta
2. Click en "New +" → "Blueprint"
3. Conecta tu repositorio de GitHub
4. Click en "Apply"
5. **Copia la URL de tu API** (ej: `https://nsl-kdd-api.onrender.com`)

### 3️⃣ Despliega el Frontend en Vercel
1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Click en "Add New..." → "Project"
3. Importa tu repositorio de GitHub
4. Agrega variable de entorno:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://tu-app.onrender.com` (la URL de Render)
5. Click en "Deploy"

## ✅ ¡Listo!

Tu aplicación estará disponible en una URL como `https://tu-proyecto.vercel.app`

## 🔗 Recursos Útiles

- **Guía Detallada**: Lee `DEPLOYMENT.md` para instrucciones completas
- **Guía Visual en la Web**: Visita `/guia` en tu aplicación desplegada
- **Estructura del Proyecto**: Lee `ESTRUCTURA_PROYECTO.md`
- **Información del Dataset**: Lee `DATASET_INFO.md`

## 🆘 Problemas Comunes

### El frontend no muestra datos
- Verifica que `NEXT_PUBLIC_API_URL` en Vercel tenga la URL correcta de Render
- Asegúrate de que la URL NO termine en `/api/`
- Ejemplo correcto: `https://nsl-kdd-api.onrender.com`
- Ejemplo incorrecto: `https://nsl-kdd-api.onrender.com/api/`

### El backend tarda en responder
- En el plan gratuito de Render, el servicio se "duerme" después de 15 minutos
- La primera petición puede tardar 30-60 segundos
- Esto es normal y las siguientes peticiones serán rápidas

### Error 404 en el backend
- Verifica que el backend esté desplegado correctamente en Render
- Visita `https://tu-app.onrender.com/api/` en tu navegador
- Deberías ver un JSON con la descripción de la API

## 💰 Costos

Ambos servicios tienen planes gratuitos generosos:

- **Render**: 750 horas/mes gratis
- **Vercel**: Despliegues ilimitados + 100 GB de ancho de banda/mes

## 🎉 Próximos Pasos

Una vez desplegado:
1. Comparte tu URL con otros
2. Cada push a GitHub actualizará automáticamente tu aplicación
3. Puedes agregar un dominio personalizado en Vercel
4. Monitorea tu aplicación desde los dashboards de Render y Vercel

---

**¿Necesitas más ayuda?** Lee la guía completa en `DEPLOYMENT.md` o visita la página `/guia` en tu aplicación.
