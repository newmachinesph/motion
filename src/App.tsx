import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  Check,
  DownloadSimple,
  Eye,
  FileArrowUp,
  FloppyDisk,
  Plus,
  Sparkle,
  X,
} from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Choice, Field, RangeField, Tag } from './components/FormControls'
import { DirectionCard, DirectionTools } from './components/DirectionCard'
import { PromptPreview } from './components/PromptPreview'
import { StageRail, type StageDefinition } from './components/StageRail'
import {
  defaultProject,
  mechanics,
  routePlanSets,
  sectionSets,
  siteTypes,
  studioRoles,
  targetLabels,
  visualTraits,
} from './lib/data'
import {
  compilePrompt,
  generateDirections,
  qualityChecks,
  recommendMechanics,
  rerollDirection,
} from './lib/generator'
import type {
  CreativeDirection,
  DirectionLock,
  MechanicId,
  OutputTarget,
  ProcessMode,
  ProjectData,
  SiteType,
  StudioRoleId,
} from './lib/types'

const STORAGE_KEY = 'prompt-studio-project-v1'

const stages: StageDefinition[] = [
  { id: 'intent', label: 'Intent', eyebrow: 'What it must do' },
  { id: 'audience', label: 'Audience', eyebrow: 'Who it must work for' },
  { id: 'brand', label: 'Brand', eyebrow: 'How it should feel' },
  { id: 'content', label: 'Content', eyebrow: 'What shapes the page' },
  { id: 'experience', label: 'Experience', eyebrow: 'Motion with a job' },
  { id: 'studio', label: 'Studio', eyebrow: 'Who owns each decision' },
  { id: 'direction', label: 'Direction', eyebrow: 'Choose the thesis' },
  { id: 'handoff', label: 'Handoff', eyebrow: 'Compile and build' },
]

const blankProject: ProjectData = {
  ...defaultProject,
  siteType: 'marketing',
  businessName: '',
  description: '',
  primaryAction: '',
  pageMode: 'single',
  pagePlan: routePlanSets.marketing,
  audience: '',
  logoSource: 'codex-image',
  logoStyle: 'auto',
  logoBrief: '',
  traits: ['Precise'],
  antiGoal: '',
  references: '',
  referenceStrengths: '',
  categoryCliches: '',
  restraintRule: '',
  proof: '',
  heroEvidence: '',
  contentItems: '',
  sections: sectionSets.marketing,
  mediaSubject: 'none',
  motionIntensity: 4,
  mechanics: ['micro'],
  benchmarkCriteria: '',
  outputTarget: 'framer',
  extraRequirements: '',
  seed: Math.floor(Date.now() / 1000) % 10000,
}

const loadProject = (): ProjectData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultProject
    const parsed = JSON.parse(stored) as Partial<ProjectData>
    if (parsed.version !== 1) return defaultProject
    return { ...defaultProject, ...parsed }
  } catch {
    return defaultProject
  }
}

const toggleItem = <T,>(items: T[], item: T) =>
  items.includes(item) ? items.filter((value) => value !== item) : [...items, item]

export default function App() {
  const [project, setProject] = useState<ProjectData>(loadProject)
  const [stage, setStage] = useState(0)
  const [reached, setReached] = useState(0)
  const [stageErrors, setStageErrors] = useState<string[]>([])
  const [directionChoice, setDirectionChoice] = useState<CreativeDirection | null>(null)
  const [locks, setLocks] = useState<DirectionLock[]>([])
  const [customSection, setCustomSection] = useState('')
  const [copyStatus, setCopyStatus] = useState('Copy prompt')
  const [saveStatus, setSaveStatus] = useState('Saved locally')
  const [showPreview, setShowPreview] = useState(false)
  const importRef = useRef<HTMLInputElement>(null)
  const reduceMotion = useReducedMotion()

  const directions = useMemo(() => generateDirections(project, project.seed), [project])
  const selectedDirection = directionChoice ?? directions[0] ?? null
  const recommendations = useMemo(() => recommendMechanics(project), [project])
  const checks = useMemo(() => qualityChecks(project, selectedDirection), [project, selectedDirection])
  const canExport = checks.every((check) => check.passed)
  const prompt = useMemo(() => compilePrompt(project, selectedDirection), [project, selectedDirection])
  const currentSite = siteTypes.find((item) => item.id === project.siteType) ?? siteTypes[0]

  useEffect(() => {
    setSaveStatus('Saving')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project))
    const timeout = window.setTimeout(() => setSaveStatus('Saved locally'), 320)
    return () => window.clearTimeout(timeout)
  }, [project])

  const update = <K extends keyof ProjectData>(key: K, value: ProjectData[K]) => {
    setProject((current) => ({ ...current, [key]: value }))
  }

  const selectSiteType = (siteType: SiteType) => {
    setProject((current) => ({ ...current, siteType, sections: sectionSets[siteType], pagePlan: routePlanSets[siteType] }))
    setDirectionChoice(null)
  }

  const selectPageMode = (pageMode: ProjectData['pageMode']) => {
    setProject((current) => ({
      ...current,
      pageMode,
      pagePlan: pageMode === 'multi' && !current.pagePlan.trim() ? routePlanSets[current.siteType] : current.pagePlan,
    }))
  }

  const validateStage = (index: number) => {
    const errors: string[] = []
    if (index === 0) {
      if (!project.businessName.trim()) errors.push('Give the project or business a name.')
      if (project.description.trim().length < 20) errors.push('Describe what the website offers in one concrete sentence.')
      if (!project.primaryAction.trim()) errors.push('Name the one action the website should produce.')
    }
    if (index === 1 && project.audience.trim().length < 20) errors.push('Describe the decision-maker, their context and what they need to trust.')
    if (index === 2) {
      if (project.antiGoal.trim().length < 20) errors.push('Write a substantive anti-goal that can reject a visual direction.')
      if (project.logoBrief.trim().length < 20) errors.push(project.brandMode === 'existing' ? 'Describe the existing logo assets and the rules the build must preserve.' : 'Describe one subject-specific relationship or behavior the logo should express.')
      if (project.references.trim() && !/\b(borrow|use|keep|avoid|not|adapt|structure|pacing|hierarchy)\b/i.test(project.references)) {
        errors.push('Add what to borrow, adapt or avoid from the references—not only a URL or style name.')
      }
      if (project.referenceStrengths.trim().length < 60) errors.push('Define what the strongest reference does well enough to become a measurable performance bar.')
      if (project.categoryCliches.split(/\n|;/).map((item) => item.trim()).filter(Boolean).length < 3) errors.push('Name at least three recognizable category cliché bundles the concepts must avoid.')
      if (project.restraintRule.trim().length < 50 || !/\b(one|only|reserve|quiet|limit|restrain|secondary)\b/i.test(project.restraintRule)) errors.push('Write a restraint rule that names the one focal move and what must stay quiet or secondary.')
    }
    if (index === 3) {
      if (project.contentItems.split('\n').filter(Boolean).length < 2) errors.push('Add at least two real content objects.')
      if (project.proof.trim().length < 20) errors.push('Add the evidence that makes the main claim believable.')
      if (project.heroEvidence.trim().length < 60) errors.push('Describe the exact product, proof or subject evidence that must remain legible in the first viewport.')
      if (project.sections.length < 4) errors.push('The page architecture needs at least four sections.')
      if (project.pageMode === 'multi') {
        const routes = project.pagePlan.split('\n').map((line) => line.trim()).filter(Boolean)
        if (routes.length < 5) errors.push('A multi-page website needs at least five purposeful routes.')
        if (!routes.some((line) => line.split('|')[0]?.trim() === '/')) errors.push('Add a / home route to the route manifest.')
        if (routes.some((line) => line.split('|').map((part) => part.trim()).filter(Boolean).length < 4)) errors.push('Give every route a path, page name, page job and unique payload.')
      }
    }
    if (index === 4) {
      const complexMechanics = project.mechanics.filter((id) => mechanics.find((item) => item.id === id)?.cost !== 'light')
      if (complexMechanics.length > 3) errors.push('Choose no more than three medium or heavy mechanics. They need one shared centerpiece.')
    }
    if (index === 5) {
      const requiredRoles: StudioRoleId[] = ['creative-direction', 'art-direction', 'ux-architecture', 'critique', 'design-engineering']
      if (project.studioRoles.length < 7) errors.push('Assign at least seven design roles so research, authorship, critique and production are not silently collapsed.')
      if (requiredRoles.some((role) => !project.studioRoles.includes(role))) errors.push('Keep creative direction, art direction, UX architecture, independent critique and design engineering accountable.')
      if (project.conceptCount < 3) errors.push('Commission at least three independent creative territories.')
      if (project.decisionOwner.trim().length < 20) errors.push('Name who recommends the direction and who gives final approval.')
      if (project.approvalCriteria.trim().length < 40) errors.push('Write concrete approval criteria that can reject a polished but generic direction.')
      const benchmarkCoverage = ['clarity', 'comprehension', 'product', 'realism', 'hierarchy', 'restraint', 'cohesion', 'conversion', 'mobile'].filter((term) => project.benchmarkCriteria.toLowerCase().includes(term)).length
      if (project.benchmarkCriteria.trim().length < 120 || benchmarkCoverage < 5) errors.push('Make the reference-parity gate testable across at least five dimensions such as comprehension, product visibility, realism, hierarchy, restraint, cohesion, conversion and mobile translation.')
    }
    if (index === 6 && !selectedDirection) errors.push('Choose a creative direction before handoff.')
    return errors
  }

  const goNext = () => {
    const errors = validateStage(stage)
    setStageErrors(errors)
    if (errors.length) return
    if (stage < stages.length - 1) {
      const next = stage + 1
      setReached((value) => Math.max(value, next))
      setStage(next)
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }

  const goBack = () => {
    setStageErrors([])
    setStage((value) => Math.max(0, value - 1))
  }

  const chooseStage = (index: number) => {
    setStageErrors([])
    setStage(index)
  }

  const toggleTrait = (trait: string) => {
    setProject((current) => {
      const next = toggleItem(current.traits, trait)
      return { ...current, traits: next.slice(-3) }
    })
    setDirectionChoice(null)
  }

  const toggleMechanic = (id: MechanicId) => update('mechanics', toggleItem(project.mechanics, id))

  const toggleStudioRole = (id: StudioRoleId) => update('studioRoles', toggleItem(project.studioRoles, id))

  const applyProcessMode = (processMode: ProcessMode) => {
    const presets: Record<ProcessMode, Pick<ProjectData, 'conceptCount' | 'critiqueRounds' | 'studioRoles'>> = {
      sprint: {
        conceptCount: 3,
        critiqueRounds: 1,
        studioRoles: ['strategy', 'creative-direction', 'art-direction', 'ux-architecture', 'identity', 'content-design', 'interaction', 'critique', 'design-engineering'],
      },
      studio: {
        conceptCount: 4,
        critiqueRounds: 2,
        studioRoles: studioRoles.map((role) => role.id),
      },
      atelier: {
        conceptCount: 5,
        critiqueRounds: 3,
        studioRoles: studioRoles.map((role) => role.id),
      },
    }
    setProject((current) => ({ ...current, processMode, ...presets[processMode] }))
    setDirectionChoice(null)
  }

  const toggleSection = (section: string) => update('sections', toggleItem(project.sections, section))

  const addSection = () => {
    const value = customSection.trim()
    if (!value || project.sections.includes(value)) return
    update('sections', [...project.sections, value])
    setCustomSection('')
  }

  const applyRecommendations = () => {
    update('mechanics', recommendations.filter((item) => item.recommended).map((item) => item.id))
  }

  const toggleLock = (lock: DirectionLock) => setLocks((current) => toggleItem(current, lock))

  const rerollSelected = () => {
    if (!selectedDirection) return
    const seed = project.seed + 1
    const next = rerollDirection({ ...project, seed }, selectedDirection, locks, seed)
    setProject((current) => ({ ...current, seed }))
    setDirectionChoice(next)
  }

  const rerollAll = () => {
    setDirectionChoice(null)
    setLocks([])
    setProject((current) => ({ ...current, seed: current.seed + 1 }))
  }

  const copyPrompt = async () => {
    if (!canExport) {
      setStageErrors(checks.filter((check) => !check.passed).map((check) => `${check.label}: ${check.detail}`))
      setCopyStatus('Blocked by gates')
      window.setTimeout(() => setCopyStatus('Copy prompt'), 1800)
      return
    }
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = prompt
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }
    setCopyStatus('Copied')
    window.setTimeout(() => setCopyStatus('Copy prompt'), 1400)
  }

  const downloadText = (content: string, filename: string, type = 'text/markdown') => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const slug = (project.businessName || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const exportBrief = () => downloadText(JSON.stringify(project, null, 2), `${slug}-brief.json`, 'application/json')
  const downloadPrompt = () => {
    if (!canExport) {
      setStageErrors(checks.filter((check) => !check.passed).map((check) => `${check.label}: ${check.detail}`))
      return
    }
    downloadText(prompt, `${slug}-PROMPT.md`)
  }

  const importBrief = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as ProjectData
      if (parsed.version !== 1 || !parsed.siteType) throw new Error('Invalid project')
      setProject({ ...defaultProject, ...parsed })
      setDirectionChoice(null)
      setLocks([])
      setStage(0)
      setReached(0)
    } catch {
      setStageErrors(['That file is not a Prompt Studio v1 brief.'])
    }
  }

  const startNew = () => {
    if (!window.confirm('Start a new brief? The current project will be replaced.')) return
    setProject({ ...blankProject, seed: Math.floor(Date.now() / 1000) % 10000 })
    setDirectionChoice(null)
    setLocks([])
    setStage(0)
    setReached(0)
  }

  const loadDemo = () => {
    setProject({ ...defaultProject, seed: defaultProject.seed + 1 })
    setDirectionChoice(null)
    setLocks([])
  }

  return (
    <div className={`app-shell ${showPreview ? 'preview-open' : ''}`}>
      <header className="app-header">
        <a className="wordmark" href="#main" aria-label="Prompt Studio home">
          <span className="wordmark-mark"><i /><i /><i /></span>
          <span><strong>Prompt</strong><b>Studio</b></span>
        </a>
        <div className="header-thesis">
          <span>Brief</span><i /> <span>Commission</span><i /> <span>Critique</span><i /> <strong>Design gate</strong>
        </div>
        <div className="header-actions">
          <span className="save-state"><FloppyDisk /> {saveStatus}</span>
          <button type="button" className="header-button" onClick={() => importRef.current?.click()}><FileArrowUp /> Import</button>
          <input
            ref={importRef}
            className="sr-only"
            type="file"
            accept="application/json"
            onChange={(event) => event.target.files?.[0] && void importBrief(event.target.files[0])}
          />
          <button type="button" className="header-button" onClick={startNew}><Plus /> New brief</button>
          <button type="button" className="header-button preview-button" onClick={() => setShowPreview((value) => !value)}>
            {showPreview ? <X /> : <Eye />} {showPreview ? 'Close' : 'Preview'}
          </button>
        </div>
      </header>

      <div className="workspace">
        <StageRail stages={stages} current={stage} reached={reached} onSelect={chooseStage} />

        <main id="main" className="builder-pane">
          <div className="stage-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(stage + 1) / stages.length})` }} /></div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              className="stage-panel"
              key={stages[stage].id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="stage-title">
                <span>{stages[stage].eyebrow}</span>
                <h1>{[
                  'Name the job before the look.',
                  'Design for the real decision-maker.',
                  'Give the direction a boundary.',
                  'Let real content determine the shape.',
                  'Choose motion by what it explains.',
                  'Run it like a real design studio.',
                  'Choose the territory that survives critique.',
                  'Send a prompt that can survive the build.',
                ][stage]}</h1>
                <p>{[
                  'Choose the surface, describe the offer plainly and define the one outcome this website must create.',
                  'Device, network, language and accessibility change the correct design long before animation begins.',
                  'A few useful traits set the register. The anti-goal prevents the generator from returning a polished cliché.',
                  'These objects become the section payload, proof system and content-length test inside the final specification.',
                  'The studio recommends mechanics from the story, media and constraints. You remain in control of the final set.',
                  'Assign authors, critics, handoffs and approval rights. The prompt forbids implementation until design keyframes pass the gate.',
                  'These are independent commissions with different structural DNA. Lock what works and reroll the rest.',
                  'Choose the receiving tool. The compiler changes implementation language without weakening the creative thesis.',
                ][stage]}</p>
              </div>

              {stage === 0 && (
                <div className="stage-content">
                  <div className="section-heading"><span>Website species</span><strong>Choose one</strong></div>
                  <div className="site-type-grid">
                    {siteTypes.map((item) => (
                      <Choice key={item.id} title={item.label} description={item.description} selected={project.siteType === item.id} onClick={() => selectSiteType(item.id)} compact />
                    ))}
                  </div>
                  <div className="form-grid two-up">
                    <Field label="Project or business name">
                      <input value={project.businessName} onChange={(event) => update('businessName', event.target.value)} placeholder="Northstar Studio" />
                    </Field>
                    <Field label="Primary action" hint="Use the words you want on the button.">
                      <input value={project.primaryAction} onChange={(event) => update('primaryAction', event.target.value)} placeholder="Book a private viewing" />
                    </Field>
                  </div>
                  <Field label="What does it offer?" hint="One concrete sentence in the buyer’s language.">
                    <textarea value={project.description} onChange={(event) => update('description', event.target.value)} rows={3} placeholder="A membership-based archive that gives independent researchers access to…" />
                  </Field>
                  <div className="section-heading"><span>Page shape</span><strong>Scope</strong></div>
                  <div className="choice-grid two">
                    <Choice title="Single-page experience" description="One complete narrative and conversion path." selected={project.pageMode === 'single'} onClick={() => selectPageMode('single')} />
                    <Choice title="Multi-page website" description="A route system with distinct page jobs, templates and journeys." selected={project.pageMode === 'multi'} onClick={() => selectPageMode('multi')} />
                  </div>
                </div>
              )}

              {stage === 1 && (
                <div className="stage-content">
                  <Field label="Who decides?" hint="Name their role, context, device and what they fear getting wrong.">
                    <textarea value={project.audience} onChange={(event) => update('audience', event.target.value)} rows={4} placeholder="A creative director reviewing on a laptop between meetings; they fear hiring a studio that can make a beautiful surface but cannot explain a decision." />
                  </Field>
                  <div className="section-heading"><span>Device bias</span><strong>First-class viewport</strong></div>
                  <div className="choice-grid three compact-options">
                    <Choice title="Balanced" description="Desktop and mobile carry equal weight." selected={project.deviceBias === 'balanced'} onClick={() => update('deviceBias', 'balanced')} />
                    <Choice title="Mobile first" description="The primary decision happens in-hand." selected={project.deviceBias === 'mobile'} onClick={() => update('deviceBias', 'mobile')} />
                    <Choice title="Desktop first" description="Complex evaluation or work happens wide." selected={project.deviceBias === 'desktop'} onClick={() => update('deviceBias', 'desktop')} />
                  </div>
                  <div className="form-grid two-up">
                    <Field label="Network profile">
                      <select value={project.network} onChange={(event) => update('network', event.target.value as ProjectData['network'])}>
                        <option value="constrained">Constrained — strict media budget</option>
                        <option value="typical">Typical — balanced budget</option>
                        <option value="fast">Fast — rich media is viable</option>
                      </select>
                    </Field>
                    <Field label="Accessibility target">
                      <select value={project.accessibility} onChange={(event) => update('accessibility', event.target.value as ProjectData['accessibility'])}>
                        <option value="AA">WCAG 2.2 AA</option>
                        <option value="AAA">WCAG 2.2 AAA</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Locale and direction" hint="Include multilingual or right-to-left needs now.">
                    <input value={project.locale} onChange={(event) => update('locale', event.target.value)} placeholder="English and Arabic, bilingual, RTL-aware" />
                  </Field>
                </div>
              )}

              {stage === 2 && (
                <div className="stage-content">
                  <div className="choice-grid two">
                    <Choice title="Create a new system" description="Generate palette, type and composition from the brief." selected={project.brandMode === 'new'} onClick={() => update('brandMode', 'new')} />
                    <Choice title="Use an existing brand" description="Treat supplied brand rules as the source of truth." selected={project.brandMode === 'existing'} onClick={() => update('brandMode', 'existing')} />
                  </div>
                  {project.brandMode === 'new' && (
                    <>
                      <div className="section-heading"><span>Logo production</span><strong>Choose the source of truth</strong></div>
                      <div className="choice-grid two compact-options">
                        <Choice title="Codex Images original" description="Use the generated raster identity directly—never trace or redraw it as vector." selected={project.logoSource === 'codex-image'} onClick={() => update('logoSource', 'codex-image')} />
                        <Choice title="Editable vector construction" description="Construct the final master as paths for deterministic production output." selected={project.logoSource === 'vector'} onClick={() => update('logoSource', 'vector')} />
                      </div>
                    </>
                  )}
                  <div className="section-heading"><span>Logo system</span><strong>{project.brandMode === 'new' ? 'Create as part of the build' : 'Preserve supplied assets'}</strong></div>
                  <div className="choice-grid three compact-options">
                    {([
                      ['auto', 'Studio decides', 'Choose the logo form from the subject, name and use cases.'],
                      ['wordmark', 'Wordmark', 'Make the name itself the recognizable asset.'],
                      ['monogram', 'Monogram', 'Build a compact mark from meaningful initials.'],
                      ['symbol', 'Symbol', 'Create a standalone sign with a strong silhouette.'],
                      ['combination', 'Combination', 'Pair a symbol with a deliberate wordmark.'],
                      ['responsive', 'Responsive set', 'Design related marks for wide, compact and tiny contexts.'],
                    ] as const).map(([id, title, description]) => (
                      <Choice key={id} title={title} description={description} selected={project.logoStyle === id} onClick={() => { update('logoStyle', id); setDirectionChoice(null) }} />
                    ))}
                  </div>
                  <Field label={project.brandMode === 'new' ? 'Logo concept seed' : 'Existing identity rules'} hint={project.brandMode === 'new' ? 'Name the relationship or behavior the mark should express. Avoid prescribing a trendy shape.' : 'List available files, lockups, clear space, minimum size and forbidden treatments.'}>
                    <textarea value={project.logoBrief} onChange={(event) => { update('logoBrief', event.target.value); setDirectionChoice(null) }} rows={3} placeholder={project.brandMode === 'new' ? 'Express reciprocal exchange between a grower and a neighborhood kitchen; avoid hands, hearts and generic leaves.' : 'Primary horizontal SVG and symbol-only SVG supplied. Never recolor the symbol; preserve one-cap-height clear space.'} />
                  </Field>
                  <div className="section-heading"><span>Desired register</span><strong>Choose up to three</strong></div>
                  <div className="tag-cloud">
                    {visualTraits.map((trait) => <Tag key={trait} selected={project.traits.includes(trait)} onClick={() => toggleTrait(trait)}>{trait}</Tag>)}
                  </div>
                  <Field label="Anti-goal" hint="The one visual outcome that would make this project wrong.">
                    <textarea value={project.antiGoal} onChange={(event) => update('antiGoal', event.target.value)} rows={4} placeholder="Do not make this feel like a venture-backed SaaS template: no glowing orb, no centered gradient headline, no anonymous three-card feature row." />
                  </Field>
                  <Field label="References" hint="One per line. Name the source, then say what to borrow, adapt or avoid.">
                    <textarea value={project.references} onChange={(event) => update('references', event.target.value)} rows={4} placeholder="https://example.com | borrow: editorial pacing | avoid: brand identity\nSwiss field guides | adapt: compact labels and exposed indexing" />
                  </Field>
                  <Field label="Reference performance bar" hint="Name what the best reference handles well. The candidate may look different, but cannot perform worse.">
                    <textarea value={project.referenceStrengths} onChange={(event) => update('referenceStrengths', event.target.value)} rows={4} placeholder="Match or exceed the reference in first-fold comprehension, visible product depth, evidence realism, hierarchy, restraint and conversion clarity." />
                  </Field>
                  <Field label="Category cliché blacklist" hint="At least three complete trend bundles, one per line—not isolated ingredients.">
                    <textarea value={project.categoryCliches} onChange={(event) => { update('categoryCliches', event.target.value); setDirectionChoice(null) }} rows={5} placeholder="Warm cream editorial system with oversized serif type and terracotta accent\nDark AI page with neon glow and floating dashboard collage\nBroadsheet grid with mono labels, rules and decorative numbering" />
                  </Field>
                  <Field label="Restraint rule" hint="Choose where the visual budget goes and what must stay quiet.">
                    <textarea value={project.restraintRule} onChange={(event) => update('restraintRule', event.target.value)} rows={3} placeholder="Spend visual emphasis on the inspectable product state only. Keep navigation, supporting headings, proof rows and secondary actions quiet." />
                  </Field>
                </div>
              )}

              {stage === 3 && (
                <div className="stage-content">
                  <Field label={currentSite.contentLabel} hint="One per line: title | concrete description. These strings shape the layout.">
                    <textarea value={project.contentItems} onChange={(event) => update('contentItems', event.target.value)} rows={7} placeholder={currentSite.contentPlaceholder} />
                  </Field>
                  <Field label="Proof" hint="Evidence, mechanism, sourceable outcome or reason to believe. Do not invent metrics.">
                    <textarea value={project.proof} onChange={(event) => update('proof', event.target.value)} rows={4} placeholder="Every recommendation links to the evidence and decision history that produced it." />
                  </Field>
                  <Field label="First-fold evidence" hint="Specify the exact product state, artifact or subject detail that must be legible before scrolling.">
                    <textarea value={project.heroEvidence} onChange={(event) => update('heroEvidence', event.target.value)} rows={4} placeholder="Show one realistic workspace state: a source quote, linked insight and approved decision visible together at actual content length." />
                  </Field>
                  {project.pageMode === 'multi' && (
                    <Field label="Route manifest" hint="One per line: path | page name | page job | unique payload. Shared navigation and footer do not count as page content.">
                      <textarea value={project.pagePlan} onChange={(event) => update('pagePlan', event.target.value)} rows={9} placeholder={routePlanSets[project.siteType]} />
                    </Field>
                  )}
                  <div className="section-heading"><span>Architecture</span><strong>{project.sections.length} sections selected</strong></div>
                  <div className="section-picker">
                    {sectionSets[project.siteType].map((section) => <Tag key={section} selected={project.sections.includes(section)} onClick={() => toggleSection(section)}>{section}</Tag>)}
                  </div>
                  <div className="add-row">
                    <label className="sr-only" htmlFor="custom-section">Custom section name</label>
                    <input id="custom-section" value={customSection} onChange={(event) => setCustomSection(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && (event.preventDefault(), addSection())} placeholder="Add a custom section" />
                    <button type="button" className="button-secondary" onClick={addSection}><Plus /> Add</button>
                  </div>
                  <div className="selected-sections">
                    {project.sections.map((section, index) => (
                      <button type="button" key={`${section}-${index}`} onClick={() => toggleSection(section)} title={`Remove ${section}`}>
                        <span>{String(index + 1).padStart(2, '0')}</span>{section}<X aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {stage === 4 && (
                <div className="stage-content">
                  <RangeField label="Motion intensity" hint="The chosen mechanic gets the budget; ordinary controls remain fast." value={project.motionIntensity} onChange={(value) => { update('motionIntensity', value); setDirectionChoice(null) }} />
                  <div className="section-heading"><span>What deserves motion?</span><strong>Subject</strong></div>
                  <div className="choice-grid three compact-options">
                    {([
                      ['none', 'Nothing spatial', 'Clarity and response matter more than a centerpiece.'],
                      ['product', 'Product workflow', 'An interface or mechanism needs explaining.'],
                      ['physical', 'Physical object', 'Material, configuration or spatial detail matters.'],
                      ['transformation', 'Transformation', 'A before-to-after sequence carries the story.'],
                      ['narrative', 'Narrative', 'The experience unfolds through ordered beats.'],
                    ] as const).map(([id, title, description]) => (
                      <Choice key={id} title={title} description={description} selected={project.mediaSubject === id} onClick={() => { update('mediaSubject', id); setDirectionChoice(null) }} />
                    ))}
                  </div>
                  <div className="recommendation-bar">
                    <div><Sparkle weight="fill" /><span><strong>Studio recommendation</strong><small>Based on media, network, accessibility and intensity.</small></span></div>
                    <button type="button" className="button-secondary" onClick={applyRecommendations}>Apply recommended set</button>
                  </div>
                  <div className="mechanics-list">
                    {mechanics.map((item) => {
                      const recommendation = recommendations.find((entry) => entry.id === item.id)
                      return (
                        <Choice
                          key={item.id}
                          title={item.label}
                          description={`${item.description} ${recommendation?.reason ?? ''}`}
                          selected={project.mechanics.includes(item.id)}
                          onClick={() => toggleMechanic(item.id)}
                          marker={<span className={`cost cost-${item.cost}`}>{recommendation?.recommended ? 'Recommended' : item.cost}</span>}
                        />
                      )
                    })}
                  </div>
                </div>
              )}

              {stage === 5 && (
                <div className="stage-content studio-stage">
                  <div className="section-heading"><span>Operating model</span><strong>Separate authorship from approval</strong></div>
                  <div className="choice-grid three compact-options process-modes">
                    <Choice title="Design sprint" description="Three commissions, one formal critique and a compressed keyframe gate." selected={project.processMode === 'sprint'} onClick={() => applyProcessMode('sprint')} />
                    <Choice title="Independent studio" description="Four commissions, two critiques and specialists with explicit handoffs." selected={project.processMode === 'studio'} onClick={() => applyProcessMode('studio')} />
                    <Choice title="Atelier" description="Five commissions, three critiques and deeper identity, type and art-direction studies." selected={project.processMode === 'atelier'} onClick={() => applyProcessMode('atelier')} />
                  </div>

                  <div className="studio-metrics">
                    <Field label="Independent concept commissions" hint="Each starts from the brief, not from another concept.">
                      <select value={project.conceptCount} onChange={(event) => { update('conceptCount', Number(event.target.value)); setDirectionChoice(null) }}>
                        <option value="3">3 territories</option>
                        <option value="4">4 territories</option>
                        <option value="5">5 territories</option>
                      </select>
                    </Field>
                    <Field label="Formal critique rounds" hint="Keep/change/kill decisions are written after each round.">
                      <select value={project.critiqueRounds} onChange={(event) => update('critiqueRounds', Number(event.target.value))}>
                        <option value="1">1 round</option>
                        <option value="2">2 rounds</option>
                        <option value="3">3 rounds</option>
                      </select>
                    </Field>
                  </div>

                  <div className="section-heading"><span>Project room</span><strong>{project.studioRoles.length} accountable roles</strong></div>
                  <div className="role-board">
                    {studioRoles.map((role) => {
                      const selected = project.studioRoles.includes(role.id)
                      return (
                        <button key={role.id} type="button" className={`role-card ${selected ? 'is-selected' : ''}`} onClick={() => toggleStudioRole(role.id)} aria-pressed={selected}>
                          <span className="role-status">{selected ? <Check weight="bold" /> : null}</span>
                          <strong>{role.label}</strong>
                          <p>{role.task}</p>
                          <span className="role-output">Output · {role.deliverable}</span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="section-heading"><span>Gate sequence</span><strong>No screen goes straight from idea to code</strong></div>
                  <ol className="studio-timeline">
                    <li><b>01</b><span><strong>Brief and category audit</strong><small>Strategy frames the problem and identifies visual conventions to use, invert or reject.</small></span></li>
                    <li><b>02</b><span><strong>Independent commissions</strong><small>Each territory changes at least four axes: topology, type, color, image, shape or motion.</small></span></li>
                    <li><b>03</b><span><strong>Critique and similarity veto</strong><small>The critic can kill polished work that shares the same underlying grammar.</small></span></li>
                    <li><b>04</b><span><strong>Art-direction studies</strong><small>Type specimens, color studies, logo candidates and composition tests precede full pages.</small></span></li>
                    <li><b>05</b><span><strong>Responsive keyframes</strong><small>Approve home, a deep interior route, mobile and one state before systemization.</small></span></li>
                    <li><b>06</b><span><strong>System, build and visual QA</strong><small>Only the approved keyframes become components, templates and production code.</small></span></li>
                  </ol>

                  <Field label="Decision rights" hint="Name who recommends, who critiques and who has final approval.">
                    <textarea value={project.decisionOwner} onChange={(event) => update('decisionOwner', event.target.value)} rows={3} placeholder="The creative director recommends; the project owner approves after independent critique." />
                  </Field>
                  <Field label="Design-gate criteria" hint="Write conditions that can reject a beautiful but generic design.">
                    <textarea value={project.approvalCriteria} onChange={(event) => update('approvalCriteria', event.target.value)} rows={4} placeholder="Advance only when the chosen territory is subject-specific, structurally unlike the alternates, legible at desktop and mobile, and complete enough to judge without imagined animation." />
                  </Field>
                  <Field label="Reference-parity gate" hint="Define the dimensions scored side by side at the same viewports. No core dimension may regress.">
                    <textarea value={project.benchmarkCriteria} onChange={(event) => update('benchmarkCriteria', event.target.value)} rows={4} placeholder="Score first-fold comprehension, product visibility, evidence realism, typographic hierarchy, restraint, brand cohesion, conversion clarity and mobile translation against the strongest reference. No candidate may score lower at approval." />
                  </Field>
                </div>
              )}

              {stage === 6 && (
                <div className="stage-content direction-stage">
                  <div className="commission-note">
                    <span>{directions.length} independent commissions</span>
                    <strong>These are hypotheses, not approvals. Reject any territory that falls below the reference bar.</strong>
                    <p>Compare topology, typography, palette/value, image language, shape, motion and the named template risk. Novelty cannot compensate for weaker comprehension or product evidence.</p>
                  </div>
                  <div className="direction-grid">
                    {directions.map((direction, index) => (
                      <DirectionCard key={direction.id} direction={direction} selected={selectedDirection?.id === direction.id} recommended={index === 0} onSelect={() => setDirectionChoice(direction)} />
                    ))}
                  </div>
                  {selectedDirection && (
                    <>
                      <DirectionTools locks={locks} onToggleLock={toggleLock} onReroll={rerollSelected} onRerollAll={rerollAll} />
                      <div className="direction-detail">
                        <div><span>Logo system</span><p>{selectedDirection.logo.concept} {selectedDirection.logo.construction}</p></div>
                        <div><span>Hero composition</span><p>{selectedDirection.hero}</p></div>
                        <div><span>Structural rhythm</span><p>{selectedDirection.structure}</p></div>
                        <div><span>Grid system</span><p>{selectedDirection.gridSystem}</p></div>
                        <div><span>Image language</span><p>{selectedDirection.imageLanguage}</p></div>
                        <div><span>Shape grammar</span><p>{selectedDirection.shapeLanguage}</p></div>
                        <div><span>Signature mechanic</span><p>{selectedDirection.signature}</p></div>
                        <div><span>Template risk</span><p>{selectedDirection.templateRisk}</p></div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {stage === 7 && (
                <div className="stage-content">
                  <div className="section-heading"><span>Receiving tool</span><strong>The prompt adapts</strong></div>
                  <div className="target-grid">
                    {(Object.entries(targetLabels) as [OutputTarget, string][]).map(([id, label]) => (
                      <Choice key={id} title={label} description={{
                        framer: 'Native stacks, components, CMS, variants and scroll effects.',
                        code: 'File tree, implementation stack, component boundaries and QA.',
                        lovable: 'Surface-by-surface instructions with strong visual guardrails.',
                        figma: 'Variables, frames, component states and designer-first order.',
                        webflow: 'Components, variables, CMS and interaction constraints.',
                        html: 'Semantic HTML, modern CSS and progressive enhancement.',
                      }[id]} selected={project.outputTarget === id} onClick={() => update('outputTarget', id)} />
                    ))}
                  </div>
                  <Field label="Final requirements" hint="Integrations, CMS, routes, compliance or details that must survive handoff.">
                    <textarea value={project.extraRequirements} onChange={(event) => update('extraRequirements', event.target.value)} rows={4} placeholder="Include a bilingual CMS, HubSpot form routing and legal review for every outcome claim." />
                  </Field>
                  <div className="handoff-summary">
                    <div><span>Direction</span><strong>{selectedDirection?.name}</strong><small>{selectedDirection?.descriptor}</small></div>
                    <div><span>Output</span><strong>{targetLabels[project.outputTarget]}</strong><small>{prompt.trim().split(/\s+/).length.toLocaleString()} words compiled</small></div>
                    <div><span>Quality</span><strong>{checks.filter((check) => check.passed).length}/{checks.length} gates</strong><small>{project.sections.length} sections · {project.mechanics.length} mechanics</small></div>
                  </div>
                  {!canExport && (
                    <div className="gate-errors" role="alert">
                      <strong>Prompt export is blocked.</strong>
                      <ul>{checks.filter((check) => !check.passed).map((check) => <li key={check.label}>{check.label}: {check.detail}</li>)}</ul>
                    </div>
                  )}
                  <div className="handoff-actions">
                    <button type="button" className="button-primary large" onClick={copyPrompt} disabled={!canExport} title={canExport ? 'Copy approved prompt' : 'Complete every hard gate before export'}><Check /> {copyStatus}</button>
                    <button type="button" className="button-secondary large" onClick={downloadPrompt} disabled={!canExport} title={canExport ? 'Download approved prompt' : 'Complete every hard gate before export'}><DownloadSimple /> Download prompt</button>
                    <button type="button" className="button-secondary large" onClick={exportBrief}><ArrowSquareOut /> Export brief JSON</button>
                    <button type="button" className="button-quiet large" onClick={loadDemo}>Load demo brief</button>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {stageErrors.length > 0 && (
                  <motion.div className="gate-errors" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert">
                    <strong>This stage needs another decision.</strong>
                    <ul>{stageErrors.map((error) => <li key={error}>{error}</li>)}</ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="stage-navigation">
                <button type="button" className="button-quiet" onClick={goBack} disabled={stage === 0}><ArrowLeft /> Back</button>
                {stage < stages.length - 1 ? (
                  <button type="button" className="button-primary" onClick={goNext}>Continue to {stages[stage + 1].label}<ArrowRight /></button>
                ) : (
                  <button type="button" className="button-primary" onClick={() => setShowPreview(true)}><Eye /> Review full prompt</button>
                )}
              </div>
            </motion.section>
          </AnimatePresence>
        </main>

        <div className="preview-pane">
          <PromptPreview prompt={prompt} direction={selectedDirection} checks={checks} canExport={canExport} onCopy={copyPrompt} onDownload={downloadPrompt} copyStatus={copyStatus} />
        </div>
      </div>
    </div>
  )
}
