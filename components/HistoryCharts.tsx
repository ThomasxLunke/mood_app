'use client'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
} from 'recharts'

const CustomTooltip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return (
      <div className="custom-tooltip relative rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-md backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: analysis.color }}
          />
          <p className="text-sm font-semibold uppercase tracking-wide">
            {analysis.mood}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{dateLabel}</p>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="93%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <XAxis />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
