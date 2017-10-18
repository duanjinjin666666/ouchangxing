
import confing from "../config/cfg";
import net from "../components/net";
const s = "__$%&__";

export default {
    getItem(key, isSession) {
        let cache;
        if (isSession) {
            cache = window.sessionStorage[key] || "";
        } else {
            cache = window.localStorage[key] || "";
        }
        let temp = cache.split(s);
        if (temp.length > 1) {
            let k = temp[0];
            let v = temp[1];
            switch (k) {
                case "o":
                case "a":
                    return JSON.parse(v);
                case "d":
                    return new Date(v);
                case "b":
                    return v == "true";
                case "n":
                    let n = v.split(".");
                    if (n.length > 1)
                        return parseFloat(v);
                    return parseInt(v);
                case "s":
                    return v;
                default:
                    return undefined;
            }

        } else {
            return null;
        }
    },
    remove(key, isSession) {
        if (isSession)
            window.sessionStorage[key] = "";
        window.localStorage[key] = "";
    },
    setItem(key, val, isSession) {
        let storage = isSession ? window.sessionStorage : window.localStorage;
        let type = Object.prototype.toString.call(val);
        switch (type) {
            case "[object Object]":
            case "[object Array]":
                storage[key] = "o".concat(s, JSON.stringify(val));
                break;
            case "[object Date]":
                storage[key] = "d".concat(s, val);
                break;
            case "[object Boolean]":
                storage[key] = "b".concat(s, val);
                break;
            case "[object Number]":
                storage[key] = "n".concat(s, val);
                break;
            case "[object String]":
                storage[key] = "s".concat(s, val);
                break;
            default:
                storage[key] = "";
                break;
        }
    },
    getToken() {
        return this.getItem(confing.cache.token);
    },
    setToken(token) {
        return this.setItem(confing.cache.token, token);
    },
    syncToken() {
        net.get("/api/get_token").then(data => {
            if (data.status_code == 10000) {
                console.log(`同步token${data.token}`);
                this.setToken(data.token);
            }
        });
    }
};