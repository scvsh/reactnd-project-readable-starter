import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Panel, Label, Badge} from 'react-bootstrap';
import {processTime} from '../helpers/HelperFunctions';
import {
    MdArrowUpward,
    MdArrowDownward,
    MdEdit,
    MdDelete,
} from 'react-icons/lib/md';
import {
    displayPostDetails,
    deletePost,
    openEditPost,
} from '../actions/PostActions';

import {voteUpPost, voteDownPost} from '../actions/PostActions';

class Post extends Component {
    state = {
        redirect: false,
    };

    handlePostDeletion = () => {
        this.props.deletePost(this.props.post.id);
        this.setState({
            redirect: true,
        });
    };

    handlePostEdit = () => {
        this.props.openEditPost(
            true,
            this.props.post.title,
            this.props.post.author,
            this.props.post.body,
            this.props.post.category,
            this.props.post.id,
            'editPost',
        );
    };

    render() {
        return (
            <div>
                <Panel bsStyle="primary" className="text-left">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">
                            <Link
                                to={`/${this.props.post.category}/${
                                    this.props.post.id
                                }`}>
                                {`${this.props.post.title}`}{' '}
                            </Link>
                            <Badge bsStyle="info">{`Comments: ${
                                this.props.post.commentCount
                            }`}</Badge>
                            <MdEdit onClick={this.handlePostEdit} />{' '}
                            <MdDelete onClick={this.handlePostDeletion} />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{`${this.props.post.body}`}</Panel.Body>
                    <Panel.Footer>
                        By <b>{`${this.props.post.author}`}</b>{' '}
                        {`on ${processTime(this.props.post.timestamp)}`}{' '}
                        <MdArrowUpward
                            onClick={() =>
                                this.props.voteUp(this.props.post.id)
                            }
                        />
                        <Label bsStyle="success">{`Score: ${
                            this.props.post.voteScore
                        }`}</Label>
                        <MdArrowDownward
                            onClick={() =>
                                this.props.voteDown(this.props.post.id)
                            }
                        />
                    </Panel.Footer>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = () => dispatch => ({
    displayPostDetail: id => dispatch(displayPostDetails(id)),
    deletePost: id => dispatch(deletePost(id)),
    voteUp: id => dispatch(voteUpPost(id)),
    voteDown: id => dispatch(voteDownPost(id)),
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
});

export default withRouter(connect(null, mapDispatchToProps)(Post));
