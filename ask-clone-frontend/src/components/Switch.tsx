import React from 'react'

function Switch() {
  return (
    <label className="relative inline-block w-8 h-4">
    <input className='hidden' type="checkbox" />
    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 duration-500 round slider "></span>
  </label>
  )
}

export default Switch