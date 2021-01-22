/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SubmitButton } from 'Components/Form/FormKit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import { useAxios } from 'Network/Axios';

interface IProps {
	onSubmit: (obj: any) => void;
	data: any;
	mobile: string;
}

const UserForm: React.FC<IProps> = ({ onSubmit, data, mobile }: IProps) => {
	const [
		{ data: provinceData, loading: provinceLoading, error: provinceError },
	] = useAxios({
		url: '/DropDown/GetBaseDropDown',
		method: 'POST',
		data: JSON.stringify({
			Name: '',
			DropDownTypeId: 6,
			PageSize: 1000,
			Id: 0,
		}),
	});

	const [{ data: issueIdsData }] = useAxios({
		url: '/DropDown/GetBaseDropDown',
		method: 'POST',
		data: JSON.stringify({
			Name: '',
			DropDownTypeId: 8,
			Id: 0,
			ParentId: data.SpecialtyId || 0,
		}),
	});

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

	const {
		handleSubmit,
		watch,
		register,
		errors,
		control,
		// getValues,
		formState,
	} = useForm({
		defaultValues: {
			Mobile: mobile,
			ProvinceId: '153',
		},
	});
	const onFormSubmit = async (data: any) => {
		console.log({ data });
		onSubmit({ ...data, Mobile: mobile });
		// toast.success('ذخیره اطلاعات موفق آمیز بود');
	};

	// console.log(errors, watch('ProvinceId'), watch('CityId'));

	const [{ data: cityData, loading: cityLoading, error: cityError }] = useAxios(
		{
			url: '/DropDown/GetBaseDropDown',
			method: 'POST',
			data: JSON.stringify({
				Name: '',
				Id: 0,
				DropDownTypeId: 7,
				PageSize: 1000,
				ParentId: parseInt(watch('ProvinceId'), 10),
			}),
		}
	);
	return (
		<>
			{/* {console.log(getValues('Mobile'))} */}
			{provinceLoading && 'در حال دریافت اطلاعات...'}
			{provinceError && 'مشکلی در ارتباط وجود دارد'}
			{provinceData && (
				<form onSubmit={handleSubmit(onFormSubmit)}>
					<div className="new-row">
						<div className="col-span-5">
							<div className="header_section_form">
								<FontAwesomeIcon icon={faUser} className="ml-1" />
								اطلاعات هویتی
							</div>
						</div>
					</div>
					<div className="new-row">
						<div className="col-span-4">
							<label htmlFor="NationalCode" className="label">
								کد ملی <span className="required">*</span>
							</label>
							<input
								type="text"
								className="input"
								placeholder="کد ملی"
								name="NationalCode"
								id="NationalCode"
								ref={register({ required: true })}
							/>
							<span className="hint">فرمت کد ملی ۰۰۱۹۲۵۲۳۴۱</span>
						</div>
						<div className="col-span-4">
							<label htmlFor="FirstName" className="label">
								نام <span className="required">*</span>
							</label>
							<input
								type="text"
								className="input"
								placeholder="نام"
								name="FirstName"
								id="FirstName"
								ref={register({ required: true })}
							/>
						</div>
						<div className="col-span-4">
							<label htmlFor="LastName" className="label">
								نام خانوادگی <span className="required">*</span>
							</label>
							<input
								type="text"
								className="input"
								placeholder="نام خانوادگی"
								name="LastName"
								id="LastName"
								ref={register({ required: true })}
							/>
						</div>

						<div className="col-span-4 bithday">
							<label htmlFor="BirthDate" className="label">
								تاریخ تولد
							</label>
							<Controller
								name="BirthDate"
								id="BirthDate"
								control={control}
								rules={{ required: true }}
								render={(props) => (
									<DatePicker
										shouldHighlightWeekends
										colorPrimary="#00b4ac"
										locale="fa"
										inputClassName="input"
										value={props.value}
										onChange={(val: DayValue) => {
											props.onChange(val);
										}}
										inputPlaceholder="تاریخ تولد"
									/>
								)}
							/>
						</div>

						<div className="col-span-4">
							<label htmlFor="FatherName" className="label">
								نام پدر
							</label>
							<input
								type="text"
								className="input"
								placeholder="نام پدر"
								name="FatherName"
								id="FatherName"
								ref={register}
							/>
						</div>

						<div
							className="col-span-4"
							style={{ display: 'flex', alignItems: 'center' }}
						>
							<div className="control">
								<input
									name="GenderType"
									className="control__input"
									id="زن"
									type="radio"
									value={2}
									ref={register({ required: true })}
								/>
								<label className="control__label" htmlFor="زن">
									زن
								</label>
							</div>
							<div className="control">
								<input
									name="GenderType"
									className="control__input"
									id="مرد"
									type="radio"
									value={1}
									ref={register({ required: true })}
								/>
								<label className="control__label" htmlFor="مرد">
									مرد
								</label>
							</div>
						</div>

						<div className="col-span-5 mt-1">
							<div className="header_section_form">
								<FontAwesomeIcon icon={faPhone} className="ml-1" />
								اطلاعات تماس
							</div>
						</div>
						<div className="col-span-7" />

						<div className="col-span-3">
							<label htmlFor="ProvinceId" className="label">
								استان
							</label>
							<select
								className="select"
								name="ProvinceId"
								id="ProvinceId"
								ref={register}
							>
								{provinceData.data.map((pro: any) => (
									<option key={pro.Id} value={pro.Id}>
										{pro.Name}
									</option>
								))}
							</select>
						</div>

						<div className="col-span-3">
							<label htmlFor="CityId" className="label">
								شهر
								{cityLoading && <i className="spinner la" />}
							</label>
							<select
								className="select"
								name="CityId"
								id="CityId"
								disabled={cityLoading}
								ref={register}
							>
								{cityData?.data.map((city: any) => (
									<option key={city.Id} value={city.Id}>
										{city.Name}
									</option>
								))}
							</select>
						</div>

						<div className="col-span-8">
							<label htmlFor="Address" className="label">
								آدرس
							</label>
							<input
								className="input"
								placeholder="آدرس"
								name="Address"
								id="Address"
								ref={register}
							/>
						</div>

						<div className="col-span-4">
							<label htmlFor="PhoneNo" className="label">
								تلفن ثابت <span className="required">*</span>
							</label>
							<input
								type="tel"
								className="input"
								placeholder="تلفن ثابت"
								name="PhoneNo"
								id="PhoneNo"
								ref={register({ required: true })}
							/>
						</div>
						<div className="col-span-4">
							<label htmlFor="Mobile" className="label">
								تلفن همراه <span className="required">*</span>
							</label>
							<input
								type="tel"
								className="input"
								placeholder="تلفن همراه"
								name="Mobile"
								id="Mobile"
								// readOnly
								disabled
								ref={register({ required: true })}
							/>
						</div>
						<div className="col-span-4">
							<label htmlFor="Email" className="label">
								ایمیل
							</label>
							<input
								type="email"
								className="input"
								placeholder="ایمیل"
								name="Email"
								id="Email"
								ref={register}
							/>
						</div>
						<div className="col-span-4">
							<label htmlFor="IssueId" className="label">
								علت مراجعه <span className="required">*</span>
							</label>
							<select
								className="select"
								name="IssueId"
								id="IssueId"
								ref={register({ required: true })}
							>
								{Object.keys(issueId).map((is) => (
									<option key={is} value={is}>
										{issueId[is]}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="new-row">
						<div className="col-span-12 mt-1">
							<SubmitButton
								label="تایید و ادامه"
								isValid={formState.submitCount > 0 && !formState.isValid}
								isSubmitting={formState.isSubmitting}
							/>
						</div>
					</div>
				</form>
			)}
		</>
	);
};

export default UserForm;
