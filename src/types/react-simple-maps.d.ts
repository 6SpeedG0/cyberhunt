declare module 'react-simple-maps' {
  import type { CSSProperties, ReactNode, MouseEvent } from 'react'

  interface GeoStyle {
    fill?: string
    stroke?: string
    strokeWidth?: number
    outline?: string
    cursor?: string
  }

  export interface Geography {
    rsmKey: string
    properties: Record<string, unknown>
    geometry: unknown
    type: string
  }

  export function ComposableMap(props: {
    projection?: string
    projectionConfig?: Record<string, unknown>
    style?: CSSProperties
    children?: ReactNode
  }): JSX.Element

  export function Geographies(props: {
    geography: string | object
    children: (args: { geographies: Geography[] }) => ReactNode
  }): JSX.Element

  export function Geography(props: {
    key?: string
    geography: Geography
    onClick?: (event: MouseEvent) => void
    onMouseEnter?: (event: MouseEvent) => void
    onMouseLeave?: (event: MouseEvent) => void
    style?: { default?: GeoStyle; hover?: GeoStyle; pressed?: GeoStyle }
  }): JSX.Element
}
