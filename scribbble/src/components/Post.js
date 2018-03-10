import React from 'react';
import {Panel, Col, Label, Tooltip, Badge} from 'react-bootstrap';
import {MdArrowUpward, MdArrowDownward, MdEdit, MdDelete} from 'react-icons/lib/md';

export default class Post extends React.Component {
    render() {
        return (
            <Panel bsStyle="primary" className="text-left"> 
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Post Heading {' '} 
                        
                    <Badge bsStyle="info">Comments</Badge>
                    <MdEdit />
                    {' '} 
                    <MdDelete />
</Panel.Title>
                                    </Panel.Heading>
                <Panel.Body>Post text</Panel.Body>
                <Panel.Footer>Post Author, Date
                    <MdArrowUpward/>
                    <Label bsStyle="success">Rating</Label>
                    <MdArrowDownward/>
        </Panel.Footer>
            </Panel>
        );
    }
}
