import axios from "axios";
import decode from 'jwt-decode';

class Services{
    constructor(){
        this.domain = "https://api.harusbisa.net/dev";
    }
    errorHandling(error){
        if(error.response){
            this.errorHandling(error)
        }
        else{
            throw error
        }
    }
    headers(){
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if(this.isLoggedIn){
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }
        return headers
    }
    getToken(){
        return localStorage.getItem("token");
    }
    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000){
                return true
            }
            else{
                return false
            }
        }
        catch(error){
            return false
        }
    }
    async login(email, password){
        const url = this.domain + "/login";
        const data = {
            email: email,
            password: password
        }
        return axios.post(url,data)
        .then(response =>{
            localStorage.setItem("token", response.data.token)
            return response.data.userId
        })
        .catch(error => {
            this.errorHandling(error)
        })
    }
    
    logout(){
        localStorage.removeItem("token");
    }

    isLoggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }

    async signup(newUserData){
        const url = this.domain + '/signup';
        try{
            await axios.post(url, newUserData, {headers: this.headers()})
            return newUserData;
        }
        catch(error){
            this.errorHandling(error);
        }
    }

    async findUsers(name){
        const url = this.domain + "/reviewees/?name="+name;
        return axios.get(url,{headers:this.headers()})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            this.errorHandling(error)
        })
    }

    async getReviews(userId){
        const url = this.domain + "/reviewees/"+userId;
        return axios.get(url, {headers:this.headers()})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            this.errorHandling(error)
        })
    }

    async addReview(userId, review){
        if(userId){
            const url = this.domain+ "/reviewees/"+userId+"/reviews"
            return axios.post(url, review, {headers:this.headers()})
            .then(response =>{
                return response.data
            })
            .catch(error =>{
                this.errorHandling(error)
            })
        }
        else{
            const url = this.domain + "/reviewees"
            return axios.post(url, review, {headers:this.headers()})
            .then(response =>{
                return response.data
            })
            .catch(error =>{
                this.errorHandling(error)
            })
        }
        
    }
    
    async voteReview(revieweeId, reviewId, vote){
        const url = this.domain + "/reviewees/"+revieweeId+"/reviews/"+reviewId+"/"+vote
        return axios.post(url, null, {headers: this.headers()})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            this.errorHandling(error)
        }) 
    }
}
const services = new Services();
export default services;
