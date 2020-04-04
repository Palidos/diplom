export default class AuthHelper { // TODO: Refactor role check
    static tokenKey = 'ArtEngClassesToken';

    static saveAuth(userName, token, role) {
      sessionStorage.setItem(this.tokenKey, JSON.stringify({
        userName: userName,
        access_token: token,
        role: role,
      }));
    }

    static clearAuth() {
      sessionStorage.removeItem(this.tokenKey);
    }

    static getLogin() {
      const item = sessionStorage.getItem(this.tokenKey);
      let login = '';
      if (item) {
        login = JSON.parse(item).userName;
      }
      return login;
    }

    static isLogged() {
      const item = sessionStorage.getItem(this.tokenKey);
      return !!(item);
    }

    static getToken() {
      const item = sessionStorage.getItem(this.tokenKey);
      let token = null;
      if (item) {
        token = JSON.parse(item).access_token;
      }
      return token;
    }

    static getRole() {
      const item = sessionStorage.getItem(this.tokenKey);
      let role = null;
      if (item) {
        role = JSON.parse(item).role;
      }
      return role;
    }
}
