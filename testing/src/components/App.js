import React from 'react';
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import '../App.css';

export default () => {
    return (
        <div>
            <CommentBox/>
            <CommentList/>
        </div>
    )
};
