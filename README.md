**Name:** Ng Shi Wei

**Admission No.:** A0185450E

# Instructions
## Run API locally (B1)
1. Go to https://github.com/shiweing/rest-api
1. Clone the repository locally
1. Open the command prompt in the repository folder
1. Enter the command `node index.js`
1. Open a browser and go to http://localhost:8080
1. The page should state `RestAPI is working`

## Accessing API with Postman (B1)
1. Go to https://www.postman.com/
1. Sign up for an account and launch the workspace
![Image of Postman](images/postman.png)

### **GET** API call
1. Select **GET** as the request type and enter `http://localhost:8080/api/contacts` as url
1. Click **Send**
![Image of GET request](images/get-request.png)
1. The request result will be shown

> If an error appears like the following image ![Image of CORS error](images/cors-error.png) download the chrome plugin to unblock CORS when testing at https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en

### **POST** API call
1. Select **POST** as the request type and enter `http://localhost:8080/api/contacts` as url
1. Open the body tab and select **x-www-form-urlencoded**
1. Add the parameters as shown below
1. Click **Send**
1. A response indicating that the contact has been created will be returned.
![Image of POST request](images/post-request.png)
1. Run the GET request to see the new contact being returned

### **PUT** API call
1. Run the GET request and copy the id of the contact that was just added.
1. Select **PUT** as the request type and enter `http://localhost:8080/api/contacts/[id]` as url (where `[id]` is the id that was copied)
1. Change the value of the name parameter under body
1. Click **Send**
1. A response indicating that the contact has been updated will be returned.
![Image of PUT request](images/put-request.png)
1. Run the GET request to see the contact has been updated

### **DELETE** API call
1. Run the GET request and copy the id of the contact that was just added.
1. Select **DELETE** as the request type and enter `http://localhost:8080/api/contacts/[id]` as url (where `[id]` is the id that was copied)
1. Click **Send**
1. A response indicating that the contact has been deleted will be returned.
![Image of DELETE request](images/delete-request.png)
1. Run the GET request to see the contact has been deleted