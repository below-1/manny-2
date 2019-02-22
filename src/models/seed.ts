// import  from './models'.
import { Jasa } from './Jasa'
import { Box } from '../types'

export async function seed(box: Box) {

  const truncate = async name => {
    await box.connection.query(`
      SET FOREIGN_KEY_CHECKS = 0;
      TRUNCATE TABLE ${name};
      SET FOREIGN_KEY_CHECKS = 1;
    `)
  }
  // await truncate('cabang')
  // await truncate('barbermen')
  // await truncate('user')
  // await truncate('transaksi')
  // await truncate('jasa')

  // Create owner
  let owner = box.repo.user.create({
    nama: 'Owner',
    username: 'owner-manliest',
    password: 'owner-manliest',
    kategori: 'owner'
  })
          
  owner = await box.repo.user.save(owner)

  // Create cabang
  let kupang = box.repo.cabang.create({
    nama: 'Kupang',
    alamat: 'Kupang'
  })
  let kefa = box.repo.cabang.create({
    nama: 'Kefa',
    alamat: 'Kefa'
  })

  
  kupang = await box.repo.cabang.save(kupang)
  kefa = await box.repo.cabang.save(kefa)

  // Create admin
  let adminKupang = box.repo.user.create({
    nama: 'Admin Kupang',
    username: 'admin-kupang',
    password: 'admin-kupang',
    kategori: 'admin',
    idAdminCabang: kupang.id
  })
  adminKupang = await box.repo.user.save(adminKupang)

  // Create jasa
  await box.connection.createQueryBuilder()
    .insert()
    .into(Jasa)
    .values([
      { nama: 'J1', harga: 50000, id: 1 },
      { nama: 'J2', harga: 55000, id: 2 },
      { nama: 'J3', harga: 100000, id: 3 },
      { nama: 'J4', harga: 75000, id: 4 },
      { nama: 'J5', harga: 85000, id: 5 }
    ])
    .execute()

  // Create Barbermen
  await box.repo.barbermen.save(
    box.repo.barbermen.create({
      nama: 'Barbermen 1',
      aktif: true,
      idCabang: kupang.id
    })
  )

  await box.repo.barbermen.save(
    box.repo.barbermen.create({
      nama: 'Barbermen 2',
      aktif: true,
      idCabang: kupang.id
    })
  )
}