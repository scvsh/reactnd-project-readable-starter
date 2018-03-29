import React from 'react';
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap';

export default class FieldGroup extends React.Component {
    render() {
        return (
            <FormGroup controlId={this.props.id}>
                <FormControl {...this.props} />
                {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
            </FormGroup>
        );
    }
}
