// import axios from 'axios'
import axios from './axiosInterCeptor'
import qs from 'qs';
import host from './host'

export function qsdata(data) {
  return qs.parse(qs.stringify(data));
}

export default {

  post(url, data, success_call, fail_callback, error_cb) {
    // data.token = localStorage.token;
    return axios.post(host.host + url, data)
      .then(function (response) {
        if (response.data.code != 200) {
          if (fail_callback) {
            fail_callback(response.data);
          }
        } else {
          if (success_call)
            success_call(response.data)
        }
      })
      .catch(function (error) {

        if (error_cb) {
          error_cb(error)
        } else {
          console.log(error);
        }
      });
  },
  get(url, params, success_callback, fail_callback) {
    // params['token'] = localStorage.token;
    return axios.get(host.host + url, {
        params: params
      })
      .then(function (response) {
        let result = response.data;
        if (result.code == 200) {
          if (success_callback) {
            success_callback(result.data)
          }
        } else if (fail_callback) {
          fail_callback(result.data)
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  },
  async asyncGet(url, dataJson) {
    if (!dataJson) {
      dataJson = {};
    }

    try {
      const response = await axios.get(url, {
        params: dataJson
      });
      return response.data;
    } catch (error) {
      console.log(error)
    }
  },
  async asyncPost(url, dataJson) {
    if (!dataJson) {
      dataJson = {};
    }

    try {
      const response = await axios.get(url, {
        params: dataJson
      });
      return response.data;
    } catch (error) {
      console.log(error)
    }
  },
}
