import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import SchemaOrg from "./schema-org"
function SEO({
  description,
  lang,
  meta,
  thumbnail,
  metaKeywords,
  title,
  pathname,
  isBlogPost,
}) {
  const type = "WebSite"
  const detailsQuery = graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          thumbnail
          siteUrl
          keyWords
        }
      }
    }
  `

  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaThumbnail = thumbnail || data.site.siteMetadata.thumbnail
        // const metaThumbnail =
        //   "https://neurondstorage.blob.core.windows.net/neurondasset/blogs%2F1_5Wc2Jwwrgygj_8ygGlgV0w.png"

        const keywords = metaKeywords
          ? metaKeywords
          : data.site.siteMetadata.keyWords
        const url = data.site.siteMetadata.siteUrl
        const defaultTitle = data.site.siteMetadata.title

        // const titleUpperCase = title.replace(/\w\S*/g, w =>
        //   w.replace(/^\w/, c => c.toUpperCase())
        // )

        console.log("Hello metaThumbnail:", metaThumbnail)
        console.log("Hello title:", title, typeof title)
        console.log(`${url}/${pathname}`)

        const canonical = pathname ? `${url}/${pathname}` : url

        // const jsonLd = {
        //   "@context": `https://schema.org/`,
        //   "@type": type,
        //   url: canonical,
        //   image: metaThumbnail
        //     ? {
        //         "@type": `ImageObject`,
        //         url: metaThumbnail,
        //         // width: config.shareImageWidth,
        //         // height: config.shareImageHeight,
        //       }
        //     : undefined,
        //   publisher: {
        //     "@type": `Organization`,
        //     name: title,
        //     logo: {
        //       "@type": `ImageObject`,
        //       url: metaThumbnail,
        //       width: 60,
        //       height: 60,
        //     },
        //   },
        //   mainEntityOfPage: {
        //     "@type": `WebPage`,
        //     "@id": url,
        //   },
        //   description,
        // }

        return (
          <>
            <Helmet
              defer={false}
              htmlAttributes={{
                lang,
              }}
              title={defaultTitle}
              titleTemplate={data.site.siteMetadata.title}
              link={
                canonical
                  ? [
                      {
                        rel: "canonical",
                        href: canonical,
                      },
                    ]
                  : []
              }
              meta={[
                {
                  name: `description`,
                  content: metaDescription,
                },
                {
                  property: `og:image`,
                  content: metaThumbnail,
                },
                {
                  property: `og:image:secure_url`,
                  content: metaThumbnail,
                },
                {
                  property: `og:image:alt`,
                  content: defaultTitle,
                },
                {
                  property: `og:title`,
                  content: title,
                },
                {
                  property: `og:description`,
                  content: metaDescription,
                },
                {
                  property: `og:type`,
                  content: `website`,
                },
                {
                  property: `og:url`,
                  content: pathname ? `${url}/${pathname}` : url,
                },
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
                {
                  name: `twitter:creator`,
                  content: data.site.siteMetadata?.author || ``,
                },
                {
                  name: `twitter:title`,
                  content: defaultTitle,
                },
                {
                  name: `twitter:description`,
                  content: metaDescription,
                },
                {
                  property: `twitter:image`,
                  content: metaThumbnail,
                },
                {
                  name: `robots`,
                  content: `index,follow`,
                },
                {
                  name: `keywords`,
                  content: keywords,
                },
              ].concat(meta)}
            />
            {/* <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={titleUpperCase || defaultTitle}
            // thumbnail={metaThumbnail}
            description={metaDescription}
            // canonical={canonical}
            defaultTitle={defaultTitle}
          /> */}
            {/* <Helmet>
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:image" content={metaThumbnail} />
              <meta property="og:image" content={metaThumbnail} />
              <meta property="og:image:width" content="100" />
              <meta property="og:image:height" content="100" />
            </Helmet> */}
          </>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  pathname: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  metaKeywords: PropTypes.string,
  pathname: PropTypes.string,
}

export default SEO
