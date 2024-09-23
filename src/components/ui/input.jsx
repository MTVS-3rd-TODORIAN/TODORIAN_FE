import React from 'react'

export function Input({ 
  className = '', 
  fullWidth = false, 
  ...props 
}) {
  const baseStyles = 'px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
  const widthStyles = fullWidth ? 'w-full' : ''

  const inputStyles = `${baseStyles} ${widthStyles} ${className}`

  return <input className={inputStyles} {...props} />
}