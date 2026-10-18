export type SiteType =
  | 'marketing'
  | 'saas'
  | 'ecommerce'
  | 'portfolio'
  | 'editorial'
  | 'docs'
  | 'dashboard'
  | 'event'
  | 'hospitality'
  | 'nonprofit'
  | 'custom'

export type OutputTarget =
  | 'framer'
  | 'code'
  | 'lovable'
  | 'figma'
  | 'webflow'
  | 'html'

export type DeviceBias = 'balanced' | 'mobile' | 'desktop'
export type NetworkProfile = 'constrained' | 'typical' | 'fast'
export type AccessibilityLevel = 'AA' | 'AAA'
export type MediaSubject = 'none' | 'product' | 'physical' | 'transformation' | 'narrative'
export type LogoStyle = 'auto' | 'wordmark' | 'monogram' | 'symbol' | 'combination' | 'responsive'
export type LogoSource = 'codex-image' | 'vector'
export type ProcessMode = 'studio' | 'atelier' | 'sprint'

export type StudioRoleId =
  | 'strategy'
  | 'creative-direction'
  | 'art-direction'
  | 'ux-architecture'
  | 'identity'
  | 'typography'
  | 'content-design'
  | 'interaction'
  | 'design-systems'
  | 'critique'
  | 'design-engineering'

export type MechanicId =
  | 'micro'
  | 'transitions'
  | 'parallax'
  | 'scrollVideo'
  | 'threeD'
  | 'scrollytelling'
  | 'kineticType'

export type DirectionLock = 'palette' | 'type' | 'identity' | 'composition' | 'motion'

export interface LogoSystem {
  style: Exclude<LogoStyle, 'auto'>
  concept: string
  construction: string
  lockups: string
  usage: string
}

export interface ProjectData {
  version: 1
  siteType: SiteType
  businessName: string
  description: string
  primaryAction: string
  pageMode: 'single' | 'multi'
  pagePlan: string
  audience: string
  deviceBias: DeviceBias
  network: NetworkProfile
  accessibility: AccessibilityLevel
  locale: string
  brandMode: 'new' | 'existing'
  logoSource: LogoSource
  logoStyle: LogoStyle
  logoBrief: string
  traits: string[]
  antiGoal: string
  references: string
  referenceStrengths: string
  categoryCliches: string
  restraintRule: string
  proof: string
  heroEvidence: string
  contentItems: string
  sections: string[]
  mediaSubject: MediaSubject
  motionIntensity: number
  mechanics: MechanicId[]
  processMode: ProcessMode
  studioRoles: StudioRoleId[]
  conceptCount: number
  critiqueRounds: number
  decisionOwner: string
  approvalCriteria: string
  benchmarkCriteria: string
  outputTarget: OutputTarget
  extraRequirements: string
  seed: number
}

export interface Palette {
  name: string
  ground: string
  surface: string
  ink: string
  muted: string
  accent: string
  line: string
}

export interface FontPair {
  name: string
  display: string
  body: string
  utility: string
  strategy: string
}

export interface CreativeDirection {
  id: string
  name: string
  descriptor: string
  rationale: string
  palette: Palette
  fonts: FontPair
  hero: string
  structure: string
  signature: string
  motionProfile: string
  density: 'airy' | 'balanced' | 'dense'
  formThesis: string
  topology: string
  gridSystem: string
  imageLanguage: string
  shapeLanguage: string
  templateRisk: string
  logo: LogoSystem
}

export interface StudioRole {
  id: StudioRoleId
  label: string
  task: string
  deliverable: string
  authority: string
}

export interface SiteTypeOption {
  id: SiteType
  label: string
  description: string
  contentLabel: string
  contentPlaceholder: string
}

export interface MechanicOption {
  id: MechanicId
  label: string
  description: string
  cost: 'light' | 'medium' | 'heavy'
}

export interface QualityCheck {
  label: string
  detail: string
  passed: boolean
}
