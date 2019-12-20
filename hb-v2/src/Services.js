import axios from "axios";

class Services{
    constructor(){
        this.domain = "http://localhost:8000";
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    async findUsers(name){
        const url = this.domain + "/users/?name="+name;
        return axios.get(url,{headers:this.headers})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            throw new Error(error.response.statusText)
        })
    }

    async getReviews(userId){
        const url = this.domain + "/users/"+userId+"/reviews";
        return axios.get(url, {headers:this.headers})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            throw new Error(error.response.statusText)
        })
    }
}
const services = new Services();
export default services;