"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileSpreadsheet } from "lucide-react"

interface SampleRecord {
  id: number
  duration: number
  protocol_type: string
  service: string
  flag: string
  src_bytes: number
  dst_bytes: number
  logged_in: number
  count: number
  srv_count: number
  serror_rate: number
  class: string
  difficulty_level: number
}

interface SampleData {
  sample_size: number
  note: string
  data: SampleRecord[]
}

export function SampleDataTable() {
  const [data, setData] = useState<SampleData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/sample-data/`)
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
          <FileSpreadsheet className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          <CardTitle className="text-2xl">Datos de Ejemplo</CardTitle>
        </div>
        <CardDescription>{data.note}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Protocolo</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Flag</TableHead>
                <TableHead className="text-right">Src Bytes</TableHead>
                <TableHead className="text-right">Dst Bytes</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="text-right">Error Rate</TableHead>
                <TableHead>Clase</TableHead>
                <TableHead className="text-right">Dificultad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {record.protocol_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{record.service}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {record.flag}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">{record.src_bytes.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{record.dst_bytes.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{record.count}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{record.serror_rate.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={record.class === "normal" ? "default" : "destructive"} className="font-medium">
                      {record.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">{record.difficulty_level}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
