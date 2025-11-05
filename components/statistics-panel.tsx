"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp } from "lucide-react"

interface Statistics {
  dataset_statistics: {
    total_records: number
    total_columns: number
    protocol_distribution: Record<string, number>
    class_distribution: Record<string, number>
    top_services: Array<{ service: string; count: number }>
  }
  insights: Record<string, string>
}

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

export function StatisticsPanel() {
  const [data, setData] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/statistics/`)
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

  const protocolData = Object.entries(data.dataset_statistics.protocol_distribution).map(([name, value]) => ({
    name: name.toUpperCase(),
    value,
  }))

  const classData = Object.entries(data.dataset_statistics.class_distribution).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
          <CardTitle className="text-2xl">Estadísticas del Dataset</CardTitle>
        </div>
        <CardDescription>Distribución de protocolos, clases y servicios principales</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Protocol Distribution */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">Distribución de Protocolos</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={protocolData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {protocolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Class Distribution */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">Distribución de Clases</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={classData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Services */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">Top 5 Servicios Más Comunes</h3>
          <div className="space-y-3">
            {data.dataset_statistics.top_services.map((service, idx) => {
              const percentage = (service.count / data.dataset_statistics.total_records) * 100
              return (
                <div key={service.service}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{service.service}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {service.count.toLocaleString()} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: COLORS[idx % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Insights Clave</h3>
          <div className="space-y-2">
            {Object.entries(data.insights).map(([key, value]) => (
              <p key={key} className="text-sm text-blue-800 dark:text-blue-200">
                • {value}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
