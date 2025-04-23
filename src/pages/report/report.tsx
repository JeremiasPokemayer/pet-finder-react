import React from "react";
import { ReportPets } from "../../components/reportPet/reportComponent";
import { Link } from "react-router";

export class Report extends React.Component<any, any> {
  render() {
    return (
      <div>
        <ReportPets />
      </div>
    );
  }
}
