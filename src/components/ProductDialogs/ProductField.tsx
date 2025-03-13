import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

interface ProductFieldProps {
  label: string
  name: string
  value: string | number | undefined
  type: 'text' | 'number'
  handleChange: (value: string) => void
  placeholder: string
  required?: boolean
  extra?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  className?: string
}

export default function ProductField({
  label,
  name,
  type,
  value,
  extra,
  placeholder,
  required,
  className,
  handleChange
}: ProductFieldProps) {
  return (
    <div className={`flex w-full items-center gap-2 ${className}`}>
      <label htmlFor={name} className="min-w-1/4">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value ?? ''}
        onChange={({ target: { value } }) => handleChange(value)}
        className="border-medium-gray w-full rounded-md border-1 px-3 py-2 outline-none"
        required={required}
        placeholder={placeholder}
        {...extra}
      />
    </div>
  )
}
