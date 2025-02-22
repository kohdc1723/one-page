import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { ProjectItem as ProjectItemType } from "@prisma/client";

interface ProjectItemProps {
  projectItem: ProjectItemType;
}

export default function ProjectItem({ projectItem }: ProjectItemProps) {
  const {
    title,
    bullets,
    startDate,
    isCurrent,
    endDate
  } = projectItem;

  const startDateString = new Date(startDate).toLocaleDateString("en-CA", { month: "long", year: "numeric" });
  const endDateString = isCurrent
    ? "Present"
    : new Date(endDate!).toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text>{title}</Text>
        <Text>{startDateString} - {endDateString}</Text>
      </View>
      {/* bullets */}
      <View style={styles.bulletsContainer}>
        {bullets.map((bullet, index) => (
          <Text key={index}>
            • {bullet}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bulletsContainer: {
    display: "flex",
    flexDirection: "column"
  }
});