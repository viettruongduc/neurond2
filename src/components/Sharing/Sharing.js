import React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share"

const FBShareButton = props => {
  const {url} = props;
  let encodedURL = encodeURI(url)
  return (
    <>
      <FacebookShareButton url={encodedURL} className="sharing-button">
        <FacebookIcon size={30} />
      </FacebookShareButton>
      <TwitterShareButton url={encodedURL}>
        <TwitterIcon size={30} />
      </TwitterShareButton>
    </>
  )
}

export default FBShareButton
