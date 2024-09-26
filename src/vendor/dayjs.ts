import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import utc from "dayjs/plugin/utc.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";


dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

export default dayjs;