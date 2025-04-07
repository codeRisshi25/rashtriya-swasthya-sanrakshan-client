"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined)

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("Chart components must be used within a ChartContainer")
  }
  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ children, config, className, ...props }: ChartContainerProps) {
  // Create CSS variables for chart colors
  const style = React.useMemo(() => {
    return Object.entries(config).reduce<Record<string, string>>((acc, [key, value]) => {
      acc[`--color-${key}`] = value.color
      return acc
    }, {})
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("", className)} style={style} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode
}

export function ChartTooltip({ content, ...props }: ChartTooltipProps) {
  return content
}

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: Record<string, any>
  }>
  label?: string
}

export function ChartTooltipContent({ active, payload, label, className, ...props }: ChartTooltipContentProps) {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props}>
      <div className="text-xs font-medium">{label}</div>
      <div className="mt-1 space-y-0.5">
        {payload.map((item, index) => {
          const dataKey = item.name
          const configItem = config[dataKey]

          if (!configItem) return null

          return (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: configItem.color }} />
              <div className="text-xs">
                {configItem.label}: {item.value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

