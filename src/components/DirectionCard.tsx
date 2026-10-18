import { Check, LockSimple, LockSimpleOpen, Shuffle } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import type { CreativeDirection, DirectionLock } from '../lib/types'

interface DirectionCardProps {
  direction: CreativeDirection
  selected: boolean
  recommended?: boolean
  onSelect: () => void
}

export function DirectionCard({ direction, selected, recommended, onSelect }: DirectionCardProps) {
  const visualClass = `visual-${direction.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const colors = [
    direction.palette.ground,
    direction.palette.surface,
    direction.palette.ink,
    direction.palette.accent,
  ]

  return (
    <motion.article
      layout="position"
      className={`direction-card ${selected ? 'is-selected' : ''}`}
      initial={false}
      animate={{ y: selected ? -3 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <button type="button" className="direction-select" onClick={onSelect} aria-pressed={selected}>
        <span className="direction-topline">
          <span>{recommended ? 'Recommended direction' : 'Alternate direction'}</span>
          <span className="direction-check" aria-hidden="true">{selected && <Check weight="bold" />}</span>
        </span>
        <span className={`direction-visual ${visualClass}`} style={{ background: direction.palette.ground }}>
          <span className="visual-rule" style={{ background: direction.palette.line }} />
          <span className="visual-title" style={{ color: direction.palette.ink }}>{direction.name}</span>
          <span className="visual-copy" style={{ background: direction.palette.muted }} />
          <span className="visual-media" style={{ background: direction.palette.ink }}>
            <span style={{ background: direction.palette.accent }} />
          </span>
        </span>
        <span className="direction-copy">
          <strong>{direction.name}</strong>
          <em>{direction.descriptor}</em>
          <small>{direction.topology}</small>
          <span>{direction.formThesis}</span>
          <span className="direction-risk"><b>Template risk</b>{direction.templateRisk}</span>
        </span>
        <span className="swatches" aria-label={`${direction.palette.name} palette`}>
          {colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}
          <b>{direction.fonts.display} + {direction.fonts.body}</b>
        </span>
      </button>
    </motion.article>
  )
}

interface DirectionToolsProps {
  locks: DirectionLock[]
  onToggleLock: (lock: DirectionLock) => void
  onReroll: () => void
  onRerollAll: () => void
}

const lockLabels: Record<DirectionLock, string> = {
  palette: 'Color',
  type: 'Type',
  identity: 'Logo',
  composition: 'Composition',
  motion: 'Motion',
}

export function DirectionTools({ locks, onToggleLock, onReroll, onRerollAll }: DirectionToolsProps) {
  return (
    <div className="direction-tools">
      <div>
        <span className="field-label">Creative locks</span>
        <span className="field-hint">Locked decisions survive a reroll.</span>
      </div>
      <div className="lock-row">
        {(Object.keys(lockLabels) as DirectionLock[]).map((lock) => {
          const active = locks.includes(lock)
          return (
            <button key={lock} type="button" className={active ? 'is-locked' : ''} onClick={() => onToggleLock(lock)} aria-pressed={active}>
              {active ? <LockSimple weight="fill" /> : <LockSimpleOpen />}
              {lockLabels[lock]}
            </button>
          )
        })}
      </div>
      <div className="reroll-row">
        <button type="button" className="button-secondary" onClick={onReroll}>
          <Shuffle /> Reroll selected
        </button>
        <button type="button" className="button-quiet" onClick={onRerollAll}>
          New commissioned set
        </button>
      </div>
    </div>
  )
}
