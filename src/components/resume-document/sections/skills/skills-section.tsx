import { SkillItem as SkillItemType } from "@prisma/client";
import SkillItem from "./skill-item";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import HorizontalLine from "../../common/horizontal-line";

interface SkillsProps {
  skillItems: SkillItemType[];
}

export default function Skills({ skillItems }: SkillsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          SKILLS
        </Text>
        <HorizontalLine />
      </View>
      <View>
        {skillItems.map(item => (
          <SkillItem
            key={item.id}
            skillItem={item}
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