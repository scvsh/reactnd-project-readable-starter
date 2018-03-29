import * as PostsAPI from '../api/postsAPI';

export const POST_SORT_BY_FILTER = 'POST_SORT_BY_FILTER';
export const RECEIVE_ALL_POST = 'RECEIVE_ALL_POST';
export const GET_NEW_POST = 'GET_NEW_POST';

export const RECEIVE_POST_BY_CATEGORY = 'RECEIVE_POST_BY_CATEGORY';
export const VOTE_POST_UP = 'VOTE_POST_UP';
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN';
export const DISPLAY_POST_DETAILS = 'DISPLAY_POST_DETAILS';

export const DELETE_POST = 'DELETE_POST';
export const POST_CONTROL = 'POST_CONTROL';

export const EDIT_POST = 'EDIT_POST';

export const GET_POST = 'GET_POST';

// Fetch all
export const receiveAllPosts = posts => ({
    type: RECEIVE_ALL_POST,
    posts,
    category: 'All Posts',
});

export const fetchAllPosts = () => dispatch =>
    PostsAPI.getAll().then(posts => dispatch(receiveAllPosts(posts)));

export const newPost = (
    id,
    timestamp,
    title,
    body,
    author,
    category,
) => dispatch => {
    PostsAPI.newPost(id, timestamp, title, body, author, category).then(post =>
        dispatch(getNewPost(post)),
    );
};

export const getNewPost = post => ({
    type: GET_NEW_POST,
    post,
});

// Fetch by category
export const receivePostsByCategory = (category, posts) => ({
    type: RECEIVE_POST_BY_CATEGORY,
    posts,
    category,
});

export const fetchPostsByCategory = category => dispatch => {
    if (category) {
        PostsAPI.getByCategory(category).then(posts =>
            dispatch(receivePostsByCategory(category, posts)),
        );
    } else {
        PostsAPI.getAll().then(posts => dispatch(receiveAllPosts(posts)));
    }
};

// Delete
export const deletePostAction = post => ({
    type: DELETE_POST,
    post,
});

export const deletePost = id => dispatch => {
    PostsAPI.deletePost(id).then(post => dispatch(deletePostAction(post)));
};

// Vote UP
export const voteUpPostAction = post => ({
    type: VOTE_POST_UP,
    post,
});

export const voteUpPost = id => dispatch => {
    PostsAPI.upVote(id).then(post => dispatch(voteUpPostAction(post)));
};

// Down Vote
export const voteDownPostAction = post => ({
    type: VOTE_POST_DOWN,
    post,
});

export const voteDownPost = id => dispatch => {
    PostsAPI.downVote(id).then(post => dispatch(voteDownPostAction(post)));
};

// Details
export const displayPostDetails = id => ({
    type: DISPLAY_POST_DETAILS,
    id,
});

// Open editor
export const openEditPost = (
    showModal,
    postTitle,
    postAuthor,
    postBody,
    postCategory,
    postId,
    mode,
) => ({
    type: POST_CONTROL,
    showModal,
    postTitle,
    postAuthor,
    postBody,
    postCategory,
    postId,
    mode,
});

export const changePostAction = post => ({
    type: EDIT_POST,
    post,
});

export const changePost = (id, title, body) => dispatch => {
    PostsAPI.changePost(id, title, body).then(post =>
        dispatch(changePostAction(post)),
    );
};

//Sort
export const postsSortByFilter = filter => ({
    type: POST_SORT_BY_FILTER,
    filter,
});

//Get post
export const getPostAction = post => ({
    type: GET_POST,
    post,
});

export const getPost = id => dispatch => {
    PostsAPI.getPost(id).then(post => dispatch(getPostAction(post)));
};
