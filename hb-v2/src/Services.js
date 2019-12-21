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

    async addReview(userId, review){
        if(userId){
            const url = this.domain+ "/users/"+userId+"/reviews"
            return axios.post(url, review, {headers:this.headers})
            .then(response =>{
                return response.data
            })
            .catch(error =>{
                throw new Error(error.response.statusText)
            })
        }
        else{
            const url = this.domain + "/reviews"
            return axios.post(url, review, {headers:this.headers})
            .then(response =>{
                return response.data
            })
            .catch(error =>{
                throw new Error(error.response.statusText)
            })
        }
        
    }
    
    async voteReview(userId, reviewId, vote){
        const url = this.domain + "/users/"+userId+"/reviews/"+reviewId+"/"+vote
        return axios.post(url, null, {headers: this.headers})
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