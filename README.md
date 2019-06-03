# booksapp

## Signup

1) Use email-password or google to Signup using firebase
2) Make ```GET``` request to ```/api/v1/auth``` with access token in request header - ```authorisation```
3) Server responds with this on success

    ```json
    {
        "code": 2,
        "success": true,
        "message": "Signup successful",
    }
    ```

4) Take to next screen where user adds his details - Name, Mobile
5) Make ```POST``` request to ```/api/v1/auth/profile``` with access token in request header - ```authorisation``` and body of form -

    ```json
    {
        "name": "ANCAJKDA",
        "mobile": "9090909090"
    }
    ```

6) Server responds with 200 on success or with error code on failure.

## Login

1) Use email-password or google to login using firebase
2) Make ```GET``` request to ```/api/v1/auth``` with access token in request header - ```authorisation```
3) Server responds with this on success

    ```json
    {
        "code": 1,
        "success": true,
        "message": "Login successful",
        "finished": true
    }
    ```

4) If ```finished == true```, then take user to app or else make user finish his/her profile.

* Mobile Verification on next step after profile completion.
* Use ```/api/v1/auth``` to verify token - whether at app launch OR  
* Whenever user makes any other request, handle error thrown due to expired token
