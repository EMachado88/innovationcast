import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulma/css/bulma.min.css';
import "./styles.css";

import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/api/posts");
      response = await response.json();


    }

    fetchMyAPI();
  }, []);
  return (
    <div className="App">
      <h1 className="title">Comments</h1>
      <button className="button is-info is-light mb-4">
        <span className="icon-text">
          <span className="icon mr-2">
            <i className="fas fa-filter"></i>
          </span>
        </span>
        <span>Filter</span>
      </button>

      <div className="columns">
        <div className="column is-three-quarters">
          <div className="columns">
            <div className="column is-1">
              <figure className="image is-48x48">
                <img className="is-rounded" src="https://bulma.io/images/placeholders/48x48.png" />
              </figure>
            </div>
            <div className="column">
              <strong>Comment</strong>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellat vitae est modi, quo consequuntur dolores voluptate rerum accusantium illo, ratione deleniti officia cum amet doloremque, id facere distinctio recusandae!</p>
            </div>
          </div>
          <hr />
          <hr />
          <hr />
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
