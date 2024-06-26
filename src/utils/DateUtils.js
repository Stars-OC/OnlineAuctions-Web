class DateUtils {
	// 将秒级时间戳转换为标准日期格式
	static formatTimestamp(timestamp) {
		const date = new Date(timestamp * 1000); // 将秒转换为毫秒

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从 0 开始的，需要加 1
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
}

export default DateUtils;
