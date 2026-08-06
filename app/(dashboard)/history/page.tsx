import HistoryChart from '@/components/HistoryCharts'
import { PageShell } from '@/components/dashboard/PageShell'
import { Card } from '@/components/ui/card'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  const total = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore
  }, 0)
  const average = analyses.length > 0 ? total / analyses.length : 0
  return { analyses, average }
}

const HistoryPage = async () => {
  const { analyses, average } = await getData()
  return (
    <PageShell title="Historique">
      <Card className="mb-6 inline-flex flex-col gap-1 px-5 py-4">
        <span className="text-xs font-medium text-muted-foreground">
          Moyenne du mood
        </span>
        <span className="text-3xl font-semibold tracking-tight">
          {average.toFixed(1)}{' '}
          <span className="text-base font-normal text-muted-foreground">
            / 10
          </span>
        </span>
      </Card>

      <div className="h-[420px] w-full">
        <HistoryChart data={analyses} />
      </div>
    </PageShell>
  )
}

export default HistoryPage
