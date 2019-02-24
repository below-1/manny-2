import { 
  Pembelian,
  Penjualan,
  PembayaranSesi,
  Penggunaan
} from '../models'

export const TransaksiResolver = {
  Transaksi: {
    __resolveType(obj, context, info) {
      if (obj instanceof Pembelian) return 'Pembelian'
      if (obj instanceof Penjualan) return 'Penjualan'
      if (obj instanceof Penggunaan) return 'Penggunaan'
      // if (obj instanceof PembayaranSesi) return 'PembayaranSesi'
      return "TransaksiLain"
    }
  }
}