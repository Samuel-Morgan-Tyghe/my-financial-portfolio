import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Portfolio from './Pages/Portfolio/Portfolio'
import { PortfolioProvider } from './context/PortfolioContext'
import { setUpEasyQueryHooks } from './lib/easy-query-hooks'
import theme from './theme/theme'

const queryClient = new QueryClient()

setUpEasyQueryHooks({ useMutation, useQuery, useInfiniteQuery })

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PortfolioProvider>
        <Portfolio />
      </PortfolioProvider>
    ),
  },
])

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
