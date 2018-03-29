import React, {Component} from 'react';
import {MdAddCircle} from 'react-icons/lib/md';
import FieldGroup from './FieldGroup.js';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import uuidv1 from 'uuid';
import Post from './Post';
import EditPost from './EditPost';
import EditComment from './EditComment.js';
import Comment from './Comment';
import Menu from './Menu';
import {openEditPost, getPost} from '../actions/PostActions';
import {
    fetchPostComments,
    postComment,
    deleteComment,
    changeComment,
    openCommentEditorAction,
} from '../actions/CommentActions';
import {
    ControlLabel,
    FormControl,
    FormGroup,
    Well,
    Alert,
    PageHeader,
    Button,
    Grid,
    Row,
    Col,
} from 'react-bootstrap';

class PostDetail extends Component {
    state = {
        commentAddFieldsOn: false,
        commentBody: '',
        commentAuthor: '',
    };

    //React lifecycle methods
    componentDidMount() {
        this.props.getPost(this.props.postDetailId);
        this.props.fetchPostComments(this.props.postDetailId);
    }

    //Event handling
    handleCloseModal = () => {
        this.setState({commentAddFieldsOn: false});
    };

    handleCommentSubmit = event => {
        event.preventDefault();
        this.props.postComment(
            uuidv1.v1(),
            Date.now(),
            this.state.commentBody,
            this.state.commentAuthor,
            this.props.postDetail.id,
        );
        this.setState({
            commentBody: '',
            commentAuthor: '',
        });
        this.handleCloseModal();
    };

    handleEditComment = (author, body, id) => {
        this.props.openCommentEditorAction(
            true, //Show Modal
            author,
            body,
            id,
        );
    };

    handleNewCommentInputChange = event => {
        const targetName = event.target.name;
        switch (targetName) {
            case 'commentBody':
                this.setState({
                    commentBody: event.target.value,
                });
                break;
            case 'commentAuthor':
                this.setState({
                    commentAuthor: event.target.value,
                });
                break;
            default:
                alert('error in new comment modal');
        }
    };

    renderPost = () => {
        return (
            <div>
                {this.props.editPost.showModal && <EditPost />}
                <Post post={this.props.postDetail} />
                {this.props.editComment.showModal && <EditComment />}
                <hr />

                <h4>Comments</h4>

                <Well>
                    <Button
                        onClick={() =>
                            this.setState({commentAddFieldsOn: true})
                        }
                        block>
                        <MdAddCircle />
                        Add new comment
                    </Button>
                </Well>

                {this.state.commentAddFieldsOn && (
                    <Well>
                        <form className="text-left">
                            <ControlLabel>Add Comment</ControlLabel>
                            <FieldGroup
                                type="text"
                                id="formControlsText"
                                placeholder="Author"
                                name="commentAuthor"
                                onChange={this.handleNewCommentInputChange}
                                value={this.state.commentAuthor}
                            />

                            <FormGroup controlId="formControlsTextarea">
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="Comment Text"
                                    name="commentBody"
                                    onChange={this.handleNewCommentInputChange}
                                    value={this.state.commentBody}
                                />
                            </FormGroup>
                            <Button
                                type="submit"
                                onClick={this.handleCommentSubmit}>
                                Submit
                            </Button>
                        </form>
                    </Well>
                )}
                {this.props.postDetailComments.length !== 0 &&
                    this.props.postDetailComments.map(comment => (
                        <Comment
                            commentId={comment.id}
                            voteScore={comment.voteScore}
                            author={comment.author}
                            timestamp={comment.timestamp}
                            key={comment.id}
                            body={comment.body}
                            handleEdit={this.handleEditComment}
                            handleDelete={this.props.deleteComment}
                        />
                    ))}
                {this.props.postDetailComments.length === 0 && (
                    <Alert bsStyle="warning">No one is talking</Alert>
                )}
            </div>
        );
    };

    render() {
        return (
            <div className="container">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <PageHeader>
                                Scribbble <br />
                                <small>React Readable Forum</small>
                            </PageHeader>
                        </Col>
                        <Col xs={4}>
                            <Menu />
                        </Col>
                        <Col xs={8}>
                            <div className="postList">
                                <div className="postDiv">
                                    {!this.props.postDetail && (
                                        <Alert bsStyle="warning">
                                            <strong>Gah!</strong> You've smashed
                                            the wall!
                                        </Alert>
                                    )}
                                    {this.props.postDetail && this.renderPost()}
                                </div>
                            </div>{' '}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    postDetail: state.postDetail,
    postDetailComments: _.values(state.postDetailComments),
    editPost: state.editPost,
    editComment: state.editComment,
    postDetailId: ownProps.match.params.id,
});

const mapDispatchToProps = () => dispatch => ({
    fetchPostComments: id => dispatch(fetchPostComments(id)),
    postComment: (id, timestamp, body, author, parentId) =>
        dispatch(postComment(id, timestamp, body, author, parentId)),
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
    deleteComment: id => dispatch(deleteComment(id)),
    changeComment: (id, timestamp, body) =>
        dispatch(changeComment(id, timestamp, body)),
    openCommentEditorAction: (showModal, author, body, id) =>
        dispatch(openCommentEditorAction(showModal, author, body, id)),
    getPost: id => dispatch(getPost(id)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostDetail),
);
