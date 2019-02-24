import { AdminResolver } from './Admin'
import { OwnerResolver } from './Owner'
import { TransaksiResolver } from './Transaksi'
import { Box } from '../types';

export const resolvers = [
  AdminResolver,
  OwnerResolver,
  TransaksiResolver
]
