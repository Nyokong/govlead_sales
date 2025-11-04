import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
  Image,
} from "@react-pdf/renderer";
import { NextResponse } from "next/server";

const data = [{ name: "myname" }];

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 150,
    height: 50,
    margin: 2,
    backgroundColor: "#f3f3f3",
  },
  topLayer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    width: "100%",
  },
});

// Create Document Component
const Pdfcomponent = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.topLayer}>
        <View style={styles.image}>
          {/* <Image
            src=""
            style={styles.image}
          /> */}
        </View>
        <View style={styles.image}>
          {/* <Image
            src=""
            style={styles.image}
          /> */}
          <Text>Hold</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export async function GET() {
  const stream = await renderToStream(<Pdfcomponent />);

  //   return Response.json({
  //     data,
  //   });

  return new NextResponse(stream as unknown as ReadableStream);
}
