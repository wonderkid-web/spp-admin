// components/PaymentReceipt.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Averia_Libre } from 'next/font/google';
import { Siswa, Transaksi } from '@/types';
import { countLunasTrue, formatterCurrency, getBulanName, showTanggal } from '@/helper/client';
import uuid from 'react-uuid';

// Register font
// Font.register({
//   family: 'Arial',
//   src: 'https://fonts.gstatic.com/s/arial/v11/UFRN4F4A6bg.woff2',
// });


const styles = StyleSheet.create({
  page: {
    padding: 20,
    // fontFamily: 'Arial',
    fontSize: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  schoolInfo: {
    fontSize: 10,
    textAlign: 'center',
  },
  details: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  detailsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#f0f0f0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  tableCellHeader: {
    padding: 5,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    padding: 5,
    flex: 1,
    textAlign: 'center',
  },
  total: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 20,
  },
  footer: {
    textAlign: 'right',
    marginTop: 20,
  },
  signatory: {
    marginTop: 70,
    textAlign: 'right',
  },
  signatoryName: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10
  },
  note: {
    marginTop: 20,
    fontSize: 8,
  },
});

interface PaymentData {
  noTrans: string;
  nis: string;
  namaSiswa: string;
  kelas: string;
  tanggal: string;
  jamCetak: string;
  pembayaran: {
    keterangan: string;
    jumlah: string;
  }[];
  total: string;
  terbilang: string;
  tanggalDiterima: string;
  signatoryName: string;
  signatoryTitle: string;
}

interface PaymentReceiptProps {
  data: Transaksi[];
  user: Siswa;
}

const date = new Date().toISOString()

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ data, user }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image
          src="logo.png" // Path to your school logo
          style={{ width: 150, height: 50, marginBottom: 20 }}
        />
        <Text style={styles.title}>BUKTI PEMBAYARAN SISWA</Text>
        <Text style={styles.schoolInfo}>MTS YPI AL-HIDAYAH LUBUK PAKAM</Text>
        <Text style={styles.schoolInfo}>Jl. Imam Bonjol No.17, Tj. Garbus Satu, Kec. Lubuk Pakam, Kabupaten Deli Serdang, Sumatera Utara 20518</Text>
        <Text style={styles.schoolInfo}>Telp. 0271 - 494 787 | Web: www.mtsypi-alhidayah.sch.id | Email : tsypi-alhidayah@gmail.com</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailsRow}>
          <Text>No Trans: {uuid()}</Text>
          <Text>NIS: {data[0]?.nis}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text>Nama Siswa: {data[0]?.nama}</Text>
          <Text>Kelas: {data[0]?.kelas}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text>Tanggal: {showTanggal(date)}</Text>
          {/* <Text>Jam Cetak: {data.jamCetak}</Text> */}
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCellHeader}>No.</Text>
          <Text style={{...styles.tableCellHeader, flex: 3}}>Keterangan Pembayaran</Text>
          <Text style={styles.tableCellHeader}>Jumlah (Rp.)</Text>
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={{...styles.tableCell, flex: 3, textAlign: 'center'}}>Bulan {getBulanName(item.kode)}</Text>
            <Text style={styles.tableCell}>{item.tanggal_lunas ? "Rp. 80.000" : "belum lunas"}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Grand Total: {formatterCurrency(countLunasTrue(data) * 80000)}</Text>
      {/* <Text>Terbilang: {data.terbilang}</Text> */}
      <Text style={styles.footer}>Tembung, {showTanggal(date)}</Text>
      <Text style={styles.signatory}>Yang Menerima,</Text>
      <Text style={styles.signatoryName}>Abdul Halim Simbolon,S.Sos.I.</Text>
      {/* <Text style={styles.signatoryName}>{data.signatoryTitle}</Text> */}
      <Text style={styles.note}>
        Catatan:
        {'\n'}- Disimpan sebagai bukti pembayaran yang SAH.
        {'\n'}- Uang yang sudah dibayarkan tidak dapat diminta kembali.
      </Text>
    </Page>
  </Document>
);

export default PaymentReceipt;
