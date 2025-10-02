import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import dayjs from 'dayjs'
import { Badge } from './ui/badge'

export default function EntryCard(props: { entry: any }) {
  const { entry } = props
  const date = dayjs(entry.createdAt).format('DD/MM/YYYY HH:mm')
  return (
    <Card
      className="min-h-[250px] flex items-center flex-col pt-3 rounded-3xl dark:color-white"
      style={{ backgroundColor: entry.analysis?.color }}
    >
      <div className="w-[95%] bg-white dark:bg-[#131621] rounded-3xl min-h-[175px]">
        <CardHeader className="rounded-t-3xl">
          <CardTitle>
            <p className="leading-7 [&:not(:first-child)]:mt-6">{date}</p>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="max-h-[100px] overflow-auto">
          {entry.analysis?.summary ?? ''}
        </CardContent>
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        <Badge variant="secondary">
          {entry.analysis?.mood.toUpperCase() ?? ''}
        </Badge>
      </div>
    </Card>
  )
}
