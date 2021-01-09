export default class BackendProvider {

  // @ts-ignore
  static path = __API__;

  static request(method: string, path: string, headers?: any, params?: any, body?: any) {

    let token = localStorage.getItem('jwtToken');

    let _headers = {};
    if (token) {
      _headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`
      }
    } else {
      _headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }

    if (headers) {
      for (let key in headers) {
        _headers[key] = headers[key];
      }
    }

    let url = this.path + path

    if (params) {
      let paramArr: string[] = []
      Object.keys(params).forEach(key => {
        if (params[key] !== '')
          paramArr.push(key + '=' + encodeURIComponent(params[key]))
      })
      url += '?' + paramArr.join('&')
    }

    return fetch(url, {
      method: method,
      // credentials: 'include',
      headers: _headers,
      redirect: 'manual',
      body: body
    })
  }
}
