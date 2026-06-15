import React, {useState} from "react";
import axios from "axios";


export default () => {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:4000/posts", {
            title
        });

        setTitle("");
    };

    return (
        <div className="container">
           <form className="form-group" onSubmit={handleSubmit}>
               <div>
                   <label htmlFor="title">Title</label>
                   <input className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
               </div>
               <button className="btn btn-primary">Create Post</button>
           </form>
        </div>
    );
};