import Axios from "axios";

function setHeaders() {
    return {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    
}

function sendApiRequest(method, url, data) {
    return new Promise((resolve,reject) => {
      Axios({method: method, url: url, data: data, headers: setHeaders()})
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
              reject(error);
          });
    });   
}

export default sendApiRequest;