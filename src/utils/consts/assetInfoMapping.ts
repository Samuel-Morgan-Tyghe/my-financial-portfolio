type AssetInfo = {
  name: string
  class: string
  shortKey: string
}

export const knownAssets: AssetInfo[] = [
  { name: 'Bitcoin', class: 'Cryptocurrency', shortKey: 'BTC' },
  { name: 'Ethereum', class: 'Cryptocurrency', shortKey: 'ETH' },
  { name: 'Apple Inc.', class: 'Equities', shortKey: 'AAPL' },
  { name: 'Microsoft Corp.', class: 'Equities', shortKey: 'MSFT' },
  { name: 'Amazon.com Inc.', class: 'Equities', shortKey: 'AMZN' },
  { name: 'Tesla Inc.', class: 'Equities', shortKey: 'TSLA' },
  { name: 'British Pound', class: 'Currency', shortKey: 'GBP' },
  { name: 'US Dollar', class: 'Currency', shortKey: 'USD' },
  { name: 'Euro', class: 'Currency', shortKey: 'EUR' },
  { name: 'Gold', class: 'Commodities', shortKey: 'XAU' },
  { name: 'Silver', class: 'Commodities', shortKey: 'XAG' },
  { name: 'Crude Oil', class: 'Commodities', shortKey: 'OIL' },
]

export const getAssetDetails = (name: string) =>
  knownAssets.find(asset => asset.name === name)
