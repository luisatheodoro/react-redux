import React from 'react';
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";
import '../App.css';

export default () => {
    return (
        <div>
            <CommentBox/>
            <CommentList/>
        </div>
    )
};
