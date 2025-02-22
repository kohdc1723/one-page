import { View, Text, StyleSheet } from "@react-pdf/renderer";

import { Header as HeaderType } from "@prisma/client";
import HorizontalLine from "../common/horizontal-line";

interface HeaderProps {
  header: HeaderType;
}

export default function Header({ header }: HeaderProps) {
  if (!header) return null;

  const {
    firstName,
    lastName,
    location,
    email,
    phone,
    links
  } = header;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <View style={styles.contactContainer}>
          <Text>{location}</Text>
          <Text>•</Text>
          <Text>{email}</Text>
          <Text>•</Text>
          <Text>{phone}</Text>
          {links.map((link: string, index: number) => (
            <View
              key={`${link}-${index}`}
              style={styles.link}
            >
              <Text>•</Text>
              <Text>{link}</Text>
            </View>
          ))}
        </View>
      </View>
      <HorizontalLine />
    </View>
  );
}

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
    gap: 4
  },
  contactContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
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