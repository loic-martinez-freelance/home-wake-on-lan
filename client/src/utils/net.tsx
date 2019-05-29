import axios from 'axios'
import { conf } from '../conf/conf'

export const ping = async (token: string): Promise<boolean> => {
  if (!token) {
    return false
  }
  const result = await axios.post(conf.domain + '/ping', '', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return result.data.alive
}
