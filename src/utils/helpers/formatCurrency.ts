const getCompactNumber = (num: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'USD',
  }).format(num)
}
