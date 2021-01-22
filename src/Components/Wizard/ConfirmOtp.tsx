import React, { useState, useEffect } from 'react';
import PINInput from 'Components/Form/PinInput';
import { SubmitButton } from 'Components/Form/FormKit';

const COUNTDOWN_SECONDS = 60;
const FIELDS_LIMIT = 5;

interface IProps {
	onSubmit: any;
	onNewOTP: any;
	backward: any;
	phoneNumber: number | string;
}

function Countdown({ onClick }: { onClick: any }) {
	const [timing, setTiming] = useState(true);
	const [second, setSecond] = useState(COUNTDOWN_SECONDS);

	useEffect(() => {
		let interval: any;

		if (timing) {
			interval = setInterval(() => {
				setSecond((preSecond) => {
					if (preSecond <= 1) {
						setTiming(false);
						clearInterval(interval);
						return COUNTDOWN_SECONDS;
					}
					return preSecond - 1;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [timing]);

	return (
		<div className="timer mt-2">
			{(timing && (
				<>
					<svg className="circle">
						<circle r={18} cx={20} cy={20} />
					</svg>

					<h4 className="mt-1 mb-1">
						۰۰:{second < 10 ? `0${second}` : second}
					</h4>
					<small>زمان باقی‌مانده تا ارسال کدفعال‌سازی</small>
				</>
			)) || (
				<>
					کد فعالسازی را دریافت ننموده اید؟{' '}
					<button
						type="button"
						onClick={() => {
							setTiming(true);
							onClick();
						}}
						className="button mt-1 mb-1"
					>
						ارسال مجدد کد فعالسازی
					</button>
				</>
			)}
		</div>
	);
}

const ConfirmOtp: React.FC<IProps> = ({
	onSubmit,
	onNewOTP,
	backward,
	phoneNumber,
}: IProps) => {
	const [pinCode, setPinCode] = useState('');
	const [isLoading, setLoading] = useState(false);
	const isShort = pinCode.length >= FIELDS_LIMIT;

	return (
		<>
			<div className="mt-1">
				<PINInput
					type="number"
					fields={FIELDS_LIMIT}
					onChange={async (e: any) => {
						setPinCode(e);
						if (e.length >= FIELDS_LIMIT) {
							setLoading(true);
							await onSubmit(e);
							setLoading(false);
						}
					}}
				/>

				<Countdown onClick={() => onNewOTP(phoneNumber)} />

				<div className="actions mt-1">
					<div className="button_actions">
						<SubmitButton
							label="تایید و ادامه"
							isValid={!isLoading || !isShort}
							isSubmitting={isLoading}
							onClick={async () => {
								if (isShort) {
									setLoading(true);
									await onSubmit(pinCode);
									setLoading(false);
								}
							}}
						/>
						<button
							type="button"
							onClick={() => {
								backward();
							}}
							className="button link-button"
						>
							تغییر شماره موبایل
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOtp;
