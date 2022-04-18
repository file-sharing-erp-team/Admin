import React from "react";
import { BreadcrumbsContainer, Crumb } from "./style";
import { Link } from "react-router-dom";

interface ICrumb {
  label: string;
  link: string;
}

interface BreadcrumbsProps {
  values?: Array<ICrumb>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ values, children }) => {
  return (
    <BreadcrumbsContainer>
      {values !== undefined &&
        values.length > 0 &&
        values.map((crumb, index) => {
          return (
            <>
              <Crumb key={index}>
                <Link key={index} to={crumb.link}>
                  {crumb.label}
                </Link>
              </Crumb>
              {index < values.length - 1 ? (
                <Crumb key={index + 1000000}> {">"} </Crumb>
              ) : null}
            </>
          );
        })}
    </BreadcrumbsContainer>
  );
};

export default Breadcrumbs;
