export type PositionType = {
  id: number
  asset: string
  quantity: number
  asOf: string
  price: number
}

export type PortfolioType = {
  id: string
  asOf: string
  positions: PositionType[]
}

export type AssetType = {
  id: string
  name: string
}
export type PricesType = {
  id: string
  asset: string
  price: number
}
