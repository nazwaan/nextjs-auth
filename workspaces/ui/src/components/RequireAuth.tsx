'use client'

import axios from "axios"
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTokenStore } from '@/stores/tokenStore'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const accessToken = useTokenStore((state) => state.accessToken);
  const setAccessToken = useTokenStore((state) => state.setAccessToken);

  const ignore = ['/login']

  useEffect(() => {
    if(!ignore.includes(pathname)) {
      console.log('Client middleware hit: ' + pathname)
    }
  }, [pathname])

  return <>{children}</>
}