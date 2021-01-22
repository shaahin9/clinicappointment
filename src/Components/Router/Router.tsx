import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from 'Components/Spinner/Spinner';
import { AnimatePresence } from 'framer-motion';

const Home = lazy(() => import('Pages/Home'));
const FollowUp = lazy(() => import('Pages/FollowUp'));
const Schedule = lazy(() => import('Pages/Schedule'));
const Terms = lazy(() => import('Pages/Terms'));
const NotFound = lazy(() => import('Pages/NotFound'));

const Router: React.FC = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<AnimatePresence>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/follow-up" component={FollowUp} />
					<Route path="/schedule" component={Schedule} />
					<Route path="/terms" component={Terms} />
					<Route component={NotFound} />
				</Switch>
			</AnimatePresence>
		</Suspense>
	);
};

export default Router;
