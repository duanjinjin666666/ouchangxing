import config from '../config/cfg'
import 'fetch-polyfill';
import cache from "./cache";
import cookie from "js-cookie";

export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            ajax({ url: url, data: data || {}, success: resolve, error: reject, dataType: null, type: 'POST' });
        });
    },
    get(url, data) {
        return new Promise((resolve, reject) => {
            ajax({ url: url, data: data || {}, success: resolve, error: reject, dataType: null, type: 'GET' })
        });
    },
    load(url, type, data) {
        return new Promise((resolve, reject) => {
            ajax({ url: url, data: data || {}, success: resolve, error: reject, dataType: null, type: type })
        });
    },
    upload(url, data) {
        return new Promise((resolve, reject) => {
            ajax({ url: url, data: data || {}, success: resolve, error: reject, dataType: null, type: "file" })
        });
    }
}

function go(fech) {
    let self = this;
    let abortFn = null;
    let abortPromise = new Promise((resolve, reject) => {
        abortFn = () => {
            reject("timeout");
        }
    });
    let abortabeProise = Promise.race([fech, abortPromise]);
    abortabeProise.abort = abortFn;
    return abortabeProise;
}

function objToQuery(obj) {
    if (obj) {
        var result = ''
        for (var d in obj) {
            if (obj[d] instanceof Function)
                continue
            result += d + '=' + encodeURIComponent(obj[d]) + '&'
        }
        return result.substring(0, result.length - 1)
    }
    return ''
}

function ajax(params) {
    let token = cookie.get("token");
    var url = ''
    var dataType = params.dataType && params.dataType.toLowerCase() === 'json'
    var body = null
    var timeOut = params.timeout || 20000;
    var isHttp = params.url.indexOf("http://") > -1 || params.url.indexOf("https://") > -1;
    var paramsUrl = params.url.indexOf('/') == 0 ? params.url.substring(1) : params.url;
    if (!isHttp) {
        params.url.indexOf('/') == 0 ? params.url.substring(1) : params.url
        if (config.isDev) {
            url = config.dev.server.concat(paramsUrl)
        } else {
            url = config.production.server.concat(paramsUrl)
        }
    } else {
        url = params.url;
    }
    var headers = new Headers()

    if (params.type === "file") {
        headers.append('Content-Type', 'multipart/form-data')
    } else {
        if (!dataType) {
            headers.append('Content-Type', 'application/x-www-form-urlencoded')
        } else {
            headers.append('Accept', 'application/json')
            headers.append('Content-Type', 'application/json')
        }
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
    }
    var requestParams = {
        method: params.type,
        headers: headers,
        //mode: "no-cors"
    }

    if (params.type.toLowerCase() === 'post') {
        if (dataType) {
            body = JSON.stringify(params.data);
        } else {
            body = objToQuery(params.data);
        }
        requestParams.body = body;
        console.log("netWork", "【POST请求】URL: " + url + "参数:" + body);
    }
    if (params.type.toLowerCase() === "file") {
        requestParams.method = "POST";
        timeOut = 60000;
        let tempData = params.data;
        let formData = new FormData();
        let name = "";
        if (!params.data.uri) throw "文件URI是必须的参数";
        let index = params.data.uri.lastIndexOf("/");
        name = params.data.uri.substring(index + 1);
        formData.append("pic", { type: "multipart/form-data", uri: params.data.uri || "", name: name });
        delete tempData.uri;
        for (let d in tempData) {
            formData.append(d, tempData[d]);
        }
        requestParams.body = formData;
        console.log("netWork", "【POST文件上传】URL: " + url + " 请求主体: " + JSON.stringify(formData));
    }
    if (params.type.toLowerCase() === "get") {
        url += "?" + objToQuery(params.data);
        console.log("netWork", "【EGT请求】:" + url);
    }
    var fetchRes = go(fetch(url, requestParams));
    fetchRes.then(response => response.json())
        .then(json => {
            console.log(json);
            params.success && params.success(json);
        }).catch(err => {
            let isHanld = false;
            console.log("【netWork-ERROR】", err);
            if (params.error) {
                isHanld = params.error(err);
            }
            if (!isHanld)
                console.log('当前网络不稳定');
        });
    setTimeout(() => {
        fetchRes.abort();
    }, timeOut);
}

