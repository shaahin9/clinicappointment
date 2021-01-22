import React from 'react';
import classNames from 'classnames';

export interface INameToValueMap {
	[key: string]: any;
}

interface ISubmitProps {
	className?: string;
	label: string;
	isValid: boolean;
	isSubmitting: boolean;
	onClick?: any;
}

export const SubmitButton: React.FC<ISubmitProps> = ({
	className,
	label,
	isValid,
	isSubmitting,
	onClick,
}: ISubmitProps) => (
	<button
		className={classNames('button next-step', className)}
		type="submit"
		disabled={isValid}
		onClick={onClick}
	>
		{(isSubmitting && <i className="spinner xs l" />) || label}
	</button>
);
