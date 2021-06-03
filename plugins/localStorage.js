import createPersistedState from "vuex-persistedstate";

export default ({
    store
}) => {
    createPersistedState({
        key: "CoinPool",
        storage: window.localStorage
            // storage: window.sessionStorage
    })(store);
};