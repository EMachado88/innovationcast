import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma/css/bulma.min.css'
import "./styles.css"

import { useEffect, useState } from "react"

import Navigation from "./Navigation"

function useQueryParams(): any {
  const params = new URLSearchParams(
    window ? window.location.search : {}
  );

  return new Proxy(params, {
      get(target, prop: string) {
          return target.get(prop)
      },
  });
}

export default function App() {
  const [posts, setPosts] = useState([])
  const [nextPage, setNextPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const { page } = useQueryParams()

  const handleToggleModal = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(`/api/posts?page=${page || 1}`)
      const json = await response.json()
      setPosts(json.posts)
      setPrevPage(json.prev_page)
      setNextPage(json.next_page)
    }

    fetchMyAPI()
  }, [])

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
                </div>
              </div>
              <hr />
            </div>
          ))}

          <Navigation page={page} prevPage={prevPage} nextPage={nextPage} />
        </div>

        <div className="column">
          <button onClick={handleToggleModal} className="button is-info is-light mb-4">
            <span className="icon-text">
              <span className="icon mr-2">
                <i className="fas fa-regular fa-envelope"></i>
              </span>
            </span>
            <span>Comment</span>
          </button>

          <div className={`modal${modalOpen ? ' is-active' : ''}`}>
            <div className="modal-background" onClick={handleToggleModal}></div>

            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">New comment</p>
              </header>
              <section className="modal-card-body">
              <textarea className="textarea" placeholder="Enter your comment..."></textarea>
              </section>
              <footer className="modal-card-foot">
                <button className="button is-success">Submit</button>
                <button onClick={handleToggleModal} className="button">Cancel</button>
              </footer>
            </div>

            <button onClick={handleToggleModal} className="modal-close is-large" aria-label="close"></button>
          </div>
        </div>
      </div>
    </div>
  )
}
