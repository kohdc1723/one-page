import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export default function ResumeDocument({ resume }) {
  const { contact } = resume;

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: 'Helvetica',
    },
    section: {
      marginBottom: 10,
    },
    header: {
      fontSize: 20,
      marginBottom: 20,
    },
    subsection: {
      marginLeft: 10,
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text>{contact.name}</Text>
          <Text>{contact.email}</Text>
          <Text>{contact.phone}</Text>
          <Text>{contact.location}</Text>
        </View>
      </Page>
    </Document>
  );
}