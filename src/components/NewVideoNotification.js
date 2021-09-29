import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";


const SUBSCRIBE_VIDEO_ADDED = gql`
#  subscription OnVideoAdded($title: String!) {
#     videoAdded(title: $title) {
#       id
#       title
#       url
#     }
#   }


subscription{
  videos{
    id
    title
    url
  }
}
`

const NewVideoNotification = () => {
  const { data, error, loading } = useSubscription(SUBSCRIBE_VIDEO_ADDED)

  if (loading) {
    return <div>Loading..!!</div>
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  return (
    <div>
      <h1>NEW VIDEO ADDED</h1>

      {
        data.videos.map((video) => (
          <div key={video.id}>


            <p>ID: {video.id}</p>
            <p>Title: {video.title}</p>
            <p>URL: {video.url}</p>
          </div>
        ))
      }

    </div>
  )

}

export default NewVideoNotification;