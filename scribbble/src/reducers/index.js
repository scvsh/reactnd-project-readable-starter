import _ from 'lodash';
import * as POST_ACTIONS from '../actions/PostActions.js';
import * as COMMENT_ACTIONS from '../actions/CommentActions.js';
import * as CATEGORY_ACTIONS from '../actions/CategoryActions.js';

const initialState = {
    postList: [],
    categories: [],
    editPost: {
        showModal: false,
    },
    editComment: {
        showModal: false,
    },
    postsSortByFilter: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        // Handling post actions

        case POST_ACTIONS.RECEIVE_ALL_POST:
            return {
                ...state,
                postList: _.mapKeys(action.posts, 'id'),
                categoryFilter: action.category,
            };

        case POST_ACTIONS.RECEIVE_POST_BY_CATEGORY:
            return {
                ...state,
                postList: _.mapKeys(action.posts, 'id'),
                categoryFilter: action.category,
            };

        case POST_ACTIONS.DISPLAY_POST_DETAILS:
            return {
                ...state,
                postDetail: state.postList[action.id],
            };

        case POST_ACTIONS.GET_NEW_POST:
            return {
                ...state,
                postList: {
                    ...state.postList,
                    [action.post.id]: action.post,
                },
                editPost: {
                    showModal: false,
                },
            };

        case POST_ACTIONS.VOTE_POST_UP:
            if (state.postDetail && state.postDetail.id === action.post.id) {
                return {
                    ...state,
                    postList: {
                        ...state.postList,
                        [action.post.id]: action.post,
                    },
                    postDetail: action.post,
                };
            }
            return {
                ...state,
                postList: {
                    ...state.postList,
                    [action.post.id]: action.post,
                },
            };

        case POST_ACTIONS.VOTE_POST_DOWN:
            if (state.postDetail && state.postDetail.id === action.post.id) {
                return {
                    ...state,
                    postList: {
                        ...state.postList,
                        [action.post.id]: action.post,
                    },
                    postDetail: action.post,
                };
            }
            return {
                ...state,
                postList: {
                    ...state.postList,
                    [action.post.id]: action.post,
                },
            };

        case POST_ACTIONS.DELETE_POST:
            let postList = {
                ...state.postList,
            };
            delete postList[action.post.id];

            return {
                ...state,
                postList: postList,
                postDetail: null,
            };

        case POST_ACTIONS.GET_POST:
            let postDetail;
            if (!action.post.error && action.post.deleted === false)
                postDetail = action.post;
            else postDetail = null;
            return {
                ...state,
                postDetail: postDetail,
            };

        case POST_ACTIONS.POST_CONTROL:
            return {
                ...state,
                editPost: {
                    ...state.editPost,
                    showModal: action.showModal,
                    postTitle: action.postTitle,
                    postAuthor: action.postAuthor,
                    postBody: action.postBody,
                    postCategory: action.postCategory,
                    postId: action.postId,
                    mode: action.mode,
                },
            };

        case POST_ACTIONS.EDIT_POST:
            return {
                ...state,
                postList: {
                    ...state.postList,
                    [action.post.id]: action.post,
                },
                editPost: {
                    showModal: false,
                },
                postDetail: action.post,
            };

        case POST_ACTIONS.POST_SORT_BY_FILTER:
            let newOrder;
            if (action.filter === state.postsSortByFilter) {
                switch (state.postsSortByOrder) {
                    case 'asc':
                        newOrder = 'desc';
                        break;
                    case 'desc':
                        newOrder = 'asc';
                        break;
                    default:
                        newOrder = 'desc';
                        break;
                }
            } else newOrder = 'desc';
            return {
                ...state,
                postsSortByFilter: action.filter,
                postsSortByOrder: newOrder,
            };

        // Handling Comment Actions

        case COMMENT_ACTIONS.RECEIVE_POST_COMMENT:
            return {
                ...state,
                postDetailComments: _.mapKeys(action.comments, 'id'),
            };

        case COMMENT_ACTIONS.VOTE_COMMENT_UP:
            return {
                ...state,
                postDetailComments: {
                    ...state.postDetailComments,
                    [action.comment.id]: action.comment,
                },
            };

        case COMMENT_ACTIONS.VOTE_COMMENT_DOWN:
            return {
                ...state,
                postDetailComments: {
                    ...state.postDetailComments,
                    [action.comment.id]: action.comment,
                },
            };

        case COMMENT_ACTIONS.POST_COMMENT:
            let commentCount = state.postDetail.commentCount + 1;
            return {
                ...state,
                postDetailComments: {
                    ...state.postDetailComments,
                    [action.comment.id]: action.comment,
                },
                postDetail: {
                    ...state.postDetail,
                    commentCount: commentCount,
                },
                postList: {
                    ...state.postList,
                    [state.postDetail.id]: {
                        ...state.postDetail,
                        commentCount: commentCount,
                    },
                },
            };

        case COMMENT_ACTIONS.DELETE_COMMENT: {
            let commentCount = state.postDetail.commentCount - 1;
            let postDetailComments = state.postDetailComments;
            delete postDetailComments[action.comment.id];
            return {
                ...state,
                postDetailComments,
                postDetail: {
                    ...state.postDetail,
                    commentCount: commentCount,
                },
                postList: {
                    ...state.postList,
                    [state.postDetail.id]: {
                        ...state.postDetail,
                        commentCount: commentCount,
                    },
                },
            };
        }

        case COMMENT_ACTIONS.OPEN_COMMENT_EDITOR:
            return {
                ...state,
                editComment: {
                    showModal: action.showModal,
                    author: action.author,
                    body: action.body,
                    id: action.id,
                },
            };

        case COMMENT_ACTIONS.EDIT_COMMENT:
            return {
                ...state,
                postDetailComments: {
                    ...state.postDetailComments,
                    [action.comment.id]: action.comment,
                },
            };

        //Handling category actions

        case CATEGORY_ACTIONS.RECEIVE_ALL_CATEGORY:
            return {
                ...state,
                categories: _.mapKeys(action.categories, 'name'),
            };

        default:
            return state;
    }
}

export default reducer;
