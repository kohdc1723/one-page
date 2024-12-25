import { StyleSheet, Text, View } from "@react-pdf/renderer";

export default function WorkExperience({ workExperience }) {
  const styles = StyleSheet.create({
    sectionContainer: {
    },
    labelContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "left"
    },
    horizontalLine: {
      width: "100%",
      borderTop: 1
    }
  });

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>WORK EXPERIENCE</Text>
        <View style={styles.horizontalLine}></View>
      </View>
    </View>
  );
}