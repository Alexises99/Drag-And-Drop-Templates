import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren
} from 'react'

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined
  extraProps: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
}

export default function Button({
  extraProps,
  type,
  children
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className="hover:bg-light-gray cursor-pointer border-1 border-black px-12 py-2 text-black"
      type={type}
      {...extraProps}
    >
      {children}
    </button>
  )
}
