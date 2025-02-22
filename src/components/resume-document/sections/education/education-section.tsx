import { StyleSheet, Text, View } from "@react-pdf/renderer";
import EducationItem from "./education-item";
import { EducationItem as EducationItemType } from "@prisma/client";
import HorizontalLine from "../../common/horizontal-line";

interface EducationSectionProps {
  educationItems: EducationItemType[];
}

export default function EducationSection({ educationItems }: EducationSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          EDUCATION
        </Text>
        <HorizontalLine />
      </View>
      <View>
        {educationItems.map(item => (
          <EducationItem
            key={item.id}
            educationItem={item}
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