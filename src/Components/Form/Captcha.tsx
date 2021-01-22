/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { $GetCaptcha } from 'Services/followup';

const CaptchaInput = ({ register, name }: { register: any; name: string }) => {
	const [isLoading, setLoading] = useState(true);
	const [state, updateState] = useState(0);
	const forceUpdate = useCallback(() => updateState(Math.random()), []);
	const [cap, setCaptcha] = useState({
		url: '',
		id: '',
	});

	useEffect(() => {
		async function captcha() {
			setLoading(true);
			setCaptcha(await $GetCaptcha());
			setLoading(false);
		}

		captcha();
	}, [state]);

	if (isLoading) {
		return <i className="spinner" />;
	}

	return (
		<>
			<div className="captcha">
				<img src={cap.url} alt="captcha" />
				<span onClick={() => forceUpdate()}>
					<FontAwesomeIcon icon={faSync} />
				</span>
			</div>

			<input
				type="text"
				className="input in-en"
				placeholder="عبارت امنیتی"
				data-id={cap.id}
				onKeyPress={(event) => {
					const arregex = /^[a-zA-Z0-9_ ]*$/;
					if (!arregex.test(event.key)) event.preventDefault();
				}}
				name={name}
				id={name}
				ref={register({ required: true })}
			/>
		</>
	);
};

export default CaptchaInput;
