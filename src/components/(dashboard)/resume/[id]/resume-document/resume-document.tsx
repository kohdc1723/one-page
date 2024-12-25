import { Document, Page, StyleSheet } from "@react-pdf/renderer";

import Header from "./header";
import WorkExperience from "./work-experience";
import Projects from "./projects";
import Skills from "./skills";
import Education from "./education";

export default function ResumeDocument({ resume }) {
  const { header, contents } = resume;

  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 10,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  });

  return (
    <Document
      title="resume"
      pageLayout="singlePage"
    >
      <Page
        size="LETTER"
        orientation="portrait"
        style={styles.page}
      >
        <Header header={header} />
        <WorkExperience workExperience={contents.workExperience} />
        <Projects />
        <Skills />
        <Education />
      </Page>
    </Document>
  );
}