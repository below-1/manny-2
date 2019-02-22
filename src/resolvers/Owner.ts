export const OwnerResolver = {
  Query: {

  },
  Mutation: {
    ownerCreateCabang: async (_, { payload }, { models: { Owner } }) => Owner.createCabang(payload)
  }
}