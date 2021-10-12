import { useState } from "react"

export default function NewComment(props: any) {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const { fetchMyAPI } = props

  const handleToggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleSubmit = async () => {
    if (!name || !message) {
      return
    }

    await fetch('/api/posts', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        userName: name,
        comment: message,
        userProfileImgUrl: 'https://i.pravatar.cc/150',
        validated: false
      })
    })

    fetchMyAPI()
    setName('')
    setMessage('')
    handleToggleModal()
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
            <input
              className="input mb-3"
              type="text"
              placeholder="Enter your name..."
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <textarea
              className="textarea"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Enter your comment..."
              value={message}
            />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={handleSubmit}>Submit</button>
            <button onClick={handleToggleModal} className="button">Cancel</button>
          </footer>
        </div>

        <button onClick={handleToggleModal} className="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
  )
}
