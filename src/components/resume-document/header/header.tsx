import { View, Text, StyleSheet } from "@react-pdf/renderer";

import { Header as HeaderType } from "@prisma/client";
import HorizontalLine from "../common/horizontal-line";

interface HeaderProps {
  header: HeaderType;
}

export default function Header({ header }: HeaderProps) {
  if (!header) return null;

  const {
    fullName,
    location,
    email,
    phone,
    links
  } = header;

  const contactArray = [
    location,
    email,
    phone,
    ...links
  ].filter(Boolean);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {fullName}
          </Text>
        </View>
        <View style={styles.contactContainer}>
          {contactArray.map((item, index, array) => (
            <View key={`contact-${index}`} style={styles.contactItem}>
              <Text>{item}</Text>
              {index < array.length - 1 && <Text>•</Text>}
            </View>
          ))}
        </View>
      </View>
      <HorizontalLine />
    </View>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4
  },
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
    alignItems: "center",
    gap: 4
  },
  contactContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    // justifyContent: "",
    flexWrap: "wrap",
    gap: 4,
    rowGap: 1
  },
  contactItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  horizontalLine: {
    width: "100%",
    borderTop: 1
  },
  link: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  }
});