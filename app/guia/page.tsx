import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, ExternalLink, Github, Globe, Server } from "lucide-react"
import Link from "next/link"

export default function GuiaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <header className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-6 transition-colors"
          >
            ← Volver al Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-balance">
            Guía de Despliegue Paso a Paso
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-pretty">
            Aprende a desplegar tu aplicación NSL-KDD en la web usando Render y Vercel
          </p>
        </header>

        {/* Overview */}
        <Card className="p-6 mb-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">¿Qué vamos a hacer?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Server className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Backend en Render</p>
                <p className="text-blue-700 dark:text-blue-300">API Django con los datos del dataset</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Frontend en Vercel</p>
                <p className="text-blue-700 dark:text-blue-300">Dashboard interactivo con Next.js</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Requisitos Previos</h2>
          <Card className="p-6">
            <ul className="space-y-3">
              {[
                { text: "Cuenta en GitHub", url: "https://github.com/signup" },
                { text: "Cuenta en Render (gratis)", url: "https://render.com/register" },
                { text: "Cuenta en Vercel (gratis)", url: "https://vercel.com/signup" },
                { text: "Código del proyecto descargado" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                    >
                      Crear cuenta <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Step 1: GitHub */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-blue-600 text-white">Paso 1</Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Subir el Código a GitHub</h2>
          </div>

          <Card className="p-6 mb-4">
            <div className="flex items-start gap-4 mb-4">
              <Github className="w-6 h-6 text-slate-700 dark:text-slate-300 mt-1 shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Crear repositorio en GitHub</h3>
                <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">1.</span>
                    <span>
                      Ve a{" "}
                      <a
                        href="https://github.com/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        github.com/new
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">2.</span>
                    <span>
                      Nombra tu repositorio (ej:{" "}
                      <code className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-xs">
                        nsl-kdd-explorer
                      </code>
                      )
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">3.</span>
                    <span>Selecciona "Public" o "Private"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">4.</span>
                    <span>Click en "Create repository"</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-slate-100 font-mono">
                <div className="text-green-400"># En la carpeta de tu proyecto</div>
                <div>git init</div>
                <div>git add .</div>
                <div>git commit -m "Initial commit"</div>
                <div>git remote add origin https://github.com/tu-usuario/tu-repo.git</div>
                <div>git push -u origin main</div>
              </code>
            </div>
          </Card>
        </section>

        {/* Step 2: Backend */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-purple-600 text-white">Paso 2</Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Desplegar Backend en Render</h2>
          </div>

          <Card className="p-6 mb-4">
            <div className="flex items-start gap-4 mb-4">
              <Server className="w-6 h-6 text-slate-700 dark:text-slate-300 mt-1 shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Configurar servicio en Render</h3>
                <ol className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">1.</span>
                    <div className="flex-1">
                      <p>
                        Ve a{" "}
                        <a
                          href="https://dashboard.render.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Render Dashboard
                        </a>
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">2.</span>
                    <div className="flex-1">
                      <p>
                        Click en <strong>"New +"</strong> → <strong>"Blueprint"</strong>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Render detectará automáticamente el archivo render.yaml
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">3.</span>
                    <div className="flex-1">
                      <p>Conecta tu repositorio de GitHub</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">4.</span>
                    <div className="flex-1">
                      <p>
                        Click en <strong>"Apply"</strong>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Render configurará todo automáticamente
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">5.</span>
                    <div className="flex-1">
                      <p>Espera 5-10 minutos mientras se despliega</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">6.</span>
                    <div className="flex-1">
                      <p>
                        <strong>Copia la URL de tu API</strong> (ej:{" "}
                        <code className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-xs">
                          https://nsl-kdd-api.onrender.com
                        </code>
                        )
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        ⚠️ Guarda esta URL, la necesitarás para el frontend
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">Verificar que funciona</p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Abre en tu navegador:{" "}
                    <code className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900 rounded text-xs">
                      https://tu-app.onrender.com/api/
                    </code>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Deberías ver un JSON con la descripción de la API
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Step 3: Frontend */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-emerald-600 text-white">Paso 3</Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Desplegar Frontend en Vercel</h2>
          </div>

          <Card className="p-6 mb-4">
            <div className="flex items-start gap-4 mb-4">
              <Globe className="w-6 h-6 text-slate-700 dark:text-slate-300 mt-1 shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Configurar proyecto en Vercel</h3>
                <ol className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">1.</span>
                    <div className="flex-1">
                      <p>
                        Ve a{" "}
                        <a
                          href="https://vercel.com/dashboard"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Vercel Dashboard
                        </a>
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">2.</span>
                    <div className="flex-1">
                      <p>
                        Click en <strong>"Add New..."</strong> → <strong>"Project"</strong>
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">3.</span>
                    <div className="flex-1">
                      <p>Importa tu repositorio de GitHub</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Vercel detectará automáticamente que es Next.js
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">4.</span>
                    <div className="flex-1">
                      <p>
                        <strong>Configura la variable de entorno:</strong>
                      </p>
                      <div className="mt-2 bg-slate-100 dark:bg-slate-800 rounded p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Key:</span>
                          <code className="px-2 py-1 bg-slate-200 dark:bg-slate-900 rounded text-xs">
                            NEXT_PUBLIC_API_URL
                          </code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Value:</span>
                          <code className="px-2 py-1 bg-slate-200 dark:bg-slate-900 rounded text-xs">
                            https://tu-app.onrender.com
                          </code>
                        </div>
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          ⚠️ Usa la URL que copiaste de Render (sin /api/ al final)
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">5.</span>
                    <div className="flex-1">
                      <p>
                        Click en <strong>"Deploy"</strong>
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">6.</span>
                    <div className="flex-1">
                      <p>Espera 2-3 minutos mientras se despliega</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-50">7.</span>
                    <div className="flex-1">
                      <p>
                        <strong>¡Listo!</strong> Vercel te dará una URL (ej:{" "}
                        <code className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-xs">
                          https://tu-proyecto.vercel.app
                        </code>
                        )
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">Verificar que funciona</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                    Abre tu URL de Vercel y verifica que:
                  </p>
                  <ul className="text-xs text-green-600 dark:text-green-400 space-y-1 ml-4">
                    <li>✓ El dashboard carga correctamente</li>
                    <li>✓ Los datos se muestran (confirma conexión con backend)</li>
                    <li>✓ Las gráficas se renderizan</li>
                    <li>✓ No hay errores en la consola del navegador</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Solución de Problemas Comunes</h2>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">El frontend no muestra datos</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Verifica que la URL del backend en Vercel sea correcta (sin{" "}
                    <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-xs">/api/</code> al final)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Abre la consola del navegador (F12) y busca errores de CORS o red</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Verifica que el backend esté funcionando visitando{" "}
                    <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-xs">
                      https://tu-app.onrender.com/api/
                    </code>
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                El backend tarda mucho en responder
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                En el plan gratuito de Render, el servicio se "duerme" después de 15 minutos de inactividad.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>La primera petición después de dormir puede tardar 30-60 segundos</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Las siguientes peticiones serán rápidas</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Esto es normal en el plan gratuito</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Error de CORS</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                El backend ya está configurado para aceptar peticiones de cualquier origen en producción. Si aún ves
                errores, verifica que{" "}
                <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-xs">DEBUG=False</code> en las
                variables de entorno de Render.
              </p>
            </Card>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Próximos Pasos</h2>

          <Card className="p-6">
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-50">Actualizaciones automáticas</p>
                  <p>Cada vez que hagas push a GitHub, Render y Vercel desplegarán automáticamente</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-50">Dominio personalizado</p>
                  <p>Puedes agregar tu propio dominio en Vercel (Settings → Domains)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-50">Monitoreo</p>
                  <p>Revisa los logs en Render y las métricas en Vercel para monitorear tu aplicación</p>
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Ver Dashboard en Acción
          </Link>
        </div>
      </div>
    </main>
  )
}
