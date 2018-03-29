import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Post from './Post';
import {Alert} from 'react-bootstrap';

class PostList extends Component {
    render() {
        return (
            <div className="postList">
                {this.props.postList.length === 0 && (
                    <div className="postDiv">
                        <Alert bsStyle="warning">
                            <strong>Oh shi~</strong> Somebody have stolen all
                            the posts!
                        </Alert>
                    </div>
                )}
                {_.orderBy(
                    this.props.postList,
                    this.props.postsSortByFilter,
                    this.props.postsSortByOrder,
                ).map(post => (
                    <div key={post.id} className="postDiv">
                        <Post post={post} />
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    postList: _.values(state.postList),
    postsSortByFilter: state.postsSortByFilter,
    postsSortByOrder: state.postsSortByOrder,
});

export default connect(mapStateToProps, null)(PostList);
