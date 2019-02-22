import { Box } from '../types'
import {
  User,
  Jasa,
  Sesi,
  SesiState,
  PembayaranSesi
} from '../models'
import moment from 'moment'

export const AdminResolver = {
  Query: {
    adminListSesi: async (_, __, { models }) => models.Admin.listSesi(),
    adminListBarbermen: async (_, __, { models }) => models.Admin.listBarbermen(),
    adminListJasa: async (_, __, { models }) => models.Admin.listJasa(),
    adminListItem: async (_, __, { models }) => models.Admin.listItem()
  },
  Mutation: {
    adminNewVisit: async (_, { payload }, { models }) => models.Admin.newVisit(payload),
    adminAddItem: async (_, { payload }, { models }) => models.Admin.addItem(payload),
    adminRemoveItem: async (_, { id }, { models }) => models.Admin.removeItem(id),
    adminSellItem: async (_, { payload }, { models }) => models.Admin.sell(payload),
    adminBuyItem: async (_, { payload }, { models }) => models.Admin.buy(payload),
    adminUseItem: async (_, { payload }, { models }) => models.Admin.use(payload),
    adminTransaksi: async (_, { payload }, { models }) => models.Admin.transaksi(payload),
    adminRemoveTransaksi: async (_, { id }, { models }) => models.Admin.removeTransaksi(id)
  }
}