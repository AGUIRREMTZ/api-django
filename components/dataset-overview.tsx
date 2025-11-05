"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, FileText, Target, Layers } from "lucide-react"

interface DatasetInfo {
  name: string
  description: string
  purpose: string
  total_records: number
  total_columns: number
  target_variable: string
  target_values: string[]
  features_categories: Record<string, string>
  use_cases: string[]
}

export function DatasetOverview() {
  const [data, setData] = useState<DatasetInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/dataset-info/`)
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
          <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-2xl">{data.name}</CardTitle>
        </div>
        <CardDescription className="text-base">{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total de Registros</p>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              {data.total_records.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Columnas</p>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{data.total_columns}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Variable Objetivo</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{data.target_variable}</p>
            <div className="flex gap-2 mt-2">
              {data.target_values.map((val) => (
                <Badge key={val} variant={val === "normal" ? "secondary" : "destructive"}>
                  {val}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Purpose */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Propósito</h3>
          <p className="text-slate-600 dark:text-slate-400">{data.purpose}</p>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3">Casos de Uso</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.use_cases.map((useCase, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-600 dark:text-slate-400">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
