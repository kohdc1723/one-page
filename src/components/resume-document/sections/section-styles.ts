import { StyleSheet } from "@react-pdf/renderer";

export const sectionStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 5
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: 12,
    fontWeight: "bold"
  }
});