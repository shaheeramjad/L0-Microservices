import { useState } from "react";
import axios from "axios";
import React from "react";

export default (props) => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${props.postId}/comments`, {
        content: comment
        });
        setComment('');
    }

  return (
    <div>
     <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label >New Comment</label>
        <input
          type="text"
          className="form-control"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}