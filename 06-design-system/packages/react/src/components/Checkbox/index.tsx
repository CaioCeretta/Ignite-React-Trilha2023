import { Check } from "phosphor-react";
import { CheckBoxContainer, CheckboxIndicator } from "./styles";
import type { ComponentProps } from "react";
import type { CheckboxProps } from "@radix-ui/react-checkbox";

export interface CheckBoxProps extends ComponentProps<typeof CheckBoxContainer>{}

/**
 * asChild prop, the asChild basically says that, when we put an element on the screen, such as the CheckboxIndicator, we
 * want, for example, to avoid creating a new div or element on the screen, we just want its funcionality, and it is passed
 * to the child component of it, so we can say to the processor, for it to no create a new div inside our checkbox, so by
 * passing it, the CheckboxIndicator won't be created on screen, just its funcionalities 
*/

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckBoxContainer {...props}>
      <CheckboxIndicator asChild>
        <Check weight="bold"/>
      </CheckboxIndicator>
    </CheckBoxContainer>
  )
}

Checkbox.displayName = 'CheckBox'