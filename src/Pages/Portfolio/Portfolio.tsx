import { Center, Skeleton } from '@chakra-ui/react'
import { ENDPOINTS } from '../../api/const'
import { AssetType, PortfolioType, PricesType } from '../../api/types'
import { AssetChart } from '../../components/charts/AssetChart'
import HistoricalChart from '../../components/charts/HistoricalChart'
import PortfolioControls from '../../components/controls/PortfolioControls'
import { usePortfolioContext } from '../../context/PortfolioContext'
import Wrapper from '../../layout/Wrapper'
import { useGetAPI } from '../../lib/easy-query-hooks'
import { getAssetDataPoints } from '../../utils/helpers/formatAssetJSON'

const Portfolio = () => {
  const { asOf } = usePortfolioContext()

  const {
    data: assets,
    isLoading: isLoadingAssets,
    isError: isErrorAssets,
  } = useGetAPI<AssetType[]>({
    url: ENDPOINTS.assets,
  })

  const assetIds = assets?.map(asset => asset.name).join(',')

  const {
    data: prices,
    isLoading: isLoadingPrices,
    isError: isErrorPrices,
  } = useGetAPI<PricesType[]>({
    // url: `${ENDPOINTS.prices}?assets=${assetIds}${asOf ? `&asOf=${asOf}` : ''}`,
    url: `${ENDPOINTS.prices}`,
    options: { enabled: !!assetIds },
  })

  const {
    data: portfolio,
    isLoading: isLoadingPortfolio,
    isError: isErrorPortfolio,
  } = useGetAPI<PortfolioType[]>({
    // url: `${ENDPOINTS.portfolio}${asOf ? `?asOf=${asOf}` : ''}`,
    url: `${ENDPOINTS.portfolio}`,
  })

  const isLoading = isLoadingAssets || isLoadingPrices || isLoadingPortfolio
  const isError = isErrorAssets || isErrorPrices || isErrorPortfolio

  const latestAssetsInfo = getAssetDataPoints(
    assets ?? [],
    prices ?? [],
    portfolio ?? [],
  )

  if (isError && !isLoading) return <div>Error...</div>

  return (
    <Center
      px={{ base: '0', md: '16px' }}
      flexDirection={'column'}
      h="100vh"
      w={'100vw'}
      gap={'16px'}
      bg={'brand.50'}
      overflow={'hidden'}
      backgroundImage="http://api.thumbr.it/whitenoise-361x370.png?background=4ea6caff&noise=626262&density=55&opacity=55"
    >
      <Center flexDirection={'column'} gap={'16px'}>
        <PortfolioControls />
        <Wrapper
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: '16px', md: '32px' }}
          w={'auto'}
        >
          <Skeleton isLoaded={!(isLoadingAssets || isLoadingPrices)}>
            <AssetChart assets={latestAssetsInfo ?? []} />
          </Skeleton>

          <Skeleton isLoaded={!isLoading} h="100%">
            <HistoricalChart latestAssetsInfo={latestAssetsInfo} />
          </Skeleton>
        </Wrapper>
      </Center>
    </Center>
  )
}

export default Portfolio
