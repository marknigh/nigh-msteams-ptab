import * as microsoftTeams from "@microsoft/teams-js";

export class Auth {

  constructor(){
    microsoftTeams.app.initialize().then(() => {
      microsoftTeams.app.notifySuccess()
      }).catch((error) => {
        console.log('error in initialization', error)
        microsoftTeams.app.notifyFailure(error)
      })
  }

  async get_context() {
    return await microsoftTeams.app.getContext()
  }
  
  async get_token(){
    return await microsoftTeams.authentication.getAuthToken()
  }

  async authentication(){
    return await microsoftTeams.authentication.authenticate({
      url: window.open('http://localhost:5173/auth-start'),
      successCallback: (result) => {
        return(result)
      },
      failureCallback: (error) => {
        return (error)
      }
    })
  }
}
