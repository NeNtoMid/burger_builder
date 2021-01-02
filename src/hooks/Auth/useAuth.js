import { useState, useCallback } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';

import { authUser, userWithBuilBurger } from './../../store/actions/index';
import { useEffect } from 'react';

const authValidation = {
	email: {
		elementType: 'input',
		elementConfig: {
			type: 'email',
			name: 'email',
			placeholder: 'Your email',
		},
		validation: {
			required: { value: true, message: 'Email is mandatory' },
			minLength: { value: 3, message: 'Email is too short' },
			pattern: {
				value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
				message: 'Email is not proper',
			},
		},
	},
	password: {
		elementType: 'input',
		elementConfig: {
			type: 'password',
			name: 'password',
			placeholder: 'Your password',
		},
		validation: {
			required: { value: true, message: 'Password is mandatory' },
			minLength: { value: 6, message: 'Password is too short' },
			maxLength: { value: 126, message: 'Password is too long' },
			setValueAs: (value) => value.trim(),
		},
	},
};

const handleUserRegistration = (location, watch) => {
	if (!location) {
		const firstPassword = watch('password', '');

		const verifyPassword = {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				name: 'secondpassword',
				placeholder: 'Re-enter password',
			},
			validation: {
				required: { value: true, message: 'Password must be verified' },
				minLength: { value: 6, message: 'Password is too short' },
				maxLength: { value: 126, message: 'Password is too long' },
				setValueAs: (value) => value.trim(),
				validate: (value) =>
					firstPassword.toString() === value.toString() ||
					'Passwords are not the same',
			},
		};

		authValidation.secondPassword = verifyPassword;
	} else if (location) {
		delete authValidation.secondPassword;
	}
};

const handleAuthNavigation = (history, location) => {
	history.push(`/auth?login=${!location}`);
};

const handleLoginData = async (
	data,
	history,
	location,
	dispatch,
	ings,
	setLoading
) => {
	try {
		const isBurgerNotBuild = ings
			? Object.keys(ings).every((ingName) => ings[ingName] === 0)
			: true;

		setLoading(true);

		const response = await dispatch(
			authUser(data.email, data.password, location)
		);

		if (!isBurgerNotBuild && response) {
			dispatch(userWithBuilBurger());

			history.replace('/checkout');
		} else if (isBurgerNotBuild && response) {
			history.replace('/');
		}
	} catch (error) {
		console.log(error);
	} finally {
		setLoading(false);
	}
};

const useAuth = () => {
	const [loading, setLoading] = useState(false);

	const [location, setLocation] = useState(true);

	const history = useHistory();

	const locationRouter = useLocation();

	const dispatch = useDispatch();

	const ings = useSelector((state) => state.ings.ingredients);

	const isAuth = useSelector((state) => state.auth.isAuth);

	const error = useSelector((state) => state.auth.error);

	const { register, handleSubmit, errors, watch } = useForm();

	useEffect(() => {
		const isOnLoginPage = JSON.parse(
			locationRouter.search.split('=')[1] || false
		);

		if (location !== isOnLoginPage) {
			setLocation(isOnLoginPage);
		}
	}, [locationRouter.search, location]);

	const onNavigateAuthHandler = () => handleAuthNavigation(history, location);

	const onGetLoginDataHandler = (data) =>
		handleLoginData(data, history, location, dispatch, ings, setLoading);

	handleUserRegistration(location, watch);

	return {
		loading,
		location,
		ings,
		isAuth,
		error,
		authValidation,
		register,
		handleSubmit,
		errors,
		watch,
		onNavigateAuthHandler,
		onGetLoginDataHandler,
	};
};

export default useAuth;
