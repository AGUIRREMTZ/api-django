"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle } from "lucide-react"

interface AttackType {
  description: string
  examples: string[]
}

interface AttackTypesData {
  attack_categories: Record<string, AttackType>
  total_categories: number
  note: string
}

const categoryIcons: Record<string, string> = {
  "DoS (Denial of Service)": "🚫",
  Probe: "🔍",
  "R2L (Remote to Local)": "🌐",
  "U2R (User to Root)": "⬆️",
  Normal: "✅",
}

const categoryColors: Record<string, string> = {
  "DoS (Denial of Service)": "bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800",
  Probe: "bg-yellow-100 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-800",
  "R2L (Remote to Local)": "bg-orange-100 dark:bg-orange-950 border-orange-300 dark:border-orange-800",
  "U2R (User to Root)": "bg-purple-100 dark:bg-purple-950 border-purple-300 dark:border-purple-800",
  Normal: "bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800",
}

export function AttackTypesPanel() {
  const [data, setData] = useState<AttackTypesData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/attack-types/`)
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
          <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
          <CardTitle className="text-2xl">Tipos de Ataques</CardTitle>
        </div>
        <CardDescription>Categorías de ataques presentes en el dataset NSL-KDD</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.attack_categories).map(([category, info]) => (
            <div key={category} className={`p-4 rounded-lg border-2 ${categoryColors[category]}`}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{categoryIcons[category]}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">{category}</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{info.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {info.examples.map((example) => (
                  <Badge key={example} variant="secondary" className="text-xs font-mono">
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-slate-600 dark:text-slate-400">{data.note}</p>
        </div>
      </CardContent>
    </Card>
  )
}
