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

  },
  Mutation: {
    adminNewVisit: async (_, { payload }, { models }) => models.Admin.newVisit(payload),
    adminAddItem: async (_, { payload }, { models }) => models.Admin.addItem(payload),
    adminRemoveItem: async (_, { id }, { models }) => models.Admin.removeItem(id),
    adminSellItem: async (_, { payload }, { models }) => models.Admin.sell(payload),
    adminBuyItem: async (_, { payload }, { models }) => models.Admin.buy(payload),
    adminUseItem: async (_, { payload }, { models }) => models.Admin.use(payload)
  }
}