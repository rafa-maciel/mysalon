export default class DateFormatHelper{
    static toString(date) {
        return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    static toDateFullCalendarFormatted(date, time) {
        let month = date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

        return new Date(`${date.getFullYear()}-${month}-${day}T${time}`);
    }

    static toDate(date) {
        return new Date(date+"T03:00:00Z");
    }
}