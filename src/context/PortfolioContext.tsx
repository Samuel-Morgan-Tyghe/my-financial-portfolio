import React, { createContext, useContext, useState, ReactNode } from 'react'

type Category = 'Stocks' | 'Crypto' | 'Cash' | 'All'

type PortfolioContextType = {
  asOf: string
  setAsOf: (asOf: string) => void
  category: Category
  setCategory: (category: Category) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
)

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error(
      'usePortfolioContext must be used within a PortfolioProvider',
    )
  }
  return context
}

interface PortfolioProviderProps {
  children: ReactNode
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
}) => {
  const [asOf, setAsOf] = useState<string>('')
  const [category, setCategory] = useState<Category>('Stocks')

  const value = { asOf, setAsOf, category, setCategory }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}
