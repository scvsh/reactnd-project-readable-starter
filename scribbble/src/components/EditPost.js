import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import uuidv1 from 'uuid';
import {newPost, changePost, openEditPost} from '../actions/PostActions';
import FieldGroup from './FieldGroup.js';
import {
    Modal,
    ControlLabel,
    FormControl,
    FormGroup,
    Button,
} from 'react-bootstrap';

class EditPost extends Component {
    state = {
        postTitle: '',
        newPostCategory: '',
        postAuthor: '',
        postBody: '',
    };

    //React lifecycle methods
    componentDidMount() {
        this.setState({
            postId: this.props.editPost.postId,
            postTitle: this.props.editPost.postTitle,
            postBody: this.props.editPost.postBody,
            postAuthor: this.props.editPost.postAuthor,
            postCategory: this.props.editPost.postCategory,
        });
    }

    //Event Handling

    handleCloseNewPostModal = () => {
        this.props.openEditPost(false);
    };

    handleNewPostInputChange = event => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'postTitle':
                this.setState({
                    postTitle: value,
                });
                break;
            case 'newPostSelectCategory':
                this.setState({
                    postCategory: value,
                });
                break;
            case 'postAuthor':
                this.setState({
                    postAuthor: value,
                });
                break;
            case 'postBody':
                this.setState({
                    postBody: value,
                });
                break;
            default:
                return;
        }
        return;
    };

    handlePostSubmit = () => {
        if (this.props.editPost.mode === 'newPost') {
            this.props.newPost(
                uuidv1.v1(),
                Date.now(),
                this.state.postTitle,
                this.state.postBody,
                this.state.postAuthor,
                this.state.postCategory,
            );
        }

        if (this.props.editPost.mode === 'editPost') {
            this.props.changePost(
                this.state.postId,
                this.state.postTitle,
                this.state.postBody,
            );
        }
    };

    render() {
        return (
            <Modal.Dialog show={`${this.props.editPost.showModal}`}>
                <Modal.Header>
                    <Modal.Title>
                        {this.props.editPost.mode === 'newPost'
                            ? 'New Scribbble'
                            : 'Edit Scribbble'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select Category</ControlLabel>
                            <FormControl
                                componentClass="select"
                                name="newPostSelectCategory"
                                onChange={this.handleNewPostInputChange}
                                disabled={
                                    this.props.editPost.mode === 'editPost'
                                }
                                defaultValue={this.props.editPost.postCategory}
                                placeholder="Select Category">
                                {this.props.categories.map(category => (
                                    <option
                                        key={category.name}
                                        value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </FormControl>
                        </FormGroup>

                        <FieldGroup
                            type="text"
                            placeholder="Author"
                            name={'postAuthor'}
                            onChange={this.handleNewPostInputChange}
                            value={this.state.postAuthor}
                            disabled={this.props.editPost.mode === 'editPost'}
                        />
                        <FieldGroup
                            type="text"
                            placeholder="Post Title"
                            name={'postTitle'}
                            onChange={this.handleNewPostInputChange}
                            value={this.state.postTitle}
                        />
                        <FieldGroup
                            componentClass="textarea"
                            placeholder="Post Text"
                            name={'postBody'}
                            value={this.state.postBody}
                            onChange={this.handleNewPostInputChange}
                        />
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => this.handleCloseNewPostModal()}>
                        Close
                    </Button>
                    <Button
                        onClick={() => this.handlePostSubmit()}
                        bsStyle="primary">
                        Post
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}

const mapStateToProps = state => ({
    categoryFilter: state.categoryFilter,
    categories: _.values(state.categories),
    editPost: state.editPost,
});

const mapDispatchToProps = () => dispatch => ({
    newPost: (id, timestamp, title, body, author, category) =>
        dispatch(newPost(id, timestamp, title, body, author, category)),
    openEditPost: status => dispatch(openEditPost(status)),
    changePost: (id, title, body) => dispatch(changePost(id, title, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
