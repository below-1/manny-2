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
    adminNewVisit: async (_, { payload }, { models }) => models.Admin.adminNewVisit(payload)
  }
}