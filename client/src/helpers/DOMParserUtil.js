export default class DOMParserUtil {
    static parse(htmlText) {
        return new DOMParser().parseFromString(htmlText, 'text/html').documentElement.querySelector(`body`).firstChild;
    }
}