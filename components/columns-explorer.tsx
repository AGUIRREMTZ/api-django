"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Columns3, Info } from "lucide-react"

interface Column {
  name: string
  type: string
  description: string
  values?: string[]
  note?: string
}

interface ColumnsData {
  total_columns: number
  categories: Record<string, Column[]>
}

const categoryLabels: Record<string, string> = {
  basic_features: "Características Básicas",
  content_features: "Características de Contenido",
  traffic_features: "Características de Tráfico",
  target: "Variable Objetivo",
}

const typeColors: Record<string, string> = {
  numeric: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  categorical: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200",
  binary: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
}

export function ColumnsExplorer() {
  const [data, setData] = useState<ColumnsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/columns/`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-50"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Columns3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <CardTitle className="text-2xl">Explorador de Columnas</CardTitle>
        </div>
        <CardDescription>{data.total_columns} columnas organizadas por categorías</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic_features" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {Object.keys(data.categories).map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                {categoryLabels[category]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(data.categories).map(([category, columns]) => (
            <TabsContent key={category} value={category} className="space-y-3 mt-4">
              {columns.map((column, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {column.name}
                        </code>
                        <Badge className={typeColors[column.type]}>{column.type}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{column.description}</p>
                    </div>
                  </div>

                  {column.values && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="text-xs text-slate-500 dark:text-slate-500 mr-1">Valores:</span>
                      {column.values.map((val) => (
                        <Badge key={val} variant="outline" className="text-xs">
                          {val}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {column.note && (
                    <div className="flex items-start gap-2 mt-3 p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-900">
                      <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-800 dark:text-blue-200">{column.note}</p>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
