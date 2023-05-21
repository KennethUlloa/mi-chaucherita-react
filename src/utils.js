import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

export function today() {   
    return dayjs(new Date()).format(dateFormat);
}