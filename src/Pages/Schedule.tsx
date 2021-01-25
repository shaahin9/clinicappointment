import React from 'react';
import MainLayout from 'Components/Layout/MainLayout';
import { useAxios } from 'Network/Axios';
import { useLocation, useHistory } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { ValueType } from 'react-select';
import ReactPaginate from 'react-paginate';
import qs from 'query-string';
import { $GetDoctorDropDown, $GetBaseDropDown } from 'Services/step1';
import { makeTimeIntervals, getDate } from 'Utils/persianDate';

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

const Schedule = () => {
	const location = useLocation();
	const history = useHistory();
	const x = qs.parse(location.search);

	const [currentPage, setCurrentPage] = React.useState<number>(
		parseInt(x.page as string, 10) || 0
	);

	React.useEffect(() => {
		history.replace(`/schedule?page=${currentPage}`);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [currentPage, history]);

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

	// const values = JSON.stringify({
	// 	DoctorId: parseInt(doctorId?.value, 10) || null,
	// 	SpecialityId: parseInt(specialityId?.value, 10) || null,
	// });

	const [{ data, loading, error }] = useAxios({
		url: `/DoctorSchedule/GetAllDoctorScheduleComplete?Page=${
			currentPage + 1
		}&PageSize=16&CreateDateFrom=12/2/2015&CreateDateTo=12/5/2020`,
		method: 'GET',
	});

	return (
		<MainLayout title="جدول زمانبندی کلینیک بیمارستان جم">
			<div className="new-row row-1rem mb-1 mobile-box">
				<div className="col-span-4">
					<div className="box_search_title">جستجو پزشک</div>
					<div className="box_search_body">
						<AsyncSelect
							isRtl
							isClearable
							cacheOptions
							placeholder="انتخاب..."
							isSearchable={false}
							noOptionsMessage={() => 'موردی یافت نشد'}
							loadingMessage={() => 'در حال دریافت...'}
							loadOptions={doctorDropdown}
							defaultOptions
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
							placeholder="انتخاب..."
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
				<div className="content mb-2 mt-1">
					<div className="header_form">جدول زمان‌بندی کلینیک</div>
					<div className="mt-4">
						{data.data.map((doctor: any) => (
							<div key={doctor.Id} className="doctor-box">
								<div className="part1">
									<img
										className="doctor-pic"
										src={doctor.DoctorAvatar}
										alt={`${doctor.DoctorFirstName} ${doctor.DoctorLastName}`}
									/>
									<div className="name">
									<h2  >{`${doctor.DoctorFirstName} ${doctor.DoctorLastName}`}</h2>
									<p>{doctor.SpecialityTitle}</p>
									</div>
									
								</div>
								<div className="part2">
									{makeTimeIntervals(doctor.From, doctor.To, 30)?.map((t) => (
										<div key={t} className="time-box">
											{getDate(doctor.Date, 'dddd - DD MMMM ')}({t})
										</div>
									))}
								</div>
							</div>
						))}
					</div>
					<ReactPaginate
						previousLabel="قبلی"
						nextLabel="بعدی"
						breakLabel="..."
						breakClassName="page-item"
						breakLinkClassName="page-link"
						pageCount={Math.ceil(data?.TotalItems / 16)}
						marginPagesDisplayed={1}
						initialPage={currentPage}
						pageRangeDisplayed={5}
						onPageChange={(selectedItem: { selected: number }): void => {
							setCurrentPage(selectedItem.selected);
						}}
						containerClassName="pagination"
						pageClassName="page-item"
						pageLinkClassName="page-link"
						previousClassName="page-item"
						previousLinkClassName="page-link"
						nextLinkClassName="page-link"
						// subContainerClassName="pages pagination"
						activeClassName="active"
					/>
				</div>
			)}
		</MainLayout>
	);
};

export default Schedule;
