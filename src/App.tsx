import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma/css/bulma.min.css'
import "./styles.css"

import { useEffect, useState } from "react"

import Navigation from './Navigation'
import NewComment from './NewComment'
import Post from './Post'

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
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isValidated, setIsValidated] = useState(false)
  const [totalPages, setTotalPages] = useState('...')

  const { page } = useQueryParams()

  const fetchMyAPI = async () => {
    const response = await fetch(`/api/posts?page=${page || 1}`)
    const json = await response.json()
    setPosts(json.posts)
    setPrevPage(json.prev_page)
    setNextPage(json.next_page)
    setTotalPages(String(json.total / json.per_page))
  }

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleChangeVisibility = async () => {
    setIsValidated(!isValidated)

    if (!isValidated) {
      const filtered = posts.filter((post: any) => post.validated)
      setPosts(filtered)
    } else {
      await fetchMyAPI()
    }
  }

  useEffect(() => {
    fetchMyAPI()

    isValidated && setPosts(posts.filter((post: any) => post.validated))
  }, [])

  return (
    <div className="App">
      <h1 className="title">Comments</h1>

      <div className="columns">
        <div className={`column dropdown${isFilterOpen ? ' is-active' : ''}`}>
          <div className="dropdown-trigger">
            <button
              className="button is-info is-light mb-5"
              onClick={handleFilterClick}
            >
              <span className="icon-text">
                <span className="icon mr-2">
                  <i className="fas fa-filter"></i>
                </span>
              </span>
              <span>Filter</span>
            </button>
          </div>

          <div className="dropdown-menu" id="dropdown-menu2" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
              <label className="checkbox">
                <input
                  className="mr-3"
                  onClick={handleChangeVisibility}
                  type="checkbox"
                  value={`${isValidated}`}
                />
                Validated
              </label>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          Page {page} of {totalPages} pages
        </div>
      </div>

      <div className="columns">
        <div className="column is-three-quarters">
          {posts.map((post: any) => (
            <Post key={post.id} post={post} />
          ))}

          <Navigation page={page} prevPage={prevPage} nextPage={nextPage} />
        </div>

        <NewComment fetchMyAPI={fetchMyAPI} />
      </div>
    </div>
  )
}
