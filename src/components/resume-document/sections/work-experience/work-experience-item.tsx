import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { WorkExperienceWithRelations } from "@/types/resume";
import Position from "./position";

interface WorkExperienceItemProps {
  workExperienceItem: WorkExperienceWithRelations;
}

export default function WorkExperienceItem({ workExperienceItem }: WorkExperienceItemProps) {
  const { company, location, positions } = workExperienceItem;
  
  return (
    <View style={styles.container}>
      {/* company header */}
      <View style={styles.header}>
        <Text style={styles.company}>{company}</Text>
        <Text>•</Text>
        <Text>{location}</Text>
      </View>
      {/* positions */}
      <View style={styles.positionsContainer}>
        {positions.map(position => (
          <Position
            key={position.id}
            position={position}
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5
  },
  company: {
    fontSize: 12,
    fontWeight: "bold"
  },
  positionsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  positionItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  positionTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  positionDateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  positionHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  positionTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  bulletsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }
});
