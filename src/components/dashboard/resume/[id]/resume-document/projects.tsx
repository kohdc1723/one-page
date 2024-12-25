import { StyleSheet, Text, View } from "@react-pdf/renderer";

export default function Projects() {
  const styles = StyleSheet.create({
    sectionContainer: {

    },
    labelContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    },
    labelText: {
      fontSize: 14
    },
    horizontalLine: {
      width: "100%",
      borderTop: 1
    }
  });

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>PROJECTS</Text>
        <View style={styles.horizontalLine}></View>
      </View>
    </View>
  );
}