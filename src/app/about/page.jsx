import Link from 'next/link'
import React from 'react'

function About() {
  return (
    <div className='flex flex-col'>
        <div>This is About page</div>
        <Link href='/' className='underline text-blue-400'>Go back to Home</Link>
    </div>
  )
}

export default About