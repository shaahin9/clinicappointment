import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { SubmitButton } from 'Components/Form/FormKit';
import { getDate } from 'Utils/persianDate';
import { useAxios } from 'Network/Axios';

interface IProps {
	data: any;
}

const PrintInfo: React.FC<IProps> = ({ data }: IProps) => {
	const [{ data: issueIdsData }] = useAxios({
		url: '/DropDown/GetBaseDropDown',
		method: 'POST',
		data: JSON.stringify({
			Name: '',
			DropDownTypeId: 8,
			Id: 0,
			ParentId: data.DoctorObject.BasePersonObject.PrimarySpecialtyObject.Id,
		}),
	});

	const issueId = useMemo(() => {
		if (issueIdsData) {
			return issueIdsData.data.map((id: any) => ({
				[id.Id]: id.Name,
			}));
		}
		return [];
	}, [issueIdsData]);

	return (
		<>
			<div className="doctor-box follow-page">
				{data.DoctorObject && (
					<>
						<div className="part1">
							<img
								src="/media/jam_shadow_logo.png"
								alt=""
								className="hospital-logo"
							/>
							<div className="doctor-info">
								<img
									src={data.DoctorObject.BasePersonObject.AvatarObject.Url}
									alt={data.DoctorObject.BasePersonObject.AvatarObject.Title}
									className="doctor-pic"
								/>
								<div className="name">
									{data.DoctorObject.BasePersonObject.AvatarObject.Title}
								</div>
								<div className="meta speciality">
									{
										data.DoctorObject.BasePersonObject.PrimarySpecialtyObject
											.Name
									}
								</div>
							</div>
						</div>
						<div className="part2">
							<div className="box_inner">
								<div className="title center" id="show_year">
									نوبت اخذ شده
								</div>
								<div className="box_show_data">
									<div className="box_date">
										<div className="header">روز</div>
										<div className="show" id="show_day">
											{getDate(data.AppointmentDate, 'DD، dddd')}
										</div>
									</div>
									<div className="box_date">
										<div className="header">تاریخ</div>
										<div className="show" id="show_month">
											{getDate(data.AppointmentDate, 'MMMM، YYYY')}
										</div>
									</div>
									<div className="box_date">
										<div className="header">ساعت</div>
										<div className="show" id="show_date">
											{getDate(data.AppointmentDate, 'HH:mm')}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>

			{data.PatientObject && (
				<>
					<div className="new-row mt-2">
						<div className="col-span-5">
							<div className="header_section_form mb-2">
								<FontAwesomeIcon icon={faUser} className="ml-1" />
								اطلاعات هویتی
							</div>
						</div>
					</div>
					<div className="new-row">
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>نام :</b> {data.PatientObject.FirstName}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>جنسیت :</b>{' '}
								{(data.PatientObject.GenderType === 2 && 'زن') || 'مرد'}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>نام خانوادگی :</b> {data.PatientObject.LastName}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>تلفن :</b> {data.PatientObject.Mobile}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>کدملی :</b> {data.PatientObject.NationalCode}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>ایمیل :</b> {data.PatientObject.Email}
							</p>
						</div>
					</div>
				</>
			)}

			{data.PatientObject && (
				<>
					<div className="new-row mt-1 mb-1">
						<div className="col-span-5">
							<div className="header_section_form mb-1">
								<FontAwesomeIcon icon={faInfoCircle} className="ml-1" />
								اطلاعات تکمیلی
							</div>
						</div>
					</div>
					<div className="new-row">
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>تاریخ اخذ نوبت :</b> {getDate(data.CreateDate, 'YYYY/MM/DD')}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>ساعت اخذ نوبت :</b> {getDate(data.CreateDate, 'HH:mm')}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>علت مراجعه :</b> {issueId[data.issueId]}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>کد رهگیری :</b> {data.TrackingNumber}
							</p>
						</div>
						<div className="col-span-6 mb-1">
							<p className="mt-0 mb-0">
								<b>وضعیت پرداخت :</b>
							</p>
						</div>
					</div>
				</>
			)}

			<div className="button_actions">
				<SubmitButton
					label="پرینت اطلاعات"
					isValid={false}
					isSubmitting={false}
					onClick={() => {
						window.print();
					}}
				/>
			</div>
		</>
	);
};

export default PrintInfo;
