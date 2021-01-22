import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { SubmitButton } from 'Components/Form/FormKit';
import CaptchaInput from 'Components/Form/Captcha';
import { getDate } from 'Utils/persianDate';
import { useAxios } from 'Network/Axios';
import $CreateAppointment from 'Services/step4';
import { useHistory } from 'react-router-dom';
import { toIsoString2 } from 'Utils/persianDate';

interface IProps {
	state: any;
	onResult: (result: any) => void;
	onPrev?: () => void;
}

const Confirmation: React.FC<IProps> = ({
	state,
	onResult,
	onPrev,
}: IProps) => {
	const history = useHistory();

	const [{ data: issueIdsData }] = useAxios({
		url: '/DropDown/GetBaseDropDown',
		method: 'POST',
		data: JSON.stringify({
			Name: '',
			DropDownTypeId: 8,
			Id: 0,
			ParentId: 0,
		}),
	});

	const { handleSubmit, register, formState, errors } = useForm({
		defaultValues: {
			Code: '',
		},
	});

	// console.log(errors);

	const onSubmit = async (data: any) => {
		// const CaptchaCode = '';
		// const CaptchaId = '';

		const { Code: CaptchaCode } = data;

		const CaptchaId = document
			.querySelectorAll('input#Code[data-id]')[0]
			.getAttribute('data-id');

		if (CaptchaCode) {
			const DTO = {
				Status: 1,
				DoctorId: state?.step1?.DoctorId,
				DoctorScheduleId: state?.step2[2],
				DepartmentId: 2,
				IssueId: parseInt(state?.step3?.IssueId, 10),
				AppointmentDate: `${state?.step2[0]}`,
				NotifyTypeIdArray: [1356, 1357, 1358],
				AttachmentFileIdArray: [],
				CaptchaCode,
				CaptchaId,
				Patient: {
					NationalityId: 108,
					ProvinceId: parseInt(state?.step3?.ProvinceId, 10),
					CityId: parseInt(state?.step3?.CityId, 10),
					GenderType: parseInt(state?.step3?.GenderType, 10),
					Status: 1,
					BirthDate: toIsoString2(state?.step3?.BirthDate),
					// BirthDate: `${state?.step3?.BirthDate.year}-${state?.step3?.BirthDate.month}-${state?.step3?.BirthDate.day}`,
					NationalCode: state?.step3?.NationalCode,
					PhoneNo: state?.step3?.PhoneNo,
					PassportNumber: '',
					Mobile: state?.step3?.Mobile,
					Code: '',
					FirstName: state?.step3?.FirstName,
					LastName: state?.step3?.LastName,
					FatherName: state?.step3?.FatherName,
					Email: state?.step3?.Email,
					Address: state?.step3?.Address,
					FileIdArray: [],
				},
			};
			console.log(DTO);
			try {
				const json = await $CreateAppointment(DTO);
				toast.success('نوبت‌دهی با موفقیت ثبت شد.');
				console.log(json);
				onResult(json.data.data);
				// history.push('/follow-up');
			} catch (error) {
				toast.error(error.response.data.message || error.message);
			}
		}
	};

	const issueId = useMemo(() => {
		if (issueIdsData) {
			const issues: any = {};
			issueIdsData.data.forEach((id: any) => {
				issues[id.Id] = id.Name;
			});

			return issues;
		}
		return [];
	}, [issueIdsData]);

	console.log(state);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="content mb-2">
				<div className="header_form">بازبینی و تایید نهایی</div>

				<div className="doctor-box follow-page">
					{state.step1 && (
						<>
							<div className="part1">
								<img
									src="/media/jam_shadow_logo.png"
									alt=""
									className="hospital-logo"
								/>
								<div className="doctor-info">
									<div className="name">{state.step1.DoctorFullName}</div>
									<div className="meta speciality">
										{state.step1.DoctorSpeciality}
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
												{getDate(state.step2[0], 'DD، dddd')}
											</div>
										</div>
										<div className="box_date">
											<div className="header">تاریخ</div>
											<div className="show" id="show_month">
												{getDate(state.step2[0], 'MMMM، YYYY')}
											</div>
										</div>
										<div className="box_date">
											<div className="header">ساعت</div>
											<div className="show" id="show_date">
												{state.step2[1]}
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>

				{state.step3 && (
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
									<b>نام :</b> {state.step3.FirstName}
								</p>
							</div>
							<div className="col-span-6 mb-1">
								<p className="mt-0 mb-0">
									<b>جنسیت :</b>{' '}
									{(state.step3.GenderType === 2 && 'زن') || 'مرد'}
								</p>
							</div>
							<div className="col-span-6 mb-1">
								<p className="mt-0 mb-0">
									<b>نام خانوادگی :</b> {state.step3.LastName}
								</p>
							</div>
							<div className="col-span-6 mb-1">
								<p className="mt-0 mb-0">
									<b>تلفن :</b> {state.step3.Mobile}
								</p>
							</div>
							<div className="col-span-6 mb-1">
								<p className="mt-0 mb-0">
									<b>کدملی :</b> {state.step3.NationalCode}
								</p>
							</div>
							<div className="col-span-6 mb-1">
								<p className="mt-0 mb-0">
									<b>ایمیل :</b> {state.step3.Email}
								</p>
							</div>
						</div>
					</>
				)}

				{state.step2 && (
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
									<b>تاریخ اخذ نوبت :</b>{' '}
									{getDate(state.step2[0], 'YYYY/MM/DD')}
								</p>
							</div>
							<div className="col-span-6 mb-1">
								<p className="mt-0 mb-0">
									<b>ساعت اخذ نوبت :</b> {state.step2[1]}
								</p>
							</div>
							<div className="col-span-6 mb-1">
								<p className="mt-0 mb-0">
									<b>علت مراجعه :</b> {issueId[state.step3.IssueId]}
								</p>
							</div>
						</div>
					</>
				)}

				<div className="button_actions">
					<div className="field">
						<p>عبارت امنیتی را وارد نمایید.</p>
						<CaptchaInput register={register} name="Code" />
					</div>

					<SubmitButton
						label="ارسال اطلاعات"
						isValid={!formState.isValid}
						isSubmitting={formState.isSubmitting}
					/>
				</div>
			</form>
			{onPrev && (
				<div className="new-row mt-2 mb-2 row-1rem button_actions">
					<div className="col-span">
						<button type="button" onClick={onPrev} className="button prev-step">
							مرحله قبل
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Confirmation;
