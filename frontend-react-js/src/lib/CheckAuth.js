import { Auth } from 'aws-amplify';

export async function getAccessToken() {
    try {
      const cognito_user_session = await Auth.currentSession();
      const access_token = cognito_user_session.accessToken.jwtToken;
      localStorage.setItem("access_token", access_token);
      return access_token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

export async function checkAuth(setUser) {
    Auth.currentAuthenticatedUser({
        // Optional, By default is false. 
        // If set to true, this call will send a 
        // request to Cognito to get the latest user data
        bypassCache: false 
    })
    .then((cognito_user) => {
        setUser({
            cognito_user_uuid: cognito_user.attributes.sub,
            display_name: cognito_user.attributes.name,
            handle: cognito_user.attributes.preferred_username
        });
        return Auth.currentSession();
    }).then((cognito_user_session) => {
        localStorage.setItem("access_token", cognito_user_session.accessToken.jwtToken);
    })
    .catch((err) => console.log(err));
};

export default checkAuth