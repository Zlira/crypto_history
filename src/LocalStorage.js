export function getFromStorage(key) {
  const savedResult = window.localStorage.getItem(key)
  if (!savedResult) {return}
  try {
    return JSON.parse(savedResult)[key]
  } catch {
    return
  }
}

export function putIntoStorage(key, value) {
  window.localStorage[key] = JSON.stringify({[key]: value})
}