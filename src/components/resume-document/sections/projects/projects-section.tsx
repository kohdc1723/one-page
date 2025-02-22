import { ProjectItem as ProjectItemType } from "@prisma/client";
import ProjectItem from "./project-item";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import HorizontalLine from "../../common/horizontal-line";

interface ProjectsSectionProps {
  projectItems: ProjectItemType[];
}

export default function ProjectsSection({ projectItems }: ProjectsSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          PROJECTS
        </Text>
        <HorizontalLine />
      </View>
      <View>
        {projectItems.map(item => (
          <ProjectItem
            key={item.id}
            projectItem={item}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2
  },
  title: {
    fontSize: 12,
    fontWeight: "bold"
  }
});