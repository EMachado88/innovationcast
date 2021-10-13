import { useState } from 'react'

export default function Filter(props: any) {
  const { posts, setPosts, setIsValidated, fetchMyAPI, isValidated } = props
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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

  return (
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
  )
}
