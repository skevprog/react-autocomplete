import { useState, useEffect } from 'react'

function useFetch<DataType>(url: string) {
  const [data, setData] = useState<DataType | undefined>(undefined)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!url) return
    async function fetchData() {
      try {
        setLoading(true)
        const resp = await fetch(url)
        const data: DataType = await resp.json()
        setData(data)
      } catch (err) {
        setError('Something went wrong')
        setData(undefined)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, error, loading }
}

export default useFetch
