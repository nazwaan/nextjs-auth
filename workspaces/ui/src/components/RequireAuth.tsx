'use client'

import axios from "axios"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTokenStore } from '@/stores/tokenStore'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const accessToken = useTokenStore((state) => state.accessToken)
  const setAccessToken = useTokenStore((state) => state.setAccessToken)
  const [loading, setLoading] = useState(true)

  const ignore = ['/login']

  useEffect(() => {
    const getAccessToken = async () => {
      if(!accessToken) {
        try {
          const response = await axios.get('/api/access-token')
          const token = response.data.token
          setAccessToken(token)
          setLoading(false)
        } catch(err) { console.log(err) }
      } else { console.log(accessToken); setLoading(false) }
    }

    if(!ignore.includes(pathname)) {
      console.log('Client middleware hit: ' + pathname)

      getAccessToken()
    }
  }, [pathname])

  if (loading) return <div>Loading...</div>
  return <>{children}</>
}