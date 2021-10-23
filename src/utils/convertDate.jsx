export function convertDate(number) {
    const num = Date.now() - number;

    const days = Math.floor(num / 1000 / 3600 / 24);
    const date = {
        minutes: new Date(num).getUTCMinutes(),
        hours: new Date(num).getUTCHours(),
        days: days,
        month: new Date(number).toLocaleString("default", { month: "long" }),
        year: new Date(number).getUTCFullYear()
    };
    // 2009-11-10
    let text;
    if (date.minutes <= 1) {
        text = "1 минуту назад";
    } else if (date.minutes <= 5) {
        text = "5 минуты назад";
    } else if (date.minutes <= 10) {
        text = "10 минут назад";
    } else if (date.hours < 1 && date.minutes <= 30) {
        text = "30 минут назад";
    } else if (date.minutes > 30 && date.days < 1) {
        text = date.hours + " : " + date.minutes;
    } else if (date.days > 0 && new Date().getUTCFullYear() - date.year < 1) {
        text = date.days + " " + convertMonthText(date.month);
    } else if (new Date().getUTCFullYear() - date.year > 0) {
        text = date.days + " " + convertMonthText(date.month) + " " + date.year + " года";
    } else {
        text = "error? date infinite" + date;
    }

    return { text, date };
}

function convertMonthText(str) {
    return str === "март" || str === "август" ? str + "а" : str.slice(0, str.length - 1) + "я";
}
