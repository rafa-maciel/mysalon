export default class DateFormatHelper{
    static toString(date) {
        return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    static toDate(date) {
        return new Date(date+"T03:00:00Z");
    }
}