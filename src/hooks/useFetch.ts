import { useEffect, useState } from "react"

const useFetch = (url: string) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return
        fetchData()
    }, [url])

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const result = await response.json()
            setData(result)
            setLoading(false)
        } catch (error: any) {
            console.log(`Error: `, error?.message)
            setError(error?.message ?? null)
            setLoading(false)
        }
    }

    return {
        data,
        loading,
        error
    }
}

export default useFetch