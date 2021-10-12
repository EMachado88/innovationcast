import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulma/css/bulma.min.css';
import "./styles.css";

import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(`/api/posts`);
      const json = await response.json()
      console.log(json)
      setPosts(json.posts)
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Comments</h1>
      <button className="button is-info is-light mb-5">
        <span className="icon-text">
          <span className="icon mr-2">
            <i className="fas fa-filter"></i>
          </span>
        </span>
        <span>Filter</span>
      </button>

      <div className="columns">
        <div className="column is-three-quarters">
          {posts.map((post: any) => (
            <div key={post.id}>
              <div className="columns">
                <div className="column is-1">
                  <figure className="image is-48x48">
                    <img className="is-rounded" src={post.userProfileImgUrl} />
                  </figure>
                </div>
                <div className="column">
                  <strong>{post.userName}</strong>
                  <p>{post.comment}</p>
                  {/* <p>{JSON.stringify(post)}</p> */}
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className="column">
          <button className="button is-info is-light mb-4">
            <span className="icon-text">
              <span className="icon mr-2">
                <i className="fas fa-regular fa-envelope"></i>
              </span>
            </span>
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
