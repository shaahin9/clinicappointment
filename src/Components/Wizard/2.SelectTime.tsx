import React, { useState, useMemo } from 'react';
import { useAxios } from 'Network/Axios';
import dayjs from 'dayjs';
import cx from 'classnames';
import { formatted, makeTimeIntervals, toIsoString } from 'Utils/persianDate';
import { Calendar, DayValue, utils } from 'react-modern-calendar-datepicker';

interface IProps {
	onSubmit: (obj: any) => void;
	onPrev?: () => void;
	step1: any;
}

const SelectTime: React.FC<IProps> = ({ onSubmit, step1, onPrev }: IProps) => {
	const [day, setDay] = useState<DayValue>(null);
	const [time, selectTime] = useState('');
	const [date, setDate] = useState({
		From: '',
		To: '',
		Date: '',
		Id: 0,
	});

	const [h, m] = time.split(':');
	const date2 = new Date(date?.Date);
	date2.setHours(parseInt(h, 10));
	date2.setMinutes(parseInt(m, 10));

	const [{ data, loading, error }] = useAxios({
		url: '/DoctorSchedule/GetAllDoctorScheduleByDoctorId',
		method: 'POST',
		data: JSON.stringify({ doctorId: step1.DoctorId }),
	});

	const currentMoment = dayjs().calendar('jalali').locale('fa').toDate();
	const endMoment = dayjs()
		.calendar('jalali')
		.locale('fa')
		.add(3, 'month')
		.toDate();

	const disabledDays = useMemo(() => {
		if (!loading && !error) {
			const days: any = [];
			for (
				let d = new Date(currentMoment);
				d <= new Date(endMoment);
				d.setDate(d.getDate() + 1)
			) {
				days.push(formatted(d));
			}

			data.Data.forEach((date: any) => {
				const or = formatted(date.Date);

				days.splice(
					days.findIndex(
						(d: any) =>
							d.year === or.year && d.month === or.month && d.day === or.day
					),
					1
				);
			});

			return days;
		}
	}, [loading, error, data, currentMoment, endMoment]);

	const length = useMemo(() => {
		if (date) {
			const xxx = makeTimeIntervals(date.From, date.To, 30) || [];
			return xxx?.length;
		}
		return 0;
	}, [date]);

	const slots = useMemo(() => {
		let times: any[] = [
			'8:00',
			'8:30',
			'9:00',
			'9:30',
			'10:00',
			'10:30',
			'11:00',
			'11:30',
			'12:00',
			'12:30',
			'13:00',
			'13:30',
			'14:00',
			'14:30',
			'15:00',
			'15:30',
			'16:00',
			'16:30',
			'17:00',
			'17:30',
			'18:00',
			'18:30',
			'19:00',
			'19:30',
			'20:00',
			'20:30',
			'21:00',
			'21:30',
			'22:00',
		];
		times = times.map((time: string, i: number) => {
			if (length === 0) {
				return {
					avaiable: false,
					time,
				};
			}
			if (i < length + 1) {
				return {
					avaiable: true,
					time,
				};
			}

			return {
				avaiable: false,
				time,
			};
		});

		const parts = ['صبح', 'ظهر', 'عصر', 'شب'];

		const arrayOfArrays: any = [];

		function splitArray(array: any) {
			let i = 0;
			while (array.length > 0) {
				const arrayElement = array.splice(0, 8);
				arrayOfArrays.push({ name: parts[i], body: arrayElement });
				i += 1;
			}
			return arrayOfArrays;
		}

		return splitArray(times);
	}, [length]);

	return (
		<>
			{loading && 'در حال دریافت اطلاعات...'}
			{error && 'مشکلی در ارتباط وجود دارد'}
			{data && (
				<>
					<div className="select-time new-row">
						<div className="col-span-6">
							<div className="content no-padding">
								<div className="header_form no-margin">
									تاریخ نوبت را انتخاب کنید
								</div>

								<Calendar
									value={day}
									onChange={(val: DayValue) => {
										const Date = toIsoString({
											day: val?.day,
											month: val?.month,
											year: val?.year,
										});

										setDate(data.Data.filter((x: any) => x.Date === Date)[0]);
										setDay(val);
									}}
									shouldHighlightWeekends
									colorPrimary="#00b4ac"
									locale="fa"
									calendarClassName="responsive-calendar"
									minimumDate={utils('fa').getToday()}
									maximumDate={formatted(endMoment)}
									disabledDays={disabledDays} // here we pass them
									onDisabledDayError={() =>
										window.alert('امکان ارائه وقت وجود ندارد.')
									}
									renderFooter={() =>
										(day?.day && (
											<div
												style={{
													display: 'flex',
													padding: '0rem 2rem 1rem',
													fontSize: '13px',
													color: '#666',
												}}
											>
												تاریخ انتخاب شده: {day?.year}/{day?.month}/{day?.day}
											</div>
										)) ||
										null
									}
								/>
							</div>
						</div>
						<div className="col-span-6">
							<div className="content">
								<div className="header_form">ساعت نوبت را انتخاب کنید</div>
								<div className="mt-4">
									<div className="hours">
										{slots.map((slot: any, i: number) => (
											<div key={slot.name} className="part">
												<span>{slot.name}</span>
												<ul>
													{slot.body.map((c: any, j: number) => (
														<li key={c.time}>
															<button
																type="button"
																className={cx('button', {
																	'is-avaiable': c.avaiable,
																	'is-disabled': !c.avaiable,
																	'is-active': c.time === time,
																})}
																onClick={() => selectTime(c.time)}
															>
																{c.time}
															</button>
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="new-row mt-2 mb-2 button_actions">
						{onPrev && (
							<div className="col-span">
								<button
									type="button"
									onClick={onPrev}
									className="button prev-step"
								>
									مرحله قبل
								</button>
							</div>
						)}
						{onSubmit && (
							<div className="col-span">
								<button
									type="submit"
									onClick={() =>
										onSubmit([date2.toISOString(), time, date?.Id || 0])
									}
									className="button next-step"
									id="submit"
								>
									تایید و مرحله بعد
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default SelectTime;
