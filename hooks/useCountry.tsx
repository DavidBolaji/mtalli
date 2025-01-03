'use client'

import { useEffect, useState } from 'react'
import { useAxios } from './use-axios'

const useCountry = () => {
  const Axios = useAxios()
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([])
  const [states, setStates] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await Axios.get('/location/countries');
        setCountries(data.data.data)
      } catch (error: any) {
        console.log(error?.message)
      }
    }
    fetchCountries()
  }, [])

  const fetchStates = async (country: string) => {
    if(!country) return;

    try {
      const req = await Axios.post('/location/states', { country })
   
      const format = req.data.data.map((e: any) => ({
        label: e.name,
        value: e.name,
      }))

      setStates([...format])
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return {
    countries,
    states,
    fetchStates,
    setStates
  }
}

export default useCountry
