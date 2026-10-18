import { Check, Copy, DownloadSimple, FileCode, WarningCircle } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import type { CreativeDirection, QualityCheck } from '../lib/types'

interface PromptPreviewProps {
  prompt: string
  direction: CreativeDirection | null
  checks: QualityCheck[]
  canExport: boolean
  onCopy: () => void
  onDownload: () => void
  copyStatus: string
}

export function PromptPreview({ prompt, direction, checks, canExport, onCopy, onDownload, copyStatus }: PromptPreviewProps) {
  const words = prompt.trim().split(/\s+/).filter(Boolean).length
  const passed = checks.filter((check) => check.passed).length
  const score = Math.round((passed / checks.length) * 100)

  return (
    <aside className="prompt-preview" aria-label="Live prompt preview">
      <div className="preview-header">
        <div>
          <span className="preview-kicker"><span className="live-dot" /> Live compiler</span>
          <h2>{direction?.name ?? 'Direction pending'}</h2>
        </div>
        <div className="quality-score" aria-label={`${score}% of hard gates passed`}>
          <strong>{score}</strong><span>%</span>
        </div>
      </div>

      <div className="preview-meta">
        <span><FileCode /> {words.toLocaleString()} words</span>
        <span>{passed}/{checks.length} gates</span>
      </div>

      <div className="quality-list">
        {checks.map((check) => (
          <div key={check.label} className={check.passed ? 'is-passed' : ''}>
            <span className="quality-icon" aria-hidden="true">
              {check.passed ? <Check weight="bold" /> : <WarningCircle />}
            </span>
            <span><strong>{check.label}</strong><small>{check.detail}</small></span>
          </div>
        ))}
      </div>

      <div className="prompt-window">
        <div className="prompt-window-bar">
          <span>PROMPT.md</span>
          <span>compiled now</span>
        </div>
        <pre>{prompt}</pre>
        <div className="prompt-fade" />
      </div>

      <div className="preview-actions">
        <motion.button type="button" className="button-primary" onClick={onCopy} disabled={!canExport} title={canExport ? 'Copy approved prompt' : 'Complete every hard gate before export'} whileTap={canExport ? { scale: 0.98 } : undefined}>
          {copyStatus === 'Copied' ? <Check weight="bold" /> : <Copy />}
          {copyStatus}
        </motion.button>
        <motion.button type="button" className="button-secondary" onClick={onDownload} disabled={!canExport} title={canExport ? 'Download approved prompt' : 'Complete every hard gate before export'} whileTap={canExport ? { scale: 0.98 } : undefined}>
          <DownloadSimple /> Download
        </motion.button>
      </div>
      <span className="sr-only" aria-live="polite">{copyStatus === 'Copied' ? 'Prompt copied to clipboard' : ''}</span>
    </aside>
  )
}
