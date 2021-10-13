export default function Post(props: any) {
  const { post } = props

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
        </div>
      </div>
      <hr />
    </div>
  )
}
