import {
  ArcElement,
  Chart as ChartJS,
  type ChartOptions,
  type ChartData,
  Legend,
  Tooltip,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { usePortfolioContext } from '../../context/PortfolioContext'
import Wrapper from '../../layout/Wrapper'
import { backgroundColor, borderColor } from '../../utils/charts/const'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Asset {
  name: string
  category: string
  quantity: number
  value: number
  asOf: string
}

interface AssetChartProps {
  assets: Asset[]
}

const aggregateDataByCategory = (assets: Asset[]): Record<string, number> => {
  const totals: Record<string, number> = {}

  assets.forEach(asset => {
    if (totals[asset.category]) {
      totals[asset.category] += asset.value
    } else {
      totals[asset.category] = asset.value
    }
  })

  return totals
}

export const AssetChart = ({ assets }: AssetChartProps) => {
  const { category } = usePortfolioContext()

  const aggregatedData = aggregateDataByCategory(assets)

  let labels: string[] = []
  let dataPoints: number[] = []

  if (category === 'All') {
    labels = Object.keys(aggregatedData)
    dataPoints = labels.map(label => aggregatedData[label])
  } else {
    const filteredAssets = assets.filter(asset => asset.category === category)
    labels = filteredAssets.map(asset => asset.name)
    dataPoints = filteredAssets.map(asset => asset.value)
  }

  const data: ChartData<'doughnut'> = {
    labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  }

  const option: ChartOptions<'doughnut'> = {
    // label: `Portfolio Value by ${category}`,
  }

  return (
    <Wrapper>
      <Doughnut data={data} options={option} />
    </Wrapper>
  )
}
