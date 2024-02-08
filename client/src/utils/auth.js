import React, { useEffect } from "react";
import decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

class AuthService {
  
  getProfile() {
    return decode(this.getToken());
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  login(idToken, userId) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    localStorage.setItem("user_id", userId);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("user_id");
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();

