import { Button, Flex, HStack, Input } from '@chakra-ui/react'
import React from 'react'
import { usePortfolioContext } from '../../context/PortfolioContext'
import Wrapper from '../../layout/Wrapper'
import { formatDate } from '../../utils/helpers/formatDates'

const PortfolioControls: React.FC = () => {
  const { asOf, setAsOf, category, setCategory } = usePortfolioContext()
  const today = new Date()
  const maxDate = formatDate(today)

  return (
    <Wrapper>
      <Flex flexDirection={{ base: 'column', md: 'row' }} gap={'16px'}>
        <HStack>
          <Button
            variant={category === 'All' ? 'primary' : 'secondary'}
            onClick={() => setCategory('All')}
          >
            All
          </Button>
          <Button
            variant={category === 'Stocks' ? 'primary' : 'secondary'}
            onClick={() => setCategory('Stocks')}
          >
            Stocks
          </Button>
          <Button
            variant={category === 'Crypto' ? 'primary' : 'secondary'}
            onClick={() => setCategory('Crypto')}
          >
            Crypto
          </Button>
          <Button
            variant={category === 'Cash' ? 'primary' : 'secondary'}
            onClick={() => setCategory('Cash')}
          >
            Cash
          </Button>
        </HStack>
        <Input
          type="date"
          value={asOf}
          onChange={e => setAsOf(e.target.value)}
          placeholder="Select date"
          borderColor={'brand.300'}
          borderWidth={'1px'}
          max={maxDate}
        />
      </Flex>
    </Wrapper>
  )
}

export default PortfolioControls
