import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
function SEO({
  description,
  lang,
  meta,
  thumbnail,
  metaKeywords,
  title,
  pathname,
  type
}) {
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
        const metaDescription = description || data.site.siteMetadata.description
        const metaThumbnail = thumbnail || data.site.siteMetadata.thumbnail

        const keywords = metaKeywords || data.site.siteMetadata.keyWords
        const url = data.site.siteMetadata.siteUrl
        const defaultTitle = data.site.siteMetadata.title

        const titleUpperCase = title.replace(/\w\S*/g, w =>
          w.replace(/^\w/, c => c.toUpperCase())
        )

        const canonical = pathname ? `${url}/${pathname}` : url


        return (
          <>
            <Helmet
              defer={false}
              htmlAttributes={{
                lang,
              }}
              title={titleUpperCase}
              titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
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
                  content: titleUpperCase || defaultTitle,
                },
                {
                  property: `og:description`,
                  content: metaDescription,
                },
                {
                  property: `og:type`,
                  content: type || `website`,
                },
                {
                  property: `og:url`,
                  content: pathname ? `${url}/${pathname}` : url,
                },
                {
                  name: `og:locale`,
                  content: lang
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
                  content: titleUpperCase || defaultTitle,
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
