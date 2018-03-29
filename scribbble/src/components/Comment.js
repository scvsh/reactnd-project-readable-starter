import React from 'react';
import {Panel, Label} from 'react-bootstrap';
import {processTime} from '../helpers/HelperFunctions';
import {connect} from 'react-redux';
import {voteUpComment, voteDownComment} from '../actions/CommentActions';
import {
    MdArrowUpward,
    MdArrowDownward,
    MdEdit,
    MdDelete,
} from 'react-icons/lib/md';

class Comment extends React.Component {
    render() {
        return (
            <Panel className="text-left">
                <Panel.Heading>
                    By <b>{`${this.props.author}`}</b>{' '}
                    {`on ${processTime(this.props.timestamp)}`}{' '}
                    <MdEdit
                        onClick={() =>
                            this.props.handleEdit(
                                this.props.author,
                                this.props.body,
                                this.props.commentId,
                            )
                        }
                    />{' '}
                    <MdDelete
                        onClick={() =>
                            this.props.handleDelete(this.props.commentId)
                        }
                    />
                </Panel.Heading>
                <Panel.Body>
                    {this.props.body}
                    <MdArrowUpward
                        onClick={() =>
                            this.props.voteUpComment(this.props.commentId)
                        }
                    />
                    <Label bsStyle="success">{this.props.voteScore}</Label>
                    <MdArrowDownward
                        onClick={() =>
                            this.props.voteDownComment(this.props.commentId)
                        }
                    />
                </Panel.Body>
            </Panel>
        );
    }
}

const mapDispatchToProps = () => dispatch => ({
    voteUpComment: id => dispatch(voteUpComment(id)),
    voteDownComment: id => dispatch(voteDownComment(id)),
});

export default connect(null, mapDispatchToProps)(Comment);
