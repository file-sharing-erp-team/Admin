import React from "react";
import styled from "@emotion/styled";

interface Tab {
  title: string;
  value: string;
}

export type TabsProps = {
  current?: number;
  options: Array<Tab>;
  onClick?: any;
  setValue?: any;
};

const StyledTabList = styled.div`
  display: flex;
  width: 100%;
`;

const StyledTab = styled.div`
  width: 8rem;
  padding: 1rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4rem;
  cursor: pointer;

  &.current {
    border-bottom: 1px solid #0000ff;
    transition-duration: 0.2s;
  }
`;

const Tabs: React.FC<TabsProps> = ({
  current = 0,
  options,
  onClick,
  setValue,
  children,
}) => {
  return (
    <StyledTabList>
      {options.map((option, index) => {
        const isCurrent = current === index ? "current" : "";
        return (
          <StyledTab
            onClick={() => {
              onClick(index);
              setValue(option.value);
            }}
            className={isCurrent}
            key={index}
          >
            <span>{option.title}</span>
          </StyledTab>
        );
      })}
    </StyledTabList>
  );
};

export default Tabs;
