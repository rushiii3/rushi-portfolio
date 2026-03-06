"use client";
import NextTopLoader from 'nextjs-toploader'

const TopLoader = () => {
  return (
    <NextTopLoader
      color="rgba(32,194,14,0.8)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={false}
      showSpinner={false}
      easing="ease"
      speed={200}
      zIndex={1600}
      showAtBottom={false}
    />
  )
}

export default TopLoader