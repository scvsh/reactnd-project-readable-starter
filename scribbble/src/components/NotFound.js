import React, {Component} from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

class Showcase extends Component {
    render() {
        return (
            <div className="App">
                <Jumbotron>
                    <h1>404</h1>
                    <p>This is home for Nothing.</p>
                    <p>
                        <Button bsStyle="primary">Go home</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default Showcase;
