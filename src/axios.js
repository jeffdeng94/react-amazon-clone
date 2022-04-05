import axios from 'axios'

export default axios.create({
  baseURL: 'https://us-central1-clone-591e6.cloudfunctions.net/api', //the API URL
})

// http://localhost:5001/clone-591e6/us-central1/api
