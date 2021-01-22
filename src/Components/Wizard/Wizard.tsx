import React, { Suspense, lazy, memo, useState, useCallback } from 'react';
import Spinner from 'Components/Spinner/Spinner';
import { styled } from 'bumbag';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import PrintInfo from 'Pages/PrintInfo';

const WizardComponent = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
	margin-bottom: 35px;

	.multisteps-form__progress-btn {
		transition-property: all;
		transition-duration: 0.15s;
		transition-timing-function: linear;
		transition-delay: 0s;
		position: relative;
		padding-top: 20px;
		color: #949d9f;
		border: none;
		background-color: transparent;
		outline: none;
		text-align: center;
	}

	.multisteps-form__progress-btn:before {
		position: absolute;
		top: -2px;
		right: 50%;
		display: block;
		width: 17px;
		height: 17px;
		content: '';
		-webkit-transform: translateX(50%);
		transform: translateX(50%);
		transition: all 0.15s linear 0s,
			-webkit-transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
		transition: all 0.15s linear 0s,
			transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
		transition: all 0.15s linear 0s,
			transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s,
			-webkit-transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
		border: 3px solid #d6d6d6;
		border-radius: 50%;
		background-color: #d6d6d6;
		box-sizing: border-box;
		z-index: 3;
	}
	.multisteps-form__progress-btn:after {
		position: absolute;
		top: 5px;
		right: calc(-50% - 13px / 2);
		transition-property: all;
		transition-duration: 0.15s;
		transition-timing-function: linear;
		transition-delay: 0s;
		display: block;
		width: 100%;
		height: 3px;
		content: '';
		background-color: #d6d6d6;
		z-index: 1;
	}
	.multisteps-form__progress-btn:first-of-type:after {
		display: none;
	}
	.multisteps-form__progress-btn.js-active {
		color: #f2711c;
	}
	.multisteps-form__progress-btn.js-active:before {
		-webkit-transform: translateX(50%) scale(1.2);
		transform: translateX(50%) scale(1.2);
		background-color: #f2711c;
		border-color: #f2711c;
	}
	.multisteps-form__progress-btn.js-active:after {
		background-color: #f2711c;
	}
`;

const SelectDoctor = lazy(() => import('./1.SelectDoctor'));
const SelectTime = lazy(() => import('./2.SelectTime'));
const UserAccount = lazy(() => import('./3.UserAccount'));
const Confirmation = lazy(() => import('./4.Confirmation'));

interface IProps {
	current: number;
}

const Indicator: React.FC<IProps> = ({ current }: IProps) => {
	return (
		<WizardComponent className="wizard-bar">
			<div
				className={`multisteps-form__progress-btn${
					current >= 0 ? ' js-active' : ''
				} `}
			>
				انتخاب پزشک
			</div>
			<div
				className={`multisteps-form__progress-btn${
					current >= 1 ? ' js-active' : ''
				} `}
			>
				انتخاب زمان
			</div>
			<div
				className={`multisteps-form__progress-btn${
					current >= 2 ? ' js-active' : ''
				} `}
			>
				مشخصات کاربر
			</div>
			<div
				className={`multisteps-form__progress-btn${
					current >= 3 ? ' js-active' : ''
				} `}
			>
				بازبینی و تایید نهایی
			</div>
			{/* <div
				className={`multisteps-form__progress-btn${
					current >= 4 ? ' js-active' : ''
				} `}
			>
				پرداخت
			</div> */}
		</WizardComponent>
	);
};

const Wizard: React.FC = () => {
	const [step, setStep] = useState(0);
	const [data, setData] = useState({});
	const [state, setStateMap] = useState({
		step1: {},
		step2: [],
		step3: {},
	});
	// const [state, setStateMap] = useState({
	// 	step1: {
	// 		DoctorId: 1,
	// 		DoctorFullName: 'آقای دکتر منصور مقدم',
	// 		DoctorSpeciality: 'قلب و عروق',
	// 		SpecialityId: '',
	// 	},
	// 	step2: ['2021-01-19T00:00:00', '', 1011],
	// 	step3: {
	// 		NationalCode: '123',
	// 		FirstName: '123',
	// 		LastName: '123',
	// 		BirthDate: '123',
	// 		FatherName: '123',
	// 		GenderType: '2',
	// 		ProvinceId: '135',
	// 		CityId: '1277',
	// 		Address: '123',
	// 		PhoneNo: '',
	// 		Mobile: '123',
	// 		Email: '',
	// 		IssueId: '1354',
	// 	},
	// });

	// React.useEffect(() => {
	// 	console.log(state);
	// }, [state]);

	const goForward = useCallback(() => {
		setStep(step + 1);
	}, [step]);

	const goBack = useCallback(() => {
		setStep(step - 1);
	}, [step]);

	const CurrentStep = () => {
		if (step === 0) {
			return (
				<SelectDoctor
					onSubmit={(value) => {
						setStateMap({ ...state, step1: value });
						goForward();
					}}
				/>
			);
		}
		if (step === 1) {
			return (
				<SelectTime
					step1={state.step1}
					onSubmit={(value) => {
						setStateMap({ ...state, step2: value });
						goForward();
					}}
					onPrev={() => goBack()}
				/>
			);
		}
		if (step === 2) {
			return (
				<UserAccount
					onSubmit={(value) => {
						setStateMap({ ...state, step3: value });
						goForward();
					}}
					step1={state.step1}
					onPrev={() => goBack()}
				/>
			);
		}

		if (step === 3) {
			return (
				<Confirmation
					onResult={(result) => {
						setData(result);
						goForward();
					}}
					state={state}
					onPrev={() => goBack()}
				/>
			);
		}
		if (step === 4) {
			return (
				<div className="content">
					<div className="header_form">پیگیری نوبت</div>

					<PrintInfo data={data} />
				</div>
			);
		}
	};

	return (
		<Suspense fallback={<Spinner />}>
			<Indicator current={step} />
			{CurrentStep()}
		</Suspense>
	);
};

export default memo(Wizard);
