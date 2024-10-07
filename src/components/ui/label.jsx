import React from 'react'

export function Label({ 
  children, 
  className = '', 
  required = false, 
  ...props 
}) {
  const baseStyles = 'block text-sm font-medium text-gray-700'
  const requiredStyles = required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''

  const labelStyles = `${baseStyles} ${requiredStyles} ${className}`

  return (
    <label className={labelStyles} {...props}>
      {children}
    </label>
  )
}