import { DatasetOverview } from "@/components/dataset-overview"
import { ColumnsExplorer } from "@/components/columns-explorer"
import { StatisticsPanel } from "@/components/statistics-panel"
import { AttackTypesPanel } from "@/components/attack-types-panel"
import { SampleDataTable } from "@/components/sample-data-table"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-balance">
            NSL-KDD Dataset Explorer
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-pretty">
            Análisis interactivo del dataset de detección de intrusiones en redes
          </p>
          <div className="mt-6">
            <a
              href="/guia"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              📖 Guía de Despliegue Paso a Paso
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col gap-8">
          <DatasetOverview />
          <StatisticsPanel />
          <AttackTypesPanel />
          <ColumnsExplorer />
          <SampleDataTable />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Dataset NSL-KDD - Sistema de Detección de Intrusiones</p>
        </footer>
      </div>
    </main>
  )
}
