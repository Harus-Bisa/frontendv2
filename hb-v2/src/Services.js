import axios from "axios";
import decode from 'jwt-decode';

class Services{
    constructor(){
        this.domain = "https://api.harusbisa.net";
    }
    errorHandling(error){
        if(error.response){
            throw new Error(error.response.statusText)
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
        .then(async response =>{
            localStorage.setItem("token", response.data.token)
            const userId = response.data.userId;
            localStorage.setItem("userId", userId)
            return userId;
        })
        .catch(error => {
            this.errorHandling(error)
        })
    }
    
    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("userId")
    }

    isLoggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }

    async signup(newUserData){
        const url = this.domain + '/signup';
        await axios.post(url, newUserData, {headers: this.headers()})
        .then(() =>{
            return newUserData
        })
        .catch(error =>{
            this.errorHandling(error);
        })
    }

    async resendVerification(email){
        const url = this.domain + '/resend';
        try{
            await axios.post(url, {email:email}, {headers: this.headers()})
        }
        catch(error){
            this.errorHandling(error);
        }
    }

    async getUser(userId){
        const url = this.domain + '/users/' + userId;
        return axios.get(url,{headers:this.headers()})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            this.errorHandling(error)
        })
    }
    async findSchools(school){
        const url = this.domain + "/schools?school="+school
        return axios.get(url, {headers: this.headers()})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            this.errorHandling(error)
        })
    }
    async findReviewees(name, school){
        const url = this.domain + "/reviewees/?name="+name+"&school="+school;
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

    async reportInappropriateness(report){
        const url = this.domain + "/tickets";
        return axios.post(url, report, {headers: this.headers()})
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