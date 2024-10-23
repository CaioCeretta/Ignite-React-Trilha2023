import type { ComponentProps } from "react";
import { AvatarContainer, AvatarFallBack, AvatarImage } from "./styles";
import { User } from 'phosphor-react'

export interface AvatarProps extends ComponentProps<typeof AvatarImage>{}

export function Avatar(props: AvatarProps) {
  return (
    <AvatarContainer>
      <AvatarImage {...props}/>
      
      <AvatarFallBack delayMs={600}>
        <User />
      </AvatarFallBack>
    </AvatarContainer>
  )
}

Avatar.displayName = 'Avatar'