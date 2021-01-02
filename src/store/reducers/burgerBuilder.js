import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	UPDATE_INGREDIENTS,
	FETCHED_INGREDIENTS_SUCCESS,
	FETCHED_INGREDIENTS_FAIL,
} from '../actions/actionsType';

import INGREDIENT_PRICES from '../../assets/prices';

import produce from 'immer';

const initalState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
};

const addIngredient = (draft, ingredientType) => {
	draft.ingredients[ingredientType] += 1;
	draft.totalPrice += INGREDIENT_PRICES[ingredientType];
};

const removeIngredient = (draft, ingredientType) => {
	draft.ingredients[ingredientType] -= 1;
	draft.totalPrice -= INGREDIENT_PRICES[ingredientType];
};

const updateIngredients = (draft, ingredients, price) => {
	draft.ingredients = ingredients;
	draft.totalPrice = price;
	draft.error = false;
};

const fetchIngredientsFail = (draft) => {
	draft.error = true;
};

const ingredientsReducer = (state = initalState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ADD_INGREDIENT:
				return addIngredient(draft, action.payload.ingredientType);

			case REMOVE_INGREDIENT:
				return removeIngredient(draft, action.payload.ingredientType);

			case UPDATE_INGREDIENTS:
			case FETCHED_INGREDIENTS_SUCCESS:
				const { ingredients, totalPrice } = action.payload;
				return updateIngredients(draft, ingredients, totalPrice);

			case FETCHED_INGREDIENTS_FAIL:
				return fetchIngredientsFail(draft);
			default:
				break;
		}
	});
};

export default ingredientsReducer;
