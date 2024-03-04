import React from 'react'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import Wrapper from '../../layout/Wrapper'
import { backgroundColor, borderColor } from '../../utils/charts/const'
import { usePortfolioContext } from '../../context/PortfolioContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

interface Asset {
  name: string
  category: string
  quantity: number
  value: number
  asOf: string
}

interface AssetChartProps {
  latestAssetsInfo: Asset[]
}

const HistoricalChart: React.FC<AssetChartProps> = ({ latestAssetsInfo }) => {
  const { category } = usePortfolioContext()
  const filteredAssets =
    category === 'All'
      ? latestAssetsInfo
      : latestAssetsInfo.filter(asset => asset.category === category)
  // First, aggregate assets by name, then within each, by date
  const assetsByName: Record<string, Record<string, number>> = {}
  filteredAssets.forEach(asset => {
    const dateKey = format(new Date(asset.asOf), 'dd-MM-yyyy')
    if (!assetsByName[asset.name]) {
      assetsByName[asset.name] = {}
    }
    if (!assetsByName[asset.name][dateKey]) {
      assetsByName[asset.name][dateKey] = 0
    }
    assetsByName[asset.name][dateKey] += asset.value
  })

  // Extract all unique dates to use as chart labels
  const allDates = new Set<string>()
  filteredAssets.forEach(asset => {
    const dateKey = format(new Date(asset.asOf), 'dd-MM-yyyy')
    allDates.add(dateKey)
  })
  const labels = Array.from(allDates).sort()

  const datasets = Object.keys(assetsByName).map((name, index) => {
    const colorIndex = index % backgroundColor.length

    const dataForAsset = labels.map(date =>
      assetsByName[name][date] !== undefined ? assetsByName[name][date] : null,
    )
    return {
      label: name,
      data: dataForAsset,
      borderColor: borderColor[colorIndex],
      backgroundColor: backgroundColor[colorIndex],
      fill: false,
      yAxisID: 'y',
    }
  })

  const datasetForAllAssets = {
    label: 'Total Asset Value',
    data: labels.map(date =>
      filteredAssets
        .filter(asset => format(new Date(asset.asOf), 'dd-MM-yyyy') === date)
        .reduce((total, asset) => total + asset.value, 0),
    ),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    fill: false,
    yAxisID: 'y1',
  }

  const data: ChartData<'line'> = {
    labels,
    datasets: [...datasets, datasetForAllAssets],
  }

  const options: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: false,
        position: 'right',
      },
      y1: {
        beginAtZero: true,
        position: 'left',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <Wrapper h="inherit">
      <Line data={data} options={options} />
    </Wrapper>
  )
}

export default HistoricalChart
