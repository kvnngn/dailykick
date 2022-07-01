import { atom } from 'recoil'
import { ATOM_KEY } from '../../constants'

export default atom<string | undefined>({
  key: ATOM_KEY.GLOBAL.PRODUCT_NAME,
  default: undefined,
})
