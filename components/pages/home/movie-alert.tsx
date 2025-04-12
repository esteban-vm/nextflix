import { Home as UI } from '@/components/styled'

export function MovieAlert({ children }: Props.WithChildren) {
  return (
    <UI.MovieAlert.StyledAlert>
      <UI.MovieAlert.Title>
        <UI.MovieAlert.IconMovie /> Lista vacía
      </UI.MovieAlert.Title>
      <UI.MovieAlert.Description>{children}</UI.MovieAlert.Description>
    </UI.MovieAlert.StyledAlert>
  )
}
