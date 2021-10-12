export default function Navigation(props: any) {
  const {page, prevPage, nextPage} = props

  return (
    <div className="my-6 columns is-centered">
      {prevPage && (
        <a href={`/?page=${parseInt(page) - 1}`} className="button">
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-chevron-left"></i>
            </span>
          </span>
        </a>
      )}

      {nextPage && (
        <a href={`/?page=${parseInt(page) + 1}`} className="button">
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-chevron-right"></i>
            </span>
          </span>
        </a>
      )}
    </div>
  )
}
