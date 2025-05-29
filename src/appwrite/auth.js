import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId); 
        this.account = new Account(this.client);

    }

    async createAccount({email, password, name}){ // this method creates a new user as well as login
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){ // this method logs in an existing user
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){ // this method gets the current user
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            // console.log("error", error);
            return null;
            
        }
        
    }

    async logout(){ // this method logs out the current user
        try {
            const response = await this.account.deleteSessions();
            return response;
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();
export default authService