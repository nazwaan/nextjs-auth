'use client'

import axios from "axios"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  const ignore = ['/login']

  useEffect(() => {
    const getAccessToken = async () => {
      const sessionStorageAccessToken = sessionStorage.getItem('access-token')

      if(!sessionStorageAccessToken) {
        try {
          const tokenResponse = await axios.get('/api/access-token')
          const userResponse = await axios.get('/api/me')
          const token = tokenResponse.data.token
          const user = userResponse.data.payload

          sessionStorage.setItem('access-token', token)
          sessionStorage.setItem('user-data', JSON.stringify(user))
          setLoading(false)
        } catch(err) { console.log(err) }
      }
      else { setLoading(false) }
    }

    if(!ignore.includes(pathname)) {
      console.log('Client middleware hit: ' + pathname)
      getAccessToken()
    } else { setLoading(false) }
  }, [pathname])

  if (loading) return <div>Loading...</div>
  return <>{children}</>
}