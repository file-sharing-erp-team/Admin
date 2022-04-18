import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../Header/Header";

export type ActivityCardProps = {
  id: number;
  title: string;
  description: string;
  date?: string;
  flag?: string;
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 8rem;
  background-color: white;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  z-index: 4;
`;

const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  title,
  description,
  date,
  flag = "material",
  children,
}) => {
  const navigate = useNavigate();

  const navigateTo = (id: number) => {
    navigate(`/${flag}/${id}`);
  };

  return (
    <StyledCard onClick={() => navigateTo(id)}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div onClick={() => navigateTo(id)}>
          <Header>{title}</Header>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>{date}</div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <span>{description}</span>
      </div>
    </StyledCard>
  );
};

export default ActivityCard;
