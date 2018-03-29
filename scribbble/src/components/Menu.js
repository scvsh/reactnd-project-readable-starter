import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchCategories} from '../actions/CategoryActions.js';
import {fetchPostsByCategory, fetchAllPosts} from '../actions/PostActions.js';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {capitalizeString} from '../helpers/HelperFunctions.js';

class Menu extends Component {
    //React lifecycle methods
    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        return (
            <div className="menuContainer">
                <ul className="menu">
                    <Nav bsStyle="pills" stacked>
                        <LinkContainer
                            key={'/'}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                            exact
                            to="/">
                            <NavItem
                                className="menuItem"
                                onClick={() => this.props.fetchAllPosts()}>
                                Home
                            </NavItem>
                        </LinkContainer>

                        {this.props.categories.map(category => (
                            <LinkContainer
                                key={category.name}
                                to={`/${category.name}`}>
                                <NavItem
                                    className="menuItem"
                                    onClick={() =>
                                        this.props.fetchPostsByCategory(
                                            category.name,
                                        )
                                    }>
                                    {capitalizeString(category.name)}
                                </NavItem>
                            </LinkContainer>
                        ))}
                    </Nav>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: _.values(state.categories),
});

const mapDispatchToProps = () => dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    fetchAllPosts: () => dispatch(fetchAllPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
