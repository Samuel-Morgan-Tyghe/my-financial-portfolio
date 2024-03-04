import { Center, CenterProps } from '@chakra-ui/react'

const Wrapper = ({
  children,
  ...props
}: { children: React.ReactNode } & CenterProps) => {
  return (
    <Center
      borderColor={'brand.300'}
      borderWidth={'1px'}
      bg="brand.50"
      rounded={'lg'}
      p={{ base: '8px', md: '16px' }}
      h="100%"
      {...props}
    >
      {children}
    </Center>
  )
}

export default Wrapper
