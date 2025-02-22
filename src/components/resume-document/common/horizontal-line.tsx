import { StyleSheet, View } from "@react-pdf/renderer";

export default function HorizontalLine() {
  return <View style={styles.horizontalLine}></View>;
}

const styles = StyleSheet.create({
  horizontalLine: {
    width: "100%",
    borderTop: 1
  }
});
