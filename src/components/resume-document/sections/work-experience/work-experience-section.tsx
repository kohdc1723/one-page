import { View, Text, StyleSheet } from "@react-pdf/renderer";

import { WorkExperienceWithRelations } from "@/types/resume";
import HorizontalLine from "../../common/horizontal-line";
import WorkExperienceItem from "./work-experience-item";

interface WorkExperienceSectionProps {
  workExperienceItems: WorkExperienceWithRelations[];
}

export default function WorkExperienceSection({ workExperienceItems }: WorkExperienceSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          WORK EXPERIENCE
        </Text>
        <HorizontalLine />
      </View>
      <View>
        {workExperienceItems.map(item => (
          <WorkExperienceItem
            key={item.id}
            workExperienceItem={item}
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