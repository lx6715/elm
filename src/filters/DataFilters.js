import dayjs from "dayjs";

export const formatData = (d, split = "YYYY-MM-DD HH:mm") => {
	if (d) {
		return dayjs(d).format(split);
	} else {
		return "";
	}
};
