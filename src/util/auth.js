import Cookies from 'universal-cookie';
import callAPI from './api-config'

const CLIENT_ID = 'GqksfoPENlvKRtMhXcNLdwcqCbQkWjHyOPk66xfn';

export function refreshAuthToken() {
    const cookies = new Cookies();
    
    if (cookies['accessTokenExpires'] === undefined) {
        return;
    }

    if (cookies['accessTokenExpires'] - new Date() < 600000) {
        // If access token expires in less than 10 minutes, refresh access token.
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                grant_type: 'refresh_token',
                refresh_token: cookies['refreshToken']
            })
        };

        fetch(callAPI('/auth/token/'), request)
            .then(res => res.json())
            .then(response => {
                if (response.hasOwnProperty('error')) {
                    // Refresh token expired.
                } else {
                    Date.prototype.addDays = function (days) {
                        let dat = new Date();
                        dat.setDate(dat.getSeconds() + days);
                        return dat;
                    };

                    cookies.set(
                        'accessToken',
                        response['access_token'],
                        {
                            // Expires in 1 day.
                            maxAge: 86400
                        }
                    );
                    cookies.set(
                        'accessTokenExpires',
                        new Date().addDays(1)
                    );
                    cookies.set(
                        'refreshToken',
                        response['refresh_token'],
                        {
                            // Expires in 1 week.
                            maxAge: 604800
                        }
                    );
                    cookies.set(
                        'refreshTokenExpires',
                        new Date().addDays(7)
                    );
                }
            });
    }
}

export default {refreshAuthToken};
