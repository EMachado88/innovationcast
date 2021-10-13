import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma/css/bulma.min.css'
import "./styles.css"

import { useEffect, useState } from "react"

import Filter from './Filter'
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

  useEffect(() => {
    fetchMyAPI()

    isValidated && setPosts(posts.filter((post: any) => post.validated))
  }, [])

  return (
    <div className="App">
      <h1 className="title">Comments</h1>

      <div className="columns">
        <Filter posts={posts} setPosts={setPosts} setIsValidated={setIsValidated} fetchMyAPI={fetchMyAPI} isValidated={isValidated} />

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
