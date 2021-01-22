/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import MainLayout from 'Components/Layout/MainLayout';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { SubmitButton } from 'Components/Form/FormKit';
import CaptchaInput from 'Components/Form/Captcha';
import { $Tracking } from 'Services/followup';
import PrintInfo from './PrintInfo';

const FollowUp: React.FC = () => {
	const [trackingInfo, setTrackingInfo] = useState({
		data: {},
		isSuccess: false,
	});

	const { handleSubmit, register, formState } = useForm({
		defaultValues: {
			NationalCode: '',
			TrackingCode: '',
			Code: '',
		},
	});
	const onSubmit = async (data: any) => {
		const { NationalCode, TrackingCode, Code: CaptchaCode } = data;

		const CaptchaId =
			document
				.querySelectorAll('input#Code[data-id]')[0]
				.getAttribute('data-id') || '';

		try {
			const json = await $Tracking(
				TrackingCode,
				NationalCode,
				CaptchaCode,
				CaptchaId
			);
			setTrackingInfo({
				data: json.data.data,
				isSuccess: json.data.isSuccess,
			});
		} catch (error) {
			toast.error(error.response.data.message || error.message);
		}

		console.log({ data });
	};

	// React.useEffect(() => {
	// 	onSubmit({});
	// }, []);

	return (
		<MainLayout title="پیگیری نوبت کلینیک بیمارستان جم">
			<div className="content mb-2">
				<div className="header_form">پیگیری نوبت</div>

				{(trackingInfo.isSuccess && <PrintInfo data={trackingInfo.data} />) || (
					<form onSubmit={handleSubmit(onSubmit)} className="center">
						<p>لطفا اطلاعات زیر را وارد نمایید.</p>
						<label htmlFor="TrackingCode" className="label">
							کد رهگیری *
						</label>
						<input
							type="text"
							className="input"
							placeholder="کد رهگیری"
							name="TrackingCode"
							id="TrackingCode"
							ref={register({ required: true })}
						/>
						<label htmlFor="NationalCode" className="label">
							کد ملی *
						</label>

						<input
							type="text"
							className="input"
							placeholder="کد ملی"
							name="NationalCode"
							id="NationalCode"
							ref={register({ required: true })}
						/>

						<div className="field">
							<p>عبارت امنیتی را وارد نمایید.</p>
							<CaptchaInput register={register} name="Code" />
						</div>
						<div className="button_actions">
							<SubmitButton
								label="جست‌وجو"
								isValid={formState.submitCount > 0 && !formState.isValid}
								isSubmitting={formState.isSubmitting}
							/>
						</div>
					</form>
				)}
			</div>
		</MainLayout>
	);
};

export default FollowUp;
