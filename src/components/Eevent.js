if (!window._events) {
    window._events = {};
}
let random = () => { parseInt(Math.random() * 99999999) };
export default {
    add: (name, fn) => {
        let event = window._events[name] || [];
        event.push(fn);
        window._events[name] = event;
    },
    emit: (name, obj) => {
        let event = window._events[name] || [];
        event.forEach(item => {
            item && item(obj);
        });
    },
    rm: (name) => {
        window._events[name] = [];
    }
};