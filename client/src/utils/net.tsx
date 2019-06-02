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

export const sendWol = async (
  token: string,
  mac_address: string
): Promise<boolean> => {
  if (!token) {
    return false
  }
  const result = await axios.post(
    conf.domain + '/wol',
    `mac_address=${mac_address}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return result.data.done
}
