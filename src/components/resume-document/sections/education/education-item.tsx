import { EducationItem as EducationItemType } from "@prisma/client";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface EducationItemProps {
  educationItem: EducationItemType;
}

export default function EducationItem({ educationItem }: EducationItemProps) {
  const {
    school,
    degree,
    field,
    startDate,
    endDate,
    bullets,
    isCurrent,
    location
  } = educationItem;

  const startDateString = new Date(startDate).toLocaleDateString("en-CA", { month: "long", year: "numeric" });
  const endDateString = isCurrent
    ? "Present"
    : new Date(endDate!).toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  return (
    <View>
      <Text style={styles.header}>{degree} in {field}</Text>
      <View style={styles.schoolContainer}>
        <View style={styles.schoolInfo}>
          <Text>{school}</Text>
          <Text>•</Text>
          <Text>{location}</Text>
        </View>
        <Text>{startDateString} - {endDateString}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 12,
  },
  schoolContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  schoolInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 5
  }
});