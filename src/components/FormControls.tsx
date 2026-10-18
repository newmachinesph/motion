import type { ReactNode } from 'react'
import { Check } from '@phosphor-icons/react'

interface FieldProps {
  label: string
  hint?: string
  error?: string
  children: ReactNode
}

export function Field({ label, hint, error, children }: FieldProps) {
  return (
    <label className="field-block">
      <span className="field-label">{label}</span>
      {hint && <span className="field-hint">{hint}</span>}
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}

interface ChoiceProps {
  title: string
  description?: string
  selected: boolean
  onClick: () => void
  compact?: boolean
  marker?: ReactNode
}

export function Choice({ title, description, selected, onClick, compact, marker }: ChoiceProps) {
  return (
    <button
      className={`choice ${selected ? 'is-selected' : ''} ${compact ? 'is-compact' : ''}`}
      type="button"
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="choice-copy">
        <span className="choice-title">{title}</span>
        {description && <span className="choice-description">{description}</span>}
      </span>
      <span className="choice-marker" aria-hidden="true">
        {marker ?? (selected ? <Check weight="bold" /> : null)}
      </span>
    </button>
  )
}

interface TagProps {
  children: ReactNode
  selected: boolean
  onClick: () => void
}

export function Tag({ children, selected, onClick }: TagProps) {
  return (
    <button
      type="button"
      className={`tag ${selected ? 'is-selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {selected && <Check weight="bold" aria-hidden="true" />}
      {children}
    </button>
  )
}

interface RangeFieldProps {
  label: string
  hint: string
  value: number
  onChange: (value: number) => void
}

export function RangeField({ label, hint, value, onChange }: RangeFieldProps) {
  return (
    <div className="range-field">
      <div className="range-copy">
        <span className="field-label">{label}</span>
        <span className="field-hint">{hint}</span>
      </div>
      <div className="range-value" aria-hidden="true">
        {String(value).padStart(2, '0')}
      </div>
      <input
        aria-label={label}
        type="range"
        min="1"
        max="10"
        step="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="range-scale" aria-hidden="true">
        <span>Still</span>
        <span>Responsive</span>
        <span>Cinematic</span>
      </div>
    </div>
  )
}
