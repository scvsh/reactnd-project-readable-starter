import * as CategoriesAPI from '../api/categoriesAPI';

export const RECEIVE_ALL_CATEGORY = 'RECEIVE_ALL_CATEGORY';

// Fetch posts
export const receiveAllCategories = categories => ({
    type: RECEIVE_ALL_CATEGORY,
    categories,
});

// Fetch categories
export const fetchCategories = () => dispatch =>
    CategoriesAPI.getAll().then(categories =>
        dispatch(receiveAllCategories(categories)),
    );
