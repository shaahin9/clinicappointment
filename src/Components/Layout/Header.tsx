import React, { memo, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngleDown,
	faSearch,
	faBars,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import useOnClickOutside from 'Hooks/useOnClickOutside';

interface IProps {
	title: string;
}
const Header: React.FC<IProps> = ({ title }: IProps) => {
	const ref2 = useRef(null);
	const [state, setstate] = useState(1000);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [ref, inView] = useInView({
		triggerOnce: false,
		rootMargin: '0px 0px',
	});

	useEffect(() => {
		if (!inView) {
			setstate(1000);
		}
	}, [inView]);

	useOnClickOutside(ref2, () => setstate(1000));

	const HeaderMenu = ({
		showLogo,
		sticky,
	}: {
		showLogo?: boolean;
		sticky?: boolean;
	}) => (
		<div ref={ref2} className={cx('nav_menu', { sticky: sticky })}>
			<div className="right-side">
				<div className="toc main_navbar" onClick={() => setMobileMenu(true)}>
					<FontAwesomeIcon icon={faBars} />
					<span>منو</span>
				</div>
				{showLogo && (
					<a href="/" className="logo">
						<img className="basic-logo" src="/media/jam_h_logo.png" />
					</a>
				)}
				<a className="main_navbar item" href="https://jamhospital.ir/fa">
					خانه
				</a>
				<div
					className={cx('main_navbar item', { active: state === 0 })}
					onClick={() => setstate(0)}
				>
					درباره ما
					<FontAwesomeIcon className="mr-1" icon={faAngleDown} />
					{state === 0 && (
						<div className="ui menu">
							<a
								className="item"
								href="https://jamhospital.ir/fa/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D8%AC%D9%85/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D9%85%D8%A7/"
							>
								تاریخچه
							</a>
							<a
								className="item"
								href="https://jamhospital.ir/fa/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D8%AC%D9%85/%D9%85%D8%AF%DB%8C%D8%B1%D8%B9%D8%A7%D9%85%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%B3%D8%AA%D8%A7%D9%86-%D8%AC%D9%85/"
							>
								مدیرعامل{' '}
							</a>
							<a
								className="item"
								href="https://jamhospital.ir/fa/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D8%AC%D9%85/%D9%87%DB%8C%D8%A7%D8%AA-%D9%85%D8%AF%DB%8C%D8%B1%D9%87-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%B3%D8%AA%D8%A7%D9%86-%D8%AC%D9%85/"
							>
								هیات مدیره{' '}
							</a>
							<a
								className="item"
								href="https://jamhospital.ir/fa/exec_managers"
							>
								مدیران اجرائی
							</a>
							<a
								className="item"
								href="https://jamhospital.ir/fa/quality_validation"
							>
								بهبود کیفیت و اعتباربخشی
							</a>
							<a className="item" href="https://jamhospital.ir/fa/honors">
								افتخارات
							</a>
						</div>
					)}
				</div>
				<a className="main_navbar item" href="https://jamhospital.ir/fa/پزشکان">
					پزشکان
				</a>
				<div className="main_navbar item">بخش‌های درمانی</div>
				<div
					className={cx('main_navbar item', { active: state === 1 })}
					onClick={() => setstate(1)}
				>
					آموزش و اخبار
					<FontAwesomeIcon className="mr-1" icon={faAngleDown} />
					{state === 1 && (
						<div className="ui menu">
							<a
								className="item"
								href="https://jamhospital.ir/fa/posts?post_category=آموزش عمومی"
							>
								آموزش عمومی
							</a>
							<a
								className="item"
								href="https://jamhospital.ir/fa/posts?post_category=آموزش کارکنان"
							>
								آموزش کارکنان
							</a>
							<a
								className="item"
								href="https://jamhospital.ir/fa/posts?post_category=اخبار و رویدادها"
							>
								اخبار و رویدادها
							</a>
							<a
								className="item"
								href="https://jamhospital.ir/fa/posts?post_category=فصلنامه جم"
							>
								فصل‌نامه جم
							</a>
						</div>
					)}
				</div>
				<div
					className={cx('main_navbar item', { active: state === 2 })}
					onClick={() => setstate(2)}
				>
					ارتباط با ما
					<FontAwesomeIcon className="mr-1" icon={faAngleDown} />
					{state === 2 && (
						<div className="ui menu">
							<a className="item" href="https://jamhospital.ir/fa/contact_info">
								تماس با ما
							</a>
							<a className="item" href="https://jamhospital.ir/fa/jobs">
								همکاری با جم
							</a>
						</div>
					)}
				</div>
			</div>

			<div className="left-side">
				<div className="lang_selector_search">
					<a className="item gn8-search-dialogue" href="/">
						<FontAwesomeIcon className="mr-1 teal" icon={faSearch} />
					</a>
				</div>

				<div className="lang_selector">
					<a className="header item" href="https://jamhospital.ir/fa/">
					فا	<i className="ir flag" />
					</a>
					<a className=" item" href="https://jamhospital.ir/en/">
					En	<i className="united kingdom flag" />
					</a>
					<a className=" item" href="https://jamhospital.ir/az/">
					Az<i className="az flag" /> 
					</a>
					<a className=" item" href="https://jamhospital.ir/ar/">
					Ar	<i className="sa flag" />
					</a>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<div className="new-container h2r" ref={ref}>
				<div className="top_menu_container">
					<HeaderMenu />
				</div>
			</div>

			{mobileMenu && (
				<div className="mobile_menu_wrap">
					<span onClick={() => setMobileMenu(false)} className="times">
						<FontAwesomeIcon icon={faTimes} />
					</span>
					<HeaderMenu showLogo />
				</div>
			)}

			<div className="h3r">
				<div className={cx('fixed_menu_container', { active: !inView })}>
					<div className="new-container">
						<HeaderMenu showLogo sticky />
					</div>
				</div>
			</div>

			{mobileMenu && <div className="mobile-overlay"></div>}

			<div className="new-container is-header">
				<div className="new-row slider">
					<div className="col-span-6" style={{ position: 'relative' }}>
						<span className="mobile-title">
							{title || 'نوبت دهی اینترنتی کلینیک'}
						</span>
						<div id="hero_slider_logo">
							<img
								className="logo"
								src="https://jamhospital.ir/asset/media/jam_shadow_logo.png"
							/>
						</div>
						<img
							className="slider-banner"
							src={process.env.PUBLIC_URL + '/media/banner.jpeg'}
							alt=""
						/>
					</div>
					<div className="col-span-6 slider-usp">
						{title || 'نوبت دهی اینترنتی کلینیک'}
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(Header);
