import { Card, PanelContent } from "@/components";
import Table from "@/components/themes/table";
import React from "react";

const About = () => {
  return (
    <PanelContent
      title="About"
      menu="Data Master"
      submenu="About"
      headerContent
    >
      <Card title="About">About</Card>
      <Table  />
    </PanelContent>
  );
};

export default About;
