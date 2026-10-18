import { Check } from '@phosphor-icons/react'

export interface StageDefinition {
  id: string
  label: string
  eyebrow: string
}

interface StageRailProps {
  stages: StageDefinition[]
  current: number
  reached: number
  onSelect: (index: number) => void
}

export function StageRail({ stages, current, reached, onSelect }: StageRailProps) {
  return (
    <nav className="stage-rail" aria-label="Prompt builder stages">
      <div className="rail-intro">
        <span>Project sequence</span>
        <strong>{current + 1} / {stages.length}</strong>
      </div>
      <ol>
        {stages.map((stage, index) => {
          const active = index === current
          const complete = index < reached
          return (
            <li key={stage.id}>
              <button
                type="button"
                className={active ? 'is-active' : ''}
                disabled={index > reached}
                onClick={() => onSelect(index)}
                aria-current={active ? 'step' : undefined}
              >
                <span className="rail-index">
                  {complete ? <Check weight="bold" /> : String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="rail-eyebrow">{stage.eyebrow}</span>
                  <span className="rail-label">{stage.label}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="rail-note">
        <span className="rail-note-mark" />
        Choices compile live. Nothing is randomized without a reason.
      </div>
    </nav>
  )
}
