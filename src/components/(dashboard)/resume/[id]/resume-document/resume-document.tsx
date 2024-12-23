import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import Header from "./header";

export default function ResumeDocument({ resume }) {
  const { header } = resume;

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 11,
    }
  });

  return (
    <Document
      title="resume"
      pageLayout="singlePage"
    >
      <Page
        size="LETTER"
        orientation="portrait"
        style={styles.page}
      >
        <Header header={header} />
      </Page>
    </Document>
  );
}