import axios from "axios";
const setLanguageHeader = (lang) => {
    axios.defaults.headers.common["X-localization"] = lang;
};
export default setLanguageHeader;
