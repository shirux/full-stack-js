import config from './config';

export default class Data {

  /**
   * Method to communicate with API server
   * @param {} path Path to call on API
   * @param {*} method Action method ( GET | POST| PUT | DELETE )
   * @param {*} body Json Body to send
   * @param {*} credentials User credentials
   */
  api(path, method = 'GET', body = null, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    
    if (credentials != null) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }


  /**
   * GET Method to retrieve an user info
   * Returns user info if credentials are valid
   * Otherwise returns null
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  
  /**
   * POST Method to create an user
   * Returns errors
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * POST Method to create a course
   * Returns errors
   */
  async createCourse(course, user) {
    const response = await this.api('/courses', 'POST', course, user)
    if (response.status === 201) {
      return [];
    } else if(response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * PUT method to update a course
   * Returns errors
   */
  async updateCourse(course, user) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, user)
    if (response.status === 204) {
      return [];
    } else if(response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * DELETE method to destroy a course
   * Returns status
  */
 async deleteCourse(course, user) {
   const response = await this.api(`/courses/${course.id}`, 'DELETE', course, user)
   if (response.status === 204) {
     return []
   } else if (response.status === 404) {
     return ['Course not found']
   } else {
     throw new Error();
   }
 }


}
