import { FlatInvoiceType } from "@/types/next-auth";
import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#4036cc",
    padding: 10,
    color: "#ffffff",
  },
  sectionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoView: {
    height: 150,
    width: 150,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  logo: {
    width: 100,
    height: 100,
  },
  contactContainer: {
    paddingTop: 30,
    height: "auto",
    justifyContent: "flex-start",
    paddingRight: 20,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#ffffff",
  },
  lineContainer: {
    paddingHorizontal: 30,
  },
  line: {
    height: "0.5px",
    width: "100%",
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  invoiceIdView: {
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  totalEndView: {
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  label: {
    fontWeight: "bold",
  },
  sectionContainer: {
    marginTop: 10,
    flexDirection: "column",
    gap: 20,
  },
  padded: {
    paddingHorizontal: 10,
  },
  row: {
    paddingHorizontal: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    width: "60%",
  },
  priceTotalContainer: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceLabel: {
    width: "50%",
    textAlign: "left",
  },
  totalLabel: {
    width: "100%",
    textAlign: "right",
  },
  serviceListContainer: {
    marginTop: 10,
    flexDirection: "column",
    gap: 20,
  },
  ThankYouView: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#dadada",
    borderRadius: 20,
  },
  serviceRow: {
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    width: "60%",
  },
  serviceInner: {
    paddingHorizontal: 20,
    marginTop: 5,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 4,
  },
  serviceName: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  serviceText: {
    fontSize: 15,
  },
  priceText: {
    fontSize: 15,
    marginHorizontal: 8,
  },
  separatorWrapper: {
    marginVertical: 8,
  },
});

type Props = {
  flatlist: FlatInvoiceType[];
};

// Create Document Component

export default function Pdfdownload({ flatlist }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(value);
  };

  const [todaydate, setTimestamp] = React.useState<string | null>(null);
  useEffect(() => {
    const fulldatestring = new Date();

    setTimestamp(
      fulldatestring.toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sectionTop}>
          <View style={styles.logoView}>
            <Image
              src="https://sawouaulrpfdpwgmamsn.supabase.co/storage/v1/object/sign/govlead_images/parent_logoWTrans.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NDEwMDdmNS00ZjkzLTRmMGUtYTNmNS1kZTRiN2YzNDE4NzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJnb3ZsZWFkX2ltYWdlcy9wYXJlbnRfbG9nb1dUcmFucy5wbmciLCJpYXQiOjE3NjIzNDQxMjIsImV4cCI6MTc5Mzg4MDEyMn0.Qflfgn90stMI0EKeZR83KprhP0ub4FUfpQKT08iK9H0"
              style={{ width: 150, height: 150 }}
            />
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contactText}>+27 71 219 8630</Text>
            <Text style={styles.contactText}>info@govlead.co.za</Text>
            <Text style={styles.contactText}>www.govlead.co.za</Text>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
        </View>

        <View style={{ minHeight: 500 }}>
          {/* BILL TO + INVOICE DATE */}
          <View style={styles.headerContainer}>
            <View style={{ paddingLeft: 20 }}>
              <Text style={styles.label}>BILL TO</Text>
              {flatlist.map((entry, idx) => (
                <View key={idx}>
                  <Text>{entry.companyName}</Text>
                  <Text>{entry.companyEmail}</Text>
                  <Text>{entry.companyContact}</Text>
                </View>
              ))}
            </View>
            <View style={{ paddingRight: 20 }}>
              <Text style={styles.label}>INVOICE DATE</Text>
              <Text>{todaydate}</Text>
            </View>
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
          </View>
          <View style={styles.invoiceIdView}>
            <Text>INVOICE ID:</Text>
            {flatlist.map((entry, idx) => (
              <View key={idx}>
                <Text>{entry.invoiceId}</Text>
              </View>
            ))}
          </View>

          {/* HEADER ROW */}
          <View style={styles.sectionContainer}>
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>
            <View style={styles.row}>
              <Text style={styles.description}>SERVICE DESCRIPTION</Text>
              <View style={styles.priceTotalContainer}>
                {/* <Text style={styles.priceLabel}>PRICE</Text> */}
                <Text style={styles.totalLabel}>TOTAL</Text>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>
          </View>

          {/* SERVICE LIST */}
          <View style={styles.serviceListContainer}>
            {flatlist.map((i, idx) => (
              <View key={idx} style={styles.serviceRow}>
                <View style={styles.descriptionWrapper}>
                  <View style={styles.serviceInner}>
                    {i.service.map((p, pdx) => (
                      <View key={pdx} style={styles.serviceItem}>
                        <View style={styles.serviceName}>
                          {/* <Icon name="corner-down-right" size={15} /> */}
                          <Text style={styles.serviceText}>{p.name}</Text>
                        </View>
                        <Text style={styles.priceText}>
                          {formatCurrency(p.price)}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* {flatlist.length < 4 && (
                    <View style={styles.lineContainer}>
                      <View style={styles.line}></View>
                    </View>
                  )} */}
                </View>

                {/* Uncomment if you want to show price/total */}
                {/* <View style={styles.priceTotalContainer}>
              <Text style={styles.priceLabel}>{i.price}</Text>
              <Text style={styles.totalLabel}>{i.total}</Text>
            </View> */}
              </View>
            ))}

            <View style={styles.serviceRow}>
              <View style={{ flexDirection: "row", gap: 20, paddingLeft: 20 }}>
                <Text>Service Fee:</Text>
                {flatlist.map((entry, idx) => (
                  <View key={idx} style={{ paddingRight: 40 }}>
                    <Text>{formatCurrency(entry.servicefee)}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View>
            <View style={styles.totalEndView}>
              {flatlist.map((entry, idx) => (
                <View key={idx} style={{ paddingRight: 40 }}>
                  <Text>{formatCurrency(entry.total)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ width: "100%", paddingHorizontal: 40 }}>
          <View style={styles.ThankYouView}>
            <View>
              <Text style={{ color: "#000000" }}>
                If you have any questions concerning this invoice,
              </Text>
              <Text style={{ color: "#000000" }}>
                Please contact the following email:
              </Text>
              <Link src="info@govlead.co.za">info@govlead.co.za</Link>
              {/* <Pressable
              onPress={() => Link.openURL("mailto:info@govelad.co.za")}
            >
              <Text style={styles.emailLink}>info@govelad.co.za</Text>
            </Pressable> */}
            </View>
            <View
              style={{
                marginTop: 20,
                color: "#000",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              <Text>Thank You for your Business!</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
