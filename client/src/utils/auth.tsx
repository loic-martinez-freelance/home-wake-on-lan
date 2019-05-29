import axios from 'axios'
import { conf } from '../conf/conf'

export const storeToken = (token: string) =>
  localStorage.setItem('token', token)

export const getToken = (): string => {
  const token = localStorage.getItem('token')
  return token ? token : ''
}

export const sendLogin = async (password: string): Promise<string> => {
  const result = await axios.post(
    conf.domain + '/login',
    `username=username&password=${password}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }
  )
  return result.data.token
}
