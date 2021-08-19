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
      <TwitterShareButton url={encodedURL}>
        <TwitterIcon size={30} />
      </TwitterShareButton>
      <FacebookShareButton url={encodedURL}>
        <FacebookIcon size={30} />
      </FacebookShareButton>
    </>
  )
}

export default FBShareButton
