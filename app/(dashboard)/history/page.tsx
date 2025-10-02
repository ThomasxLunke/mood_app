import HistoryChart from '@/components/HistoryCharts'
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
  const average = total / analyses.length
  return { analyses, average }
}

const HistoryPage = async () => {
  const { analyses, average } = await getData()
  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Historique
      </h1>
      <div>
        <h1 className="text-2xl mb-4">{`Moyenne du mood : ${average.toFixed(
          1
        )} / 10`}</h1>
      </div>

      <div className="h-[93%] w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default HistoryPage
