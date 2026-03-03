import Cookies from 'js-cookie'

const TokenKey = 'token'
const IdTokenKey = 'id_token'

export function getToken(): string {
  return Cookies.get(TokenKey) || ''
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getIdToken(): string {
  return Cookies.get(IdTokenKey) || ''
}

export function setIdToken(idToken: string) {
  return Cookies.set(IdTokenKey, idToken)
}

export function removeIdToken() {
  return Cookies.remove(IdTokenKey)
}