export class DateUtil {
    public static createDateAsUTC(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }

    public static calculateMinute2Date(dateStart: Date, dateEnd: Date): number {
        return Math.round(((dateEnd.getTime() - dateStart.getTime())/1000)/60);
    }

    public static calculateSecond2Date(dateStart: Date, dateEnd: Date): number {
        return Math.abs((dateEnd.getTime() - dateStart.getTime()) / 1000);
    }

    public static now() {
        return new Date();
    }
}