export const formatDate = (timestamp:number|string) => {
  const date = new Date(parseInt(timestamp as string))
  const options: Intl.DateTimeFormatOptions = {day:'2-digit', month:'short', year: 'numeric'}
  return date.toLocaleDateString('en-US',options)
}