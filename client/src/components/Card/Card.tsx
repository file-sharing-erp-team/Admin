import React, { MouseEventHandler } from "react";
import { StyledCard, StyledFooter, StyledTitle } from "./styles";
import { ButtonVariant } from "../Button/Button";
import { Button } from "../index";

export type CardProps = {
  title?: string | React.ReactNode;
  body?: string | React.ReactNode;
  onClick?: MouseEventHandler;
};

const Card: React.ForwardRefRenderFunction<unknown, CardProps> = (
  props,
  ref
) => {
  const { title = "", body = "", onClick = () => {} } = props;

  return (
    <StyledCard>
      <StyledTitle>{title}</StyledTitle>
      <StyledTitle>{body}</StyledTitle>

      <Button variant={ButtonVariant.primary} onClick={onClick}>
        Перейти
      </Button>
    </StyledCard>
  );
};

export default React.forwardRef<unknown, CardProps>(Card);
