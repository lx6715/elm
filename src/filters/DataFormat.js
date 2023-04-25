import dayjs from "dayjs";

export const DataFormat = (data, pick = "YYYY-DD-MM HH:mm:ss") => {
	if (data) {
		return dayjs(data).format(pick);
	} else {
		return "";
	}
};
