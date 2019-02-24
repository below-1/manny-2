export const OwnerResolver = {
  Query: {
    ownerListCabang: async (_, __, { models: { Owner } }) => Owner.listCabang(),
    ownerCabangItem: async (_, { cabang }, { models: { Owner } }) => Owner.listItemInCabang(cabang),
    ownerCabangPemasukan: async (_, { cabang, time }, { models: { Owner } }) => Owner.pemasukanInCabang(cabang, time)
    
  },
  Mutation: {
    ownerCreateCabang: async (_, { payload }, { models: { Owner } }) => Owner.createCabang(payload),
    ownerUpdateCabang: async (_, { id, payload }, { models: { Owner } }) => Owner.updateCabang(id, payload),
    ownerRemoveCabang: async (_, { id }, { models: { Owner } }) => Owner.removeCabang(id),
    ownerRegisterAdmin: async (_, { payload }, { models: { Owner } }) => Owner.registerAdmin(payload)
  }
}