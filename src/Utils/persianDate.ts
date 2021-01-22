import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(jalaliday);

const formatted = (date = new Date()): any => {
	const formated = dayjs(date)
		.calendar('jalali')
		.locale('fa')
		.format('YYYY/MM/DD')
		.split('/');

	return {
		year: parseInt(formated[0], 10),
		month: parseInt(formated[1], 10),
		day: parseInt(formated[2], 10),
	};
};

const getDate = (date: any, format: string) =>
	dayjs(date).calendar('jalali').locale('fa').format(format);

const makeTimeIntervals = (start: string, end: string, increment: number) => {
	if (!start || !end) {
		return;
	}
	const startTime = start.toString().split(':');
	const endTime = end.toString().split(':');

	const pad = (n: any) => (n < 10 ? `0${n.toString()}` : n);
	const startHr = parseInt(startTime[0], 10);
	const startMin = parseInt(startTime[1], 10);
	const endHr = parseInt(endTime[0], 10);
	// const endMin = parseInt(endTime[1], 10);
	let currentHr = startHr;
	let currentMin = startMin;
	let previous = `${currentHr}:${pad(currentMin)}`;
	let current = '';
	const r = [];

	do {
		currentMin += increment;
		if (currentMin % 60 === 0 || currentMin > 60) {
			currentMin = currentMin === 60 ? 0 : currentMin - 60;
			currentHr += 1;
		}
		current = `${currentHr}:${pad(currentMin)}`;
		// r.push(`${previous} - ${current}`);
		r.push(previous);
		previous = current;
	} while (currentHr !== endHr);

	return r;
};

interface ICalendar {
	day: any;
	month: any;
	year: any;
}

const toIsoString = ({ year, month, day }: ICalendar): string => {
	const dateObj = dayjs()
		.utc()
		.calendar('jalali')
		.year(year)
		.month(month - 1)
		.day(day + 1)
		.startOf('day');

	return dateObj.toISOString().split('.')[0];
};

const toIsoString2 = ({ year, month, day }: ICalendar): string => {
	const dateObj = dayjs()
		.utc()
		.calendar('jalali')
		.locale('fa')
		.year(year)
		.month(month)
		.day(day);

	console.log(dateObj.toISOString());

	return dateObj.toISOString();
};

export { formatted, makeTimeIntervals, toIsoString, toIsoString2, getDate };
