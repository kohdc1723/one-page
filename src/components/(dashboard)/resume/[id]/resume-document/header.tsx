import { View, Text, StyleSheet } from "@react-pdf/renderer";

export default function Header({ header }) {
  const styles = StyleSheet.create({
    name: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center"
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      gap: 2
    },
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 8
    },
    contactContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: 8
    },
    horizontalLine: {
      width: "100%",
      borderTop: 1
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.name}>
          {header.name}
        </Text>
        <View style={styles.contactContainer}>
          <Text>{header.email}</Text>
          <Text>{header.phone}</Text>
          <Text>{header.location}</Text>
        </View>
      </View>
      <View style={styles.horizontalLine}></View>
    </View>
  );
}