import { SkillItem as SkillItemType } from "@prisma/client";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface SkillItemProps {
  skillItem: SkillItemType;
}

export default function SkillItem({ skillItem }: SkillItemProps) {
  const {
    category,
    skills
  } = skillItem;

  const skillsList = skills.join(" • ");

  return (
    <View style={styles.container}>
      {category && <Text>{category}</Text>}
      <Text>{skillsList}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  }
});
