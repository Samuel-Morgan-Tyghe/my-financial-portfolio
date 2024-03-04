
install

pnpm i

run

pnpm mock-api

pnpm dev


inside
src/Pages/Portfolio/Portfolio.tsx


  const {
    data: prices,
    isLoading: isLoadingPrices,
    isError: isErrorPrices,
  } = useGetAPI<PricesType[]>({
    // url: `${ENDPOINTS.prices}?assets=${assetIds}${asOf ? `&asOf=${asOf}` : ''}`,
    url: `${ENDPOINTS.prices}`,
    options: { enabled: !!assetIds },
  })

  query params are commented out becuase the JSON-Server doesnt work with them, 


  To switch endpoints to real ones replace them here

  src/api/const.ts