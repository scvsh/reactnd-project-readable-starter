import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Modal,
    FormControl,
    Button,
    ControlLabel,
    FormGroup,
} from 'react-bootstrap';
import {
    changeComment,
    openCommentEditorAction,
} from '../actions/CommentActions';

import FieldGroup from './FieldGroup.js';
class EditComment extends Component {
    state = {
        id: null,
        author: '',
        body: '',
    };

    //React lifecycle methods
    componentDidMount() {
        this.setState({
            id: this.props.editComment.id,
            author: this.props.editComment.author,
            body: this.props.editComment.body,
        });
    }

    // Event handling
    handleClose = () => {
        this.props.openCommentEditorAction(false, null, null);
    };

    handleCommentInputChange = event => {
        switch (event.target.name) {
            case 'commentBody':
                this.setState({
                    body: event.target.value,
                });
                break;
            default:
                break;
        }
    };

    handleCommentEditSubmit = event => {
        event.preventDefault();
        this.props.changeComment(this.state.id, Date.now(), this.state.body);
        this.handleClose();
    };

    render() {
        return (
            <Modal.Dialog show={`${this.props.editComment.showModal}`}>
                <form className="text-left">
                    <Modal.Header>
                        <ControlLabel>Edit Comment</ControlLabel>
                    </Modal.Header>
                    <Modal.Body>
                        <ControlLabel>Author</ControlLabel>
                        <FieldGroup
                            id="formControlsText"
                            type="text"
                            placeholder="Author"
                            onChange={this.handleCommentInputChange}
                            value={this.props.editComment.author}
                            label="Author"
                            disabled
                        />
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Text</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                placeholder="Comment Text"
                                name="commentBody"
                                onChange={this.handleCommentInputChange}
                                value={this.state.body}
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            onClick={this.handleCommentEditSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Dialog>
        );
    }
}

const mapStateToProps = state => ({
    editComment: state.editComment,
});

const mapDispatchToProps = () => dispatch => ({
    changeComment: (id, timestamp, body) =>
        dispatch(changeComment(id, timestamp, body)),
    openCommentEditorAction: (showModal, author, body) =>
        dispatch(openCommentEditorAction(showModal, author, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
