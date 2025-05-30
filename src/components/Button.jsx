import React from 'react'

function Button({
    children,
    bgcolor = 'bg-blue-500',
    textcolor = 'text-white',
    className = '',
    type = 'button',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button