import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma/css/bulma.min.css'
import "./styles.css"

import { useEffect, useState } from "react"

import Navigation from './Navigation'
import NewComment from './NewComment'

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

  const { page } = useQueryParams()

  const fetchMyAPI = async () => {
    const response = await fetch(`/api/posts?page=${page || 1}`)
    const json = await response.json()
    setPosts(json.posts)
    setPrevPage(json.prev_page)
    setNextPage(json.next_page)
  }

  useEffect(() => {
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
          {posts.map((post: any) => {
            const differenceInTime = (new Date()).getTime() - (new Date(post.postedOn).getTime())
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

            return (
            <div key={post.id}>
              <div className="columns">
                <div className="column is-1">
                  <figure className="image is-48x48">
                    <img className="is-rounded" src={post.userProfileImgUrl} />
                  </figure>
                </div>
                <div className="column">
                  <div className="columns">
                    <strong className="column is-8">{post.userName}</strong>
                    <span className="column">{differenceInDays} {differenceInDays === 1 ? 'day' : 'days'} ago</span>
                  </div>
                  <p>{post.comment}</p>
                  {/* <p>{JSON.stringify(post)}</p> */}
                </div>
              </div>
              <hr />
            </div>
          )})}

          <Navigation page={page} prevPage={prevPage} nextPage={nextPage} />
        </div>

        <NewComment fetchMyAPI={fetchMyAPI} />
      </div>
    </div>
  )
}
