/* eslint-disable react/jsx-no-target-blank */
import React, { ReactNode, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, styled } from 'bumbag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFlask,
	faInfoCircle,
	faCalendarAlt,
	faUserMd,
	faMap,
	faEnvelope,
	faFax,
	faPhoneSquareAlt,
	faMapMarkedAlt,
	faArrowLeft,
	faLink,
	faGlobe,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

const Body = styled(Box)`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
`;

interface IProps {
	children: ReactNode;
	title: string;
}

const Links = () => (
	<div className="new-container min internal-links">
		<div className="new-row wide-fit">
			<div className="col-span-3">
				<a className="link-card" href="https://jamhospital.ir/fa/پزشکان">
					<div className="new-icon">
						<FontAwesomeIcon icon={faUserMd} />
					</div>
					<div className="new-link-box">
						پزشکان
						<br />
						جــــم
					</div>
				</a>
			</div>
			<div className="col-span-3">
				<a
					className="link-card"
					href="https://jamhospital.ir/fa/نوبت-دهی-کلینیکها-پاراکلینیکهای"
				>
					<div className="new-icon">
						<FontAwesomeIcon icon={faCalendarAlt} />
					</div>
					<div className="new-link-box b">
						نوبت‌دهی <br />
						کلینیک
					</div>
				</a>
			</div>
			<div className="col-span-3">
				<a
					className="link-card"
					href="https://jamhospital.ir/fa/راهنمای-بیماران"
				>
					<div className="new-icon">
						<FontAwesomeIcon icon={faInfoCircle} />
					</div>
					<div className="new-link-box c">
						راهنمای
						<br />
						مراجعین
					</div>
				</a>
			</div>
			<div className="col-span-3">
				<a className="link-card" href="http://jamhospitalportal.ir/labanswer">
					<div className="new-icon">
						<FontAwesomeIcon icon={faFlask} />
					</div>
					<div className="new-link-box d">
						جوابدهی
						<br />
						آزمایشگاه
					</div>
				</a>
			</div>
		</div>
	</div>
);

const Sidebar = () => (
	<div className="menu">
		<NavLink to="/schedule" className="item">
			جدول زمانبندی کلینیک
		</NavLink>
		<NavLink to="/follow-up" className="item">
			پیگیری نوبت
		</NavLink>
		<NavLink to="/" exact className="item">
			نوبت دهی
		</NavLink>
		<NavLink to="/terms" className="item">
			قوانین و مقررات
		</NavLink>
	</div>
);

const MainLayout: React.FC<IProps> = ({ children, title }: IProps) => {
	return (
		<Body>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main id="content">
				<Header title={title} />

				<div className="homepage-shortlinks-main_container">
					<Links />

					<div className="new-container">
						<div className="new-row row-1rem print-center">
							<div className="col-span-3 sidebar">
								<Sidebar />
							</div>
							<div className="col-span-9">{children}</div>
						</div>
					</div>
				</div>
			</main>

			<footer className="footer">
				<div className="new-container">
					<div className="new-row wide-fit">
						<div className="col-span-4">
							<div className="foot-head">
								<i className="icon">
									<FontAwesomeIcon icon={faMap} />
								</i>
								تماس با ما
							</div>

							<div className="footer-body">
								<div className="contact-item">
									<FontAwesomeIcon icon={faMapMarkedAlt} />

									<span>
										تهران، خيابان مطهری، خيابان جم، شماره 86 <br />
										كد پستي: 1588657915
									</span>
								</div>

								<div className="contact-item">
									<FontAwesomeIcon icon={faPhoneSquareAlt} />
									<span>
										تلفن:
										<a href="tel:+982184141">84141(021)</a> و{' '}
										<a id="contactus_info_rannum" href="tel:99-88820090">
											99-88820090(021)
										</a>
									</span>
								</div>

								<div className="contact-item">
									<FontAwesomeIcon icon={faFax} />
									<span>
										دورنگار:
										<a href="tel:+982188303227"> 88303227(021)</a>
									</span>
								</div>

								<div className="contact-item">
									<FontAwesomeIcon icon={faEnvelope} />
									<span>
										آدرس ایمیل:
										<a href="mailto:info@jamhospital.ir">info@jamhospital.ir</a>
									</span>
								</div>

								<div className="social_media_segment">
									<a
										href="https://www.instagram.com/jamhospital/"
										target="_blank"
									>
										<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzIuMDA0IiBoZWlnaHQ9IjEzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzc3MWM4Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzM3NzFjOCIgb2Zmc2V0PSIuMTI4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjBmIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmQ1Ii8+PHN0b3Agb2Zmc2V0PSIuMSIgc3RvcC1jb2xvcj0iI2ZkNSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiNmZjU0M2UiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNjODM3YWIiLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjE1OC40MjkiIGN5PSI1NzguMDg4IiByPSI2NSIgeGxpbms6aHJlZj0iI2EiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAgLTEuOTgxOTggMS44NDM5IDAgLTEwMzEuNDAyIDQ1NC4wMDQpIiBmeD0iMTU4LjQyOSIgZnk9IjU3OC4wODgiLz48cmFkaWFsR3JhZGllbnQgaWQ9ImQiIGN4PSIxNDcuNjk0IiBjeT0iNDczLjQ1NSIgcj0iNjUiIHhsaW5rOmhyZWY9IiNiIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguMTczOTQgLjg2ODcyIC0zLjU4MTggLjcxNzE4IDE2NDguMzQ4IC00NTguNDkzKSIgZng9IjE0Ny42OTQiIGZ5PSI0NzMuNDU1Ii8+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjYykiIGQ9Ik02NS4wMyAwQzM3Ljg4OCAwIDI5Ljk1LjAyOCAyOC40MDcuMTU2Yy01LjU3LjQ2My05LjAzNiAxLjM0LTEyLjgxMiAzLjIyLTIuOTEgMS40NDUtNS4yMDUgMy4xMi03LjQ3IDUuNDY4QzQgMTMuMTI2IDEuNSAxOC4zOTQuNTk1IDI0LjY1NmMtLjQ0IDMuMDQtLjU2OCAzLjY2LS41OTQgMTkuMTg4LS4wMSA1LjE3NiAwIDExLjk4OCAwIDIxLjEyNSAwIDI3LjEyLjAzIDM1LjA1LjE2IDM2LjU5LjQ1IDUuNDIgMS4zIDguODMgMy4xIDEyLjU2IDMuNDQgNy4xNCAxMC4wMSAxMi41IDE3Ljc1IDE0LjUgMi42OC42OSA1LjY0IDEuMDcgOS40NCAxLjI1IDEuNjEuMDcgMTguMDIuMTIgMzQuNDQuMTIgMTYuNDIgMCAzMi44NC0uMDIgMzQuNDEtLjEgNC40LS4yMDcgNi45NTUtLjU1IDkuNzgtMS4yOCA3Ljc5LTIuMDEgMTQuMjQtNy4yOSAxNy43NS0xNC41MyAxLjc2NS0zLjY0IDIuNjYtNy4xOCAzLjA2NS0xMi4zMTcuMDg4LTEuMTIuMTI1LTE4Ljk3Ny4xMjUtMzYuODEgMC0xNy44MzYtLjA0LTM1LjY2LS4xMjgtMzYuNzgtLjQxLTUuMjItMS4zMDUtOC43My0zLjEyNy0xMi40NC0xLjQ5NS0zLjAzNy0zLjE1NS01LjMwNS01LjU2NS03LjYyNEMxMTYuOSA0IDExMS42NCAxLjUgMTA1LjM3Mi41OTYgMTAyLjMzNS4xNTcgMTAxLjczLjAyNyA4Ni4xOSAwSDY1LjAzeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDQgMSkiLz48cGF0aCBmaWxsPSJ1cmwoI2QpIiBkPSJNNjUuMDMgMEMzNy44ODggMCAyOS45NS4wMjggMjguNDA3LjE1NmMtNS41Ny40NjMtOS4wMzYgMS4zNC0xMi44MTIgMy4yMi0yLjkxIDEuNDQ1LTUuMjA1IDMuMTItNy40NyA1LjQ2OEM0IDEzLjEyNiAxLjUgMTguMzk0LjU5NSAyNC42NTZjLS40NCAzLjA0LS41NjggMy42Ni0uNTk0IDE5LjE4OC0uMDEgNS4xNzYgMCAxMS45ODggMCAyMS4xMjUgMCAyNy4xMi4wMyAzNS4wNS4xNiAzNi41OS40NSA1LjQyIDEuMyA4LjgzIDMuMSAxMi41NiAzLjQ0IDcuMTQgMTAuMDEgMTIuNSAxNy43NSAxNC41IDIuNjguNjkgNS42NCAxLjA3IDkuNDQgMS4yNSAxLjYxLjA3IDE4LjAyLjEyIDM0LjQ0LjEyIDE2LjQyIDAgMzIuODQtLjAyIDM0LjQxLS4xIDQuNC0uMjA3IDYuOTU1LS41NSA5Ljc4LTEuMjggNy43OS0yLjAxIDE0LjI0LTcuMjkgMTcuNzUtMTQuNTMgMS43NjUtMy42NCAyLjY2LTcuMTggMy4wNjUtMTIuMzE3LjA4OC0xLjEyLjEyNS0xOC45NzcuMTI1LTM2LjgxIDAtMTcuODM2LS4wNC0zNS42Ni0uMTI4LTM2Ljc4LS40MS01LjIyLTEuMzA1LTguNzMtMy4xMjctMTIuNDQtMS40OTUtMy4wMzctMy4xNTUtNS4zMDUtNS41NjUtNy42MjRDMTE2LjkgNCAxMTEuNjQgMS41IDEwNS4zNzIuNTk2IDEwMi4zMzUuMTU3IDEwMS43My4wMjcgODYuMTkgMEg2NS4wM3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDA0IDEpIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTY2LjAwNCAxOGMtMTMuMDM2IDAtMTQuNjcyLjA1Ny0xOS43OTIuMjktNS4xMS4yMzQtOC41OTggMS4wNDMtMTEuNjUgMi4yMy0zLjE1NyAxLjIyNi01LjgzNSAyLjg2Ni04LjUwMyA1LjUzNS0yLjY3IDIuNjY4LTQuMzEgNS4zNDYtNS41NCA4LjUwMi0xLjE5IDMuMDUzLTIgNi41NDItMi4yMyAxMS42NUMxOC4wNiA1MS4zMjcgMTggNTIuOTY0IDE4IDY2cy4wNTggMTQuNjY3LjI5IDE5Ljc4N2MuMjM1IDUuMTEgMS4wNDQgOC41OTggMi4yMyAxMS42NSAxLjIyNyAzLjE1NyAyLjg2NyA1LjgzNSA1LjUzNiA4LjUwMyAyLjY2NyAyLjY3IDUuMzQ1IDQuMzE0IDguNSA1LjU0IDMuMDU0IDEuMTg3IDYuNTQzIDEuOTk2IDExLjY1MiAyLjIzIDUuMTIuMjMzIDYuNzU1LjI5IDE5Ljc5LjI5IDEzLjAzNyAwIDE0LjY2OC0uMDU3IDE5Ljc4OC0uMjkgNS4xMS0uMjM0IDguNjAyLTEuMDQzIDExLjY1Ni0yLjIzIDMuMTU2LTEuMjI2IDUuODMtMi44NyA4LjQ5Ny01LjU0IDIuNjctMi42NjggNC4zMS01LjM0NiA1LjU0LTguNTAyIDEuMTgtMy4wNTMgMS45OS02LjU0MiAyLjIzLTExLjY1LjIzLTUuMTIuMjktNi43NTIuMjktMTkuNzg4IDAtMTMuMDM2LS4wNi0xNC42NzItLjI5LTE5Ljc5Mi0uMjQtNS4xMS0xLjA1LTguNTk4LTIuMjMtMTEuNjUtMS4yMy0zLjE1Ny0yLjg3LTUuODM1LTUuNTQtOC41MDMtMi42Ny0yLjY3LTUuMzQtNC4zMS04LjUtNS41MzUtMy4wNi0xLjE4Ny02LjU1LTEuOTk2LTExLjY2LTIuMjMtNS4xMi0uMjMzLTYuNzUtLjI5LTE5Ljc5LS4yOXptLTQuMzA2IDguNjVjMS4yNzgtLjAwMiAyLjcwNCAwIDQuMzA2IDAgMTIuODE2IDAgMTQuMzM1LjA0NiAxOS4zOTYuMjc2IDQuNjguMjE0IDcuMjIuOTk2IDguOTEyIDEuNjUzIDIuMjQuODcgMy44MzcgMS45MSA1LjUxNiAzLjU5IDEuNjggMS42OCAyLjcyIDMuMjggMy41OTIgNS41Mi42NTcgMS42OSAxLjQ0IDQuMjMgMS42NTMgOC45MS4yMyA1LjA2LjI4IDYuNTguMjggMTkuMzlzLS4wNSAxNC4zMy0uMjggMTkuMzljLS4yMTQgNC42OC0uOTk2IDcuMjItMS42NTMgOC45MS0uODcgMi4yNC0xLjkxMiAzLjgzNS0zLjU5MiA1LjUxNC0xLjY4IDEuNjgtMy4yNzUgMi43Mi01LjUxNiAzLjU5LTEuNjkuNjYtNC4yMzIgMS40NC04LjkxMiAxLjY1NC01LjA2LjIzLTYuNTguMjgtMTkuMzk2LjI4LTEyLjgxNyAwLTE0LjMzNi0uMDUtMTkuMzk2LS4yOC00LjY4LS4yMTYtNy4yMi0uOTk4LTguOTEzLTEuNjU1LTIuMjQtLjg3LTMuODQtMS45MS01LjUyLTMuNTktMS42OC0xLjY4LTIuNzItMy4yNzYtMy41OTItNS41MTctLjY1Ny0xLjY5LTEuNDQtNC4yMy0xLjY1My04LjkxLS4yMy01LjA2LS4yNzYtNi41OC0uMjc2LTE5LjM5OHMuMDQ2LTE0LjMzLjI3Ni0xOS4zOWMuMjE0LTQuNjguOTk2LTcuMjIgMS42NTMtOC45MTIuODctMi4yNCAxLjkxMi0zLjg0IDMuNTkyLTUuNTIgMS42OC0xLjY4IDMuMjgtMi43MiA1LjUyLTMuNTkyIDEuNjkyLS42NiA0LjIzMy0xLjQ0IDguOTEzLTEuNjU1IDQuNDI4LS4yIDYuMTQ0LS4yNiAxNS4wOS0uMjd6bTI5LjkyOCA3Ljk3Yy0zLjE4IDAtNS43NiAyLjU3Ny01Ljc2IDUuNzU4IDAgMy4xOCAyLjU4IDUuNzYgNS43NiA1Ljc2IDMuMTggMCA1Ljc2LTIuNTggNS43Ni01Ljc2IDAtMy4xOC0yLjU4LTUuNzYtNS43Ni01Ljc2em0tMjUuNjIyIDYuNzNjLTEzLjYxMyAwLTI0LjY1IDExLjAzNy0yNC42NSAyNC42NSAwIDEzLjYxMyAxMS4wMzcgMjQuNjQ1IDI0LjY1IDI0LjY0NUM3OS42MTcgOTAuNjQ1IDkwLjY1IDc5LjYxMyA5MC42NSA2NlM3OS42MTYgNDEuMzUgNjYuMDAzIDQxLjM1em0wIDguNjVjOC44MzYgMCAxNiA3LjE2MyAxNiAxNiAwIDguODM2LTcuMTY0IDE2LTE2IDE2LTguODM3IDAtMTYtNy4xNjQtMTYtMTYgMC04LjgzNyA3LjE2My0xNiAxNi0xNnoiLz48L3N2Zz4=" />
									</a>

									<a href="https://t.me/hospitaljam" target="_blank">
										<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDI0MCAyNDAiPgo8ZGVmcz4KCTxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjAuNjY2NyIgeTE9IjAuMTY2NyIgeDI9IjAuNDE2NyIgeTI9IjAuNzUiPgoJCTxzdG9wIHN0b3AtY29sb3I9IiMzN2FlZTIiIG9mZnNldD0iMCIvPgoJCTxzdG9wIHN0b3AtY29sb3I9IiMxZTk2YzgiIG9mZnNldD0iMSIvPgoJPC9saW5lYXJHcmFkaWVudD4KCTxsaW5lYXJHcmFkaWVudCBpZD0idyIgeDE9IjAuNjU5NyIgeTE9IjAuNDM2OSIgeDI9IjAuODUxMiIgeTI9IjAuODAyNCI+CgkJPHN0b3Agc3RvcC1jb2xvcj0iI2VmZjdmYyIgb2Zmc2V0PSIwIi8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgb2Zmc2V0PSIxIi8+Cgk8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEyMCIgcj0iMTIwIiBmaWxsPSJ1cmwoI2IpIi8+CjxwYXRoIGZpbGw9IiNjOGRhZWEiIGQ9Im05OCAxNzVjLTMuODg3NiAwLTMuMjI3LTEuNDY3OS00LjU2NzgtNS4xNjk1TDgyIDEzMi4yMDU5IDE3MCA4MCIvPgo8cGF0aCBmaWxsPSIjYTljOWRkIiBkPSJtOTggMTc1YzMgMCA0LjMyNTUtMS4zNzIgNi0zbDE2LTE1LjU1OC0xOS45NTgtMTIuMDM1Ii8+CjxwYXRoIGZpbGw9InVybCgjdykiIGQ9Im0xMDAuMDQgMTQ0LjQxIDQ4LjM2IDM1LjcyOWM1LjUxODUgMy4wNDQ5IDkuNTAxNCAxLjQ2ODQgMTAuODc2LTUuMTIzNWwxOS42ODUtOTIuNzYzYzIuMDE1NC04LjA4MDItMy4wODAxLTExLjc0NS04LjM1OTQtOS4zNDgybC0xMTUuNTkgNDQuNTcxYy03Ljg5MDEgMy4xNjQ3LTcuODQ0MSA3LjU2NjYtMS40MzgyIDkuNTI4bDI5LjY2MyA5LjI1ODMgNjguNjczLTQzLjMyNWMzLjI0MTktMS45NjU5IDYuMjE3My0wLjkwODk5IDMuNzc1MiAxLjI1ODQiLz4KPC9zdmc+" />
									</a>

									<a
										href="https://www.facebook.com/jamhospital/"
										target="_blank"
									>
										<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjY2Ljg5M3B4IiBoZWlnaHQ9IjI2Ni44OTVweCIgdmlld0JveD0iMCAwIDI2Ni44OTMgMjY2Ljg5NSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjY2Ljg5MyAyNjYuODk1Ig0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGlkPSJCbHVlXzFfIiBmaWxsPSIjM0M1QTk5IiBkPSJNMjQ4LjA4MiwyNjIuMzA3YzcuODU0LDAsMTQuMjIzLTYuMzY5LDE0LjIyMy0xNC4yMjVWMTguODEyDQoJYzAtNy44NTctNi4zNjgtMTQuMjI0LTE0LjIyMy0xNC4yMjRIMTguODEyYy03Ljg1NywwLTE0LjIyNCw2LjM2Ny0xNC4yMjQsMTQuMjI0djIyOS4yN2MwLDcuODU1LDYuMzY2LDE0LjIyNSwxNC4yMjQsMTQuMjI1DQoJSDI0OC4wODJ6Ii8+DQo8cGF0aCBpZD0iZiIgZmlsbD0iI0ZGRkZGRiIgZD0iTTE4Mi40MDksMjYyLjMwN3YtOTkuODAzaDMzLjQ5OWw1LjAxNi0zOC44OTVoLTM4LjUxNVY5OC43NzdjMC0xMS4yNjEsMy4xMjctMTguOTM1LDE5LjI3NS0xOC45MzUNCglsMjAuNTk2LTAuMDA5VjQ1LjA0NWMtMy41NjItMC40NzQtMTUuNzg4LTEuNTMzLTMwLjAxMi0xLjUzM2MtMjkuNjk1LDAtNTAuMDI1LDE4LjEyNi01MC4wMjUsNTEuNDEzdjI4LjY4NGgtMzMuNTg1djM4Ljg5NWgzMy41ODUNCgl2OTkuODAzSDE4Mi40MDl6Ii8+DQo8L3N2Zz4NCg==" />
									</a>

									<a href="https://www.aparat.com/jamhospital" target="_blank">
										<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA1MCA1MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAgNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNFQzE1NUI7fQ0KCS5zdDF7ZmlsbDojMjUyMDIxO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjUuMiwzLjZjLTExLjksMC0yMS41LDkuNi0yMS41LDIxLjVzOS42LDIxLjUsMjEuNSwyMS41YzExLjksMCwyMS41LTkuNiwyMS41LTIxLjVTMzcuMSwzLjYsMjUuMiwzLjZ6DQoJIE0xOS4zLDkuNmMzLjMsMCw2LDIuNyw2LDZjMCwzLjMtMi43LDYtNiw2Yy0zLjMsMC02LTIuNy02LTZDMTMuMywxMi4zLDE2LDkuNiwxOS4zLDkuNnogTTE2LjEsMzcuOGMtMy4zLDAtNi0yLjctNi02DQoJYzAtMy4zLDIuNy02LDYtNmMzLjMsMCw2LDIuNyw2LDZDMjIuMSwzNS4xLDE5LjQsMzcuOCwxNi4xLDM3Ljh6IE0yNS4yLDI4LjFjLTEuNSwwLTIuNy0xLjItMi43LTIuN2MwLTEuNSwxLjMtMi43LDIuNy0yLjcNCgljMS41LDAsMi44LDEuMiwyLjgsMi43QzI3LjksMjYuOSwyNi43LDI4LjEsMjUuMiwyOC4xeiBNMzEuNSw0MC43Yy0zLjMsMC02LTIuNy02LTZjMC0zLjMsMi43LTYsNi02YzMuMywwLDYsMi43LDYsNg0KCUMzNy42LDM4LDM0LjksNDAuNywzMS41LDQwLjd6IE0zNC41LDI0LjZjLTMuMywwLTYtMi43LTYtNmMwLTMuMywyLjctNiw2LTZjMy4zLDAsNiwyLjcsNiw2QzQwLjUsMjEuOSwzNy45LDI0LjYsMzQuNSwyNC42eiIvPg0KPHBhdGggY2xhc3M9InN0MSIgZD0iTTQ4LjYsMjEuNWMtMS41LTYuMS0zLTkuOS04LjMtMTQuNGMzLjcsMC41LDYuNywxLjEsOC42LDQuMUM1MC44LDE0LjIsNDkuOSwxNy45LDQ4LjYsMjEuNXoiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00My44LDM5LjNjLTQuMiw0LjctNy4zLDcuMy0xNC4yLDguN2MzLjUsMS40LDYuNCwyLjIsOS41LDAuNUM0Mi4zLDQ2LjksNDMuMyw0My4xLDQzLjgsMzkuM3oiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yLjEsMjkuMmMxLjcsNiwzLjQsOS43LDguOSwxNGMtMy43LTAuMy02LjctMC44LTguOC0zLjdDMC4xLDM2LjcsMC45LDMyLjksMi4xLDI5LjJ6Ii8+DQo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNywxMC40YzQuNC00LjUsNy42LTcsMTQuNS04LjFjLTMuNC0xLjUtNi4zLTIuNS05LjUtMC45UzcuOCw2LjYsNywxMC40eiIvPg0KPC9zdmc+DQo=" />
									</a>
								</div>
							</div>
						</div>
						<div className="col-span-4">
							<div className="foot-head">
								<i className="icon">
									<FontAwesomeIcon icon={faLink} />
								</i>
								درباره بیمارستان جم
							</div>

							<div className="footer-body">
								<p>
									بنیادی که نیم قرن پیش و با نام بیمارستان جم در تهران بنا نهاده
									شده، امروز مرکز درمانی پیشرفته ای است که همچنان با همان نام
									بیش از پیش مصمم و متعهد در ارائه خدمات باکیفیت است...
								</p>
								<a href="/" className="foot-head mt-1 icon-left">
									<i className="icon">
										<FontAwesomeIcon icon={faArrowLeft} />
									</i>
									فصل‌نامه‌های جم
								</a>

								<form action="/" className="subscribe">
									<input
										type="email"
										placeholder="عضویت در خبرنامه"
										className="input-1"
									/>
									<button className="btn" type="submit">
										ارسال
									</button>
								</form>
							</div>
						</div>
						<div className="col-span-4">
							<div className="foot-head">
								<i className="icon">
									<FontAwesomeIcon icon={faGlobe} />
								</i>
								لینک های مفید
							</div>

							<div className="footer-body">
								<ul className="links">
									<li>
										<FontAwesomeIcon icon={faPlus} />
										ارتباط با ما
									</li>
									<li>
										<FontAwesomeIcon icon={faPlus} />
										راهنمای مراجعین
									</li>
									<li>
										<FontAwesomeIcon icon={faPlus} />
										انتقادات/پيشنهادات
									</li>
									<li>
										<FontAwesomeIcon icon={faPlus} />
										بیمه‌های طرف قرارداد
									</li>
									<li>
										<FontAwesomeIcon icon={faPlus} />
										سوالات متداول
									</li>

									<li>
										<FontAwesomeIcon icon={faPlus} />
										همکاری با ما
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-second">
					<div className="row">
						<div className="ui column center aligned basic segment">
							<div className="copyright">
								<a title="گروه سیروان" href="/" target="_blank">
									بیمارستان جم
								</a>
								© 2020
								<a target="_blank" href="https://jamhospital.ir/legal">
									{' '}
									| شرایط خدمات
								</a>
								<a target="_blank" href="https://jamhospital.ir/privacy_policy">
									{' '}
									| حریم خصوصی
								</a>
							</div>
							<div>
								<small>
									<a
										style={{ color: '#65a1dd' }}
										href="http://sirvangroup.com"
										target="_blank"
									>
										سیستم مدیریت یکپارچه بیمارستانی سیروان
									</a>
								</small>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</Body>
	);
};

export default memo(MainLayout);
