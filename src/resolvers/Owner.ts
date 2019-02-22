export const OwnerResolver = {
  Query: {

  },
  Mutation: {
    ownerCreateCabang: async (_, { payload }, { models: { Owner } }) => Owner.createCabang(payload),
    ownerUpdateCabang: async (_, { id, payload }, { models: { Owner } }) => Owner.updateCabang(id, payload),
    ownerRemoveCabang: async (_, { id }, { models: { Owner } }) => Owner.removeCabang(id)
  }
}