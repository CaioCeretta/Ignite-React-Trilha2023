import type { ComponentProps } from "react";
import { Input, PrefixedInput, TextInputContainer } from "./styles";

export interface TextInputProps extends ComponentProps<typeof Input> {
  prefix?: string
}

export function TextInput(props: TextInputProps) {
  return (
    <TextInputContainer>
      {!!props.prefix && <PrefixedInput>{props.prefix}</PrefixedInput>}
      <Input {...props}/>
    </TextInputContainer>
  )
}