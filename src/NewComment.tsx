import { useState } from "react"

export default function NewComment() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleToggleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
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
  )
}
