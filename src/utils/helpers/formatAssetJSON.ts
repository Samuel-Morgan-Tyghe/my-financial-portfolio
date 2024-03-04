import { AssetType, PortfolioType, PricesType } from '../../api/types'

type Category = 'Stocks' | 'Crypto' | 'Cash'

interface CategoryMap {
  [key: string]: Category
}

const categoryMap: CategoryMap = {
  APPL: 'Stocks',
  GOOG: 'Stocks',
  MSFT: 'Stocks',
  BTC: 'Crypto',
  ETH: 'Crypto',
  USD: 'Cash',
}

const getCategoryByAssetName = (assetName: string): Category => {
  return categoryMap[assetName] || 'Stocks'
}

interface LatestAssetInfo {
  name: string
  quantity: number
  value: number
  category: Category
  asOf: string
}

export function getAssetDataPoints(
  assets: AssetType[],
  prices: PricesType[],
  portfolios: PortfolioType[],
): LatestAssetInfo[] {
  let dataPoints: LatestAssetInfo[] = []

  portfolios.forEach(portfolio => {
    portfolio.positions.forEach(position => {
      const assetName = assets.find(asset => asset.id === position.asset)?.name
      if (!assetName) return
      const foundPrice = prices.find(price => price.asset === assetName)
      if (!foundPrice) return
      dataPoints.push({
        name: assetName,
        quantity: position.quantity,
        value: position.quantity * (foundPrice ? foundPrice.price : 0),
        category: getCategoryByAssetName(assetName),
        asOf: portfolio.asOf,
      })
    })
  })

  return dataPoints
}
