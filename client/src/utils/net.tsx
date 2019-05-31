import axios from 'axios'
import { conf } from '../conf/conf'
import { Device } from '../types/device'

export const getDevices = async (token: string): Promise<Device[]> => {
  if (!token) {
    return []
  }
  const result = await axios.post(conf.domain + '/ping', '', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return result.data
}
