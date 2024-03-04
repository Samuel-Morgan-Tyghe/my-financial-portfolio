
# Installation and Setup

## Install Dependencies

To install the necessary dependencies, run the following command:

```bash
pnpm i
```

## Running the Application

Start the mock API and the development server with these commands:

```bash
pnpm mock-api
pnpm dev
```

## Modifying API Endpoints

### Mock API Limitation

In `src/Pages/Portfolio/Portfolio.tsx`, the query parameters for the API call are commented out. This is due to the JSON Server not supporting them as expected. Here's how the API hook is structured:

```tsx
const {
data: prices,
isLoading: isLoadingPrices,
isError: isErrorPrices,
} = useGetAPI<PricesType[]>({
// url: `${ENDPOINTS.prices}?assets=${assetIds}${asOf ? `&asOf=${asOf}` : ''}`,
    url: `${ENDPOINTS.prices}`,
options: { enabled: !!assetIds },
})
```

To use query parameters with your endpoints in a real environment, you might want to uncomment and adjust the URL structure accordingly.

### Endpoint Configuration

To switch from mock endpoints to real ones, update the endpoint URLs in `src/api/const.ts`.

## Documentation Screenshot

For a visual guide on how the application should look and operate, refer to the screenshot available in the repository:

![Application Screenshot](https://github.com/Samuel-Morgan-Tyghe/my-financial-portfolio/assets/62810658/264fa678-e90b-42ea-af63-696f194c7e58)
