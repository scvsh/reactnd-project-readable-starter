import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post.js';
import {
    Modal,
    ControlLabel,
    FormControl,
    FormGroup,
    Well,
    Nav,
    NavItem,
    PageHeader,
    Button,
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
import FieldGroup from './components/FieldGroup.js';
import {MdAddCircle} from 'react-icons/lib/md';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <PageHeader>
                                Scribbble <br />
                                <small>React Readable Forum</small>
                            </PageHeader>
                        </Col>
                        <Col xs={4}>
                            <Nav bsStyle="pills" stacked activeKey={1}>
                                <NavItem eventKey={1} href="/home">
                                    NavItem 1 content
                                </NavItem>
                                <NavItem eventKey={2} title="Item">
                                    NavItem 2 content
                                </NavItem>
                                <NavItem eventKey={3} disabled>
                                    NavItem 3 content
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col xs={8}>
                            <FormGroup
                                bsSize="small"
                                controlId="formControlsSelect">
                                <FormControl
                                    componentClass="select"
                                    placeholder="select">
                                    <option value="score">Sort by Score</option>
                                    <option value="date">Sort by Date</option>
                                </FormControl>
                            </FormGroup>
                            <Post />
                            <Well>
                                <Button vertical block>
                                    <MdAddCircle /> Create New Post
                                </Button>
                            </Well>
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>New Scribbble</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <form>
                                        <FormGroup controlId="formControlsSelect">
                                            <ControlLabel>Select Category</ControlLabel>
                                            <FormControl
                                                componentClass="select"
                                                placeholder="Select Category">
                                                <option value="select">
                                                    Category #1
                                                </option>
                                                <option value="other">
                                                    ...
                                                </option>
                                            </FormControl>
                                        </FormGroup>

                                        <FieldGroup
                                            id="formControlsText"
                                            type="text"
                                            placeholder="Author"
                                        />
                                        <FieldGroup
                                            id="formControlsText"
                                            type="text"
                                            placeholder="Post Title"
                                        />
                                        <FormGroup controlId="formControlsTextarea">
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder="Post Text"
                                            />
                                        </FormGroup>

                                    </form>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button>Close</Button>
                                    <Button bsStyle="primary">Post</Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
