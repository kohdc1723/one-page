import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";

import { ResumeWithRelations, SectionWithRelations } from "@/types/resume";
import { SectionType } from "@prisma/client";
import Header from "./header/header";
import WorkExperienceSection from "./sections/work-experience/work-experience-section";
import ProjectsSection from "./sections/projects/projects-section";
import SkillsSection from "./sections/skills/skills-section";
import EducationSection from "./sections/education/education-section";

interface ResumeDocumentProps {
  resume: ResumeWithRelations;
}

export default function ResumeDocument({ resume }: ResumeDocumentProps) {
  const { header, sections } = resume;

  const renderSection = (section: SectionWithRelations) => {
    switch (section.type) {
      case SectionType.WORK_EXPERIENCE:
        return (
          <WorkExperienceSection
            key={section.id}
            workExperienceItems={section.workExperienceItems}
          />
        );
      case SectionType.PROJECTS:
        return (
          <ProjectsSection
            key={section.id}
            projectItems={section.projectItems}
          />
        );
      case SectionType.SKILLS:
        return (
          <SkillsSection
            key={section.id}
            skillItems={section.skillItems}
          />
        );
      case SectionType.EDUCATION:
        return (
          <EducationSection
            key={section.id}
            educationItems={section.educationItems}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Document
      title={resume.title}
      pageLayout="singlePage"
    >
      <Page
        size="LETTER"
        orientation="portrait"
        style={styles.page}
      >
        <Header header={header!} />
        <View style={styles.body}>
          {sections.map(section => renderSection(section))}
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
});