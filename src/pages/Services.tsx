import { useEffect } from 'react'

const Services = () => {
  useEffect(() => {
    // Hard redirect any React route (/#/services) to the static services.html
    const target = '/services.html' + (window.location.search || '') + (window.location.hash || '')
    window.location.replace(target)
  }, [])

  return null
}

export default Services
