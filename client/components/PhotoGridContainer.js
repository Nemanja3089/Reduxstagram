import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import PhotoGrid from './PhotoGrid';

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const PhotoGridContainer = connect(mapStateToProps, mapDispachToProps)(PhotoGrid);

export default PhotoGridContainer;
