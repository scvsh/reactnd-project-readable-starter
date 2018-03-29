import React from 'react';
import FieldGroup from './FieldGroup.js';
import {
    Modal,
    ControlLabel,
    FormControl,
    FormGroup,
    Panel,
    Col,
    Label,
    Tooltip,
    Badge,
    Button,
} from 'react-bootstrap';
import {
    MdArrowUpward,
    MdArrowDownward,
    MdEdit,
    MdDelete,
} from 'react-icons/lib/md';

export default class FormComment extends React.Component {
    render() {
        return (
            <form className="text-left">
                <ControlLabel>Add Comment</ControlLabel>
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    placeholder="Author"
                />

                <FormGroup controlId="formControlsTextarea">
                    <FormControl
                        componentClass="textarea"
                        placeholder="Comment Text"
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}
