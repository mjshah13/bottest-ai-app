export const getCookie = key => {
    return localStorage.getItem(key)
  }
  export const setCookie = (key, value) => {
    return localStorage.setItem(key, value)
  }
  
  export const removeCookie = key => {
    return localStorage.removeItem(key)
  }
  
  export const removeAllCookie = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userData")
    localStorage.removeItem("UpdateData")
    localStorage.removeItem("globalState")
    localStorage.removeItem("remotePartispant")
    localStorage.removeItem("localPartispant")
  
    localStorage.removeItem("room")
    localStorage.removeItem("redirect")
  
  
  
    return
  }