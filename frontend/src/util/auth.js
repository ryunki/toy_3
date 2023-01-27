

export const logout = () => {
  localStorage.clear();
  window.location.pathname = "/";
};


export const userLogin = async(response, navigate) =>{

  console.log("3. userLogin")
  
  const {_id, username, email, token} = response
  console.log("4. before await JSON.parse token")
  console.log(response)
  const decoded = await JSON.parse(window.atob(token.split('.')[1]))
  console.log("4. after await JSON.parse token")
  
  // decoded.exp is sent from backend which returns in seconds format
  // *1000 because "new Date()" takes parameter in miliseconds
  const expInMil = decoded.exp * 1000

  // .getTimezoneOffset() returns the difference with UTC in minutes format: -540  (for KOREA)
  const offset = (new Date()).getTimezoneOffset() 
  const offsetMil = offset * 60 * 1000 // change minutes into milliseconds (-9hours) 

  const expWithOffset = new Date(expInMil - offsetMil) 

  // because toISOString() returns in UTC time which is -9 hours from new Date() (korea time)
  // the date has to be added by 9 hours to display the wanted time when using toISOString()  
  const expWithISO = expWithOffset.toISOString().slice(0,-5)
  const remainingTime = expInMil - Date.now()
  setTimeout(logout, remainingTime)

  localStorage.setItem(
    'user',
    JSON.stringify({
      _id,
      username,
      token,
      email,
      tokenExpiration: expWithISO
    })
  )

  navigate('/mainboard')

}