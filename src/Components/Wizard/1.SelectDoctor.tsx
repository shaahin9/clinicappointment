import React, { memo, useCallback } from 'react';
import { useAxios } from 'Network/Axios';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'

import { ValueType } from 'react-select';
import { $GetDoctorDropDown, $GetBaseDropDown } from 'Services/step1';

interface IProps {
	onSubmit: (obj: any) => void;
}
type OptionType = { label: string; value: string };

const doctorDropdown = async () => {
	const getData = await $GetDoctorDropDown();
	const convert = getData.data.data.map((p: any) => ({
		value: p.Value,
		label: p.Text,
	}));

	return convert;
};

const majorDropdown = async () => {
	const getData = await $GetBaseDropDown({
		Name: '',
		DropDownTypeId: 2,
		Id: 0,
	});

	const convert = getData.data.data.map((p: any) => ({
		value: p.Id,
		label: p.Name,
	}));

	return convert;
};

const SelectDoctor: React.FC<IProps> = ({ onSubmit }: IProps) => {
	const [doctorId, setDoctorId] = React.useState<{
		value: string;
		label: string;
	}>({
		value: '',
		label: '',
	});

	const [specialityId, setSpecialityId] = React.useState<{
		value: string;
		label: string;
	}>({
		value: '',
		label: '',
	});

	const values = JSON.stringify({
		DoctorId: parseInt(doctorId?.value, 10) || null,
		SpecialityId: parseInt(specialityId?.value, 10) || null,
		PageSize: 2,
	});

	const [{ data, loading, error }] = useAxios({
		url: '/Doctor/GetLightDoctorViewModelList',
		method: 'POST',
		data: values,
	});

	// const memomize = useCallback(
	// 	(str) => {
	// 		async function dropdown() {
	// 			const xp = await doctorDropdown();
	// 			const xxx = xp.find(function (post: any) {
	// 				if (post.label.includes(str)) return true;
	// 			});

	// 			console.log(xxx);
	// 			return xp;
	// 		}

	// 		return dropdown();
	// 	},
	// 	[doctorDropdown]
	// );

	return (
		<>
			<div className="new-row row-1rem mb-1 mobile-box">
				<div className="col-span-4">
					<div className="box_search_title">جستجو پزشک</div>
					<div className="box_search_body">
						<AsyncSelect
							isRtl
							isClearable
							cacheOptions
							placeholder="نام پزشک را جستجو کنید"
							isSearchable
							noOptionsMessage={() => 'موردی یافت نشد'}
							loadingMessage={() => 'در حال دریافت...'}
							loadOptions={doctorDropdown}
							defaultOptions
							// onInputChange={(e) => {
							// 	if (!e) return;
							// 	memomize(e);
							// }}
							onChange={(selectedOption: ValueType<OptionType, false>) => {
								if (selectedOption === null) {
									setDoctorId({
										value: '',
										label: '',
									});
								}
								setDoctorId(selectedOption as OptionType);
							}}
						/>
					</div>
				</div>
				<div className="col-span-4">
					<div className="box_search_title">جستجو تخصص</div>
					<div className="box_search_body">
						<AsyncSelect
							isRtl
							isClearable
							cacheOptions
							placeholder="تخصص مورد نظر را جستجو کنید"
							isSearchable={false}
							noOptionsMessage={() => 'موردی یافت نشد'}
							loadingMessage={() => 'در حال دریافت...'}
							loadOptions={majorDropdown}
							defaultOptions
							onChange={(selectedOption: ValueType<OptionType, false>) => {
								if (selectedOption === null) {
									setSpecialityId({
										value: '',
										label: '',
									});
								}
								setSpecialityId(selectedOption as OptionType);
							}}
						/>
					</div>
				</div>
			</div>

			{loading && 'در حال دریافت اطلاعات...'}
			{error && 'مشکلی در ارتباط وجود دارد'}

			{data && (
				<div className="new-row row-1rem" id="list_doctors">
					{data.data
						.filter((doctor: any) => doctor.HasAppointment === true)
						.map((doctor: any) => (
							<div key={doctor.Id} className="col-span-3">
								<div className="doctor-card">
									<div className="image">
										<img alt={doctor.FullName} src={doctor.ImagePath} />
									</div>

									<div className="figure">
										<div className="name">{doctor.FullName}</div>
										<div className="speciality">{doctor.Speciality}</div>
									</div>

									<div className="buttons">
										<div className="button about_btn">درباره پزشک</div>
										<button
											type="button"
											className="button select_btn"
											onClick={() =>
												onSubmit({
													DoctorId: doctor.Id,
													DoctorFullName: doctor.FullName,
													DoctorSpeciality: doctor.Speciality,
													SpecialityId: specialityId?.value,
												})
											}
										>
											انتخاب
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
			)}

			{/* <div className="new-row mt-2 mb-2 button_actions">
				{onPrev && (
					<div className="col-span">
						<button type="button" onClick={onPrev} className="button prev-step">
							مرحله قبل
						</button>
					</div>
				)}
				{onSubmit && (
					<div className="col-span">
						<button
							type="submit"
							onClick={onSubmit}
							className="button next-step"
							id="submit"
						>
							تایید و مرحله بعد
						</button>
					</div>
				)}
			</div> */}
		</>
	);
};

export default memo(SelectDoctor);
