/**
 * Create instant, which represent response object
 * @param {Object} [response] - axios response object
 */
 export class ResponseWrapper {
    constructor(response) {
      this.data = response.data
    }
  }
  
  /**
   * Create instant, which represent error object
   * @param {Object} [error] - axios error object
   */
  export class ErrorWrapper extends Error {
    constructor(error) {
      super()
      this.statusCode = error.response?.data.statusCode
        ? error.response?.data.statusCode
        : error.response?.data.code
      this.message = error.response?.data.message
    }
  }