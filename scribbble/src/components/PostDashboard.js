import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {
    fetchAllPosts,
    fetchPostsByCategory,
    openEditPost,
    postsSortByFilter,
} from '../actions/PostActions';
import EditPost from './EditPost';
import PostList from './PostList';
import {capitalizeString} from '../helpers/HelperFunctions';
import Menu from './Menu';
import {
    DropdownButton,
    MenuItem,
    Breadcrumb,
    Well,
    PageHeader,
    Button,
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
import {MdAddCircle} from 'react-icons/lib/md';

class PostDashboard extends Component {
    //React lifecycle methods
    componentWillMount() {
        this.props.openEditPost(false);
        this.setState({
            sortByFilter: null,
        });
    }

    componentDidMount() {
        this.fetchPosts(this.props.categoryFilter);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.categoryFilter !== nextProps.categoryFilter)
            this.fetchPosts(nextProps.categoryFilter);
    }

    //Fetches posts by category
    fetchPosts = category => {
        if (category === 'All Posts' || !category) this.props.fetchAllPosts();
        else this.props.fetchPostsByCategory(category);
    };

    // Handles the opening of the modal for a new post, with pre filled data
    handleOpenNewPostModal = () => {
        //Prefills the category of the new post form with either the current category selected
        //or the first category in the list
        let categoryForNewPost;
        !this.props.categoryFilter || this.props.categoryFilter === 'All Posts'
            ? (categoryForNewPost = this.props.categories[0].name)
            : (categoryForNewPost = this.props.categoryFilter);

        this.props.openEditPost(
            true, //Display Modal
            '', //Post Title
            '', //Post Author
            '', //Post Body
            categoryForNewPost, //Post Category
            null, //Post id
            'newPost', //Form mode (newPost/editPost)
        );
    };

    handleSortBy = filter => {
        this.props.postsSortByFilter(filter);
    };

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12}>
                        <PageHeader>
                            Scribbble <br />
                            <small>React Readable Forum</small>
                        </PageHeader>
                    </Col>
                    <Col xs={4}>
                        <Menu />{' '}
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <Col xs={6}>
                                <Breadcrumb>
                                    <Breadcrumb.Item active>
                                        Scribbble /{' '}
                                        {!this.props.categoryFilter
                                            ? 'All Posts'
                                            : capitalizeString(
                                                  this.props.categoryFilter,
                                              )}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                            <Col xs={6}>
                                <DropdownButton
                                    bsStyle={'default'}
                                    className="pull-right"
                                    title={'Sort by...'}
                                    key={1}
                                    id={`dropdown-basic-1`}>
                                    <MenuItem
                                        eventKey="1"
                                        onClick={() =>
                                            this.handleSortBy('voteScore')
                                        }>
                                        Sort By Vote
                                    </MenuItem>
                                    <MenuItem
                                        eventKey="2"
                                        onClick={() =>
                                            this.handleSortBy('timestamp')
                                        }>
                                        Sort By Time
                                    </MenuItem>
                                </DropdownButton>{' '}
                            </Col>
                        </Row>
                        <PostList />
                        <Well>
                            <Button
                                onClick={() => this.handleOpenNewPostModal()}
                                block>
                                <MdAddCircle /> Create New Post
                            </Button>
                        </Well>
                    </Col>
                </Row>
                {this.props.editPost.showModal && (
                    <EditPost handleCloseModal={this.handleCloseModal} />
                )}
            </Grid>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    categoryFilter: ownProps.match.params.category,
    categories: _.values(state.categories),
    editPost: state.editPost,
});

const mapDispatchToProps = () => dispatch => ({
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    openEditPost: (
        showModal,
        postTitle,
        postAuthor,
        postBody,
        postCategory,
        postId,
        mode,
    ) =>
        dispatch(
            openEditPost(
                showModal,
                postTitle,
                postAuthor,
                postBody,
                postCategory,
                postId,
                mode,
            ),
        ),
    postsSortByFilter: filter => dispatch(postsSortByFilter(filter)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostDashboard),
);
