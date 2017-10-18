import config from "../config/cfg";
export default {
    getParams(location) {
        if (!this.props.location || !this.props.location.state || !this.props.location.state.id) {

        }
    },
    setTitle(title) {
        document.title = title + " - 欧畅行";
    },
    href() {
        let url = encodeURIComponent(location.href);
        if (config.isDev) {
            return `${config.dev.publicUrl}`;
        }
        return `${config.production.publicUrl}`;
    },
    getCurrentUrl() {
        let url = config.isDev ? window.location.href.replace(":8000", "") : window.location.href;
        if (url.substring(0, url.length - 1) != "/")
            return url + "/";
        return url;
    }
};