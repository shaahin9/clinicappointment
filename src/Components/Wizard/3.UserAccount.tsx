import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { SubmitButton } from 'Components/Form/FormKit';
import { $RequestOtp, $ConfirmOtp } from 'Services/step3';
import ConfirmOtp from './ConfirmOtp';
import UserForm from './UserForm';

interface IProps {
	onSubmit: (obj: any) => any;
	step1: any;
	onPrev?: () => void;
}

const UserAccount: React.FC<IProps> = ({ onSubmit, step1, onPrev }: IProps) => {
	const [step, setStep] = useState('requestOtp');
	const [mobile, setMobile] = useState('');
	const [isLoading, setLoading] = useState(false);

	const isMobile = (str: string) =>
		// /^(9|09)(12|19|35|36|37|38|39|32|21)\d{7}$/.test(str);
		/^(\+98|0098|98|0)?9\d{9}$/.test(str);

	return (
		<div className="main_box insert_data">
			<div className="content mb-2">
				<div className="header_form">مشخصات کاربر</div>

				{step === 'requestOtp' && (
					<div className="center">
						<p>لطفا شماره موبایل خود را وارد نمایید.</p>
						<div className="field">
							<input
								className="input"
								type="text"
								placeholder="شماره موبایل"
								name="mobile"
								id="mobile_number"
								onKeyPress={(event) => {
									const arregex = /^[a-zA-Z0-9_ ]*$/;
									if (!arregex.test(event.key)) event.preventDefault();
								}}
								onChange={(e) => setMobile(e.target.value)}
								onBlur={(e) => setMobile(e.target.value)}
								required
							/>
							<span className="hint">فرمت شماره موبایل ۰۹۱۲۱۲۳۴۵۶۷</span>
						</div>

						<div className="button_actions">
							<SubmitButton
								label="ارسال"
								isValid={!isMobile(mobile)}
								isSubmitting={isLoading}
								onClick={async () => {
									try {
										setLoading(true);
										const data = await $RequestOtp(mobile);
										setStep('confirmOtp');
										toast.success(data.data.Message);
										setLoading(false);
									} catch (error) {
										toast.error(error.response.data.Message || error.message);
									}
								}}
							/>
						</div>
					</div>
				)}

				{step === 'confirmOtp' && (
					<div className="center">
						<p>
							لطفا کد ارسال شده به شماره <b>{mobile}</b> را وارد نمایید.
						</p>

						<ConfirmOtp
							onNewOTP={async () => {
								try {
									const data = await $RequestOtp(mobile);
									toast.success(data.data.Message);
								} catch (error) {
									toast.error(error.response.data.Message || error.message);
								}
							}}
							onSubmit={async (code: string) => {
								try {
									const data = await $ConfirmOtp({
										mobile,
										code,
									});

									if (data.data.Status !== 1) {
										toast.success(data.data.Message);
									}

									if (data.data.Status !== -1) {
										setStep('userForm');
									}
								} catch (error) {
									toast.error(error.response.data.Message || error.message);
								}
							}}
							backward={() => {
								setStep('requestOtp');
							}}
							phoneNumber={mobile}
						/>
					</div>
				)}

				{step === 'userForm' && (
					<div className="center" style={{ width: '100%', textAlign: 'right' }}>
						<UserForm
							onSubmit={(data) => {
								onSubmit(data);
							}}
							mobile={mobile}
							data={step1}
						/>
					</div>
				)}
			</div>

			<div className="new-row mt-2 mb-2 row-1rem button_actions">
				{onPrev && (
					<div className="col-span">
						<button type="button" onClick={onPrev} className="button prev-step">
							مرحله قبل
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserAccount;
