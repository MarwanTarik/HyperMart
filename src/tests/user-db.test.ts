import { pool } from '../database/main.database'
import { getCityID } from '../database/queries/user-mangment/cities.database'
import { getCountryID } from '../database/queries/user-mangment/countries.database'
import { creatUser, getLoginCredentials, getUser } from '../database/queries/user-mangment/user.database'
import { truncateTable } from '../database/truncate'
import APIDatabaseError from '../error/database.error'
import Cities from '../model/user-manegment/cities.model'
import Countries from '../model/user-manegment/countries.model'
import { GroupsName } from '../model/user-manegment/groups.model'
import User from '../model/user-manegment/user.model'

const user = new User(
  'starlight',
  'customer',
  'John',
  'Doe',
  'a@gmail.com',
  'address',
  Cities.GIZA,
  Countries.EGYPT,
  '011xxxxxxxx',
  'werrftgkj',
  'enabled',
  1
)
const groups = [GroupsName.USER]

describe('User Management Database Functions', () => {
  beforeEach(async () => {
    await truncateTable('users')
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('getCityID', () => {
    it('throws an error when city name is not found', async () => {
      await expect(getCityID('london')).rejects.toThrow(APIDatabaseError)
    })

    it('returns city ID when city name exists', async () => {
      await expect(getCityID(Cities.CAIRO)).resolves.toBeTruthy()
    })
  })

  describe('getCountryID', () => {
    it('throws an error when country name is not found', async () => {
      await expect(getCountryID('UK')).rejects.toThrow(APIDatabaseError)
    })

    it('returns country ID when country name exists', async () => {
      await expect(getCountryID(Countries.EGYPT)).resolves.toBeTruthy()
    })
  })

  describe('createUser', () => {
    it('returns user ID when user is successfully created', async () => {
      await expect(creatUser(user, groups)).resolves.toBeTruthy()
    })
  })

  describe('getUser', () => {
    it('returns user data by email', async () => {
      await creatUser(user, groups)
      const email = 'a@gmail.com'
      await expect(getUser(email)).resolves.toEqual(user)
    })
  })

  describe('getLoginCredentials', () => {
    it('returns login credentials (user ID, groups, hashed password) by email', async () => {
      await creatUser(user, groups)
      const email = 'a@gmail.com'
      await expect(getLoginCredentials(email)).resolves.toBeTruthy()
    })
  })
})
