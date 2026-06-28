import React, {useState, useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
    const [posts, setPosts] = useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:4002/posts')
            .then(response => {
                setPosts(response.data);
            });
            
    }, []);

const renderedPosts = Object.values(posts).map(post => {
    return (<div className="card" style={{ marginBottom: '20px', width: '30%' }} key={post.id}>
        <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
        </div>
    </div>
    );
});

  return (
    <div d-flex flex-row flex-wrap justify-content-between>
      {renderedPosts}
    </div>
  );
};
         