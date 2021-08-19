import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import SEO from "../components/seo"
import Header from "../components/Navbar/Navbar.js"
import Footer from "../components/Footer/Footer.js"
import BlueBackground from "../components/BlueBackground/BlueBackground.js"
import BlogContent from "../components/Blog/BlogContent"
import Sharing from "../components/Sharing/Sharing.js"

const BlogTemplate = ({ data }) => {
  const currentLanguage =
    typeof window !== "undefined"
      ? localStorage["gatsby-i18next-language"]
      : "en"

  const { t } = useTranslation()
  const queryBlog = data.blog

  let data_language = queryBlog.blogTranslations.find(
    x => x.languageId === currentLanguage
  )

  const dataBlog = data_language || queryBlog.blogTranslations[0]

  const blog = {
    thumbnail: queryBlog.thumbnail,
    slug: queryBlog.slug,
    title: dataBlog.title,
    description: dataBlog.description,
    metaKeywords: dataBlog.metaKeywords,
    content: dataBlog.content,
    shortContent: dataBlog.shortContent
  }

  const shareUrl = `${data.site.siteMetadata.siteUrl}/blogs/${blog.slug}`

  return (
    <>
      <SEO
        key={blog.id}
        title={t(`${blog.title}`)}
        description={blog.metaDescription}
        metaKeywords={blog.metaKeywords}
        thumbnail={blog.thumbnail}
        slug={`blogs/${blog.slug}`}
      />
      <Header />
      <div className="margin-top-2">
        <BlueBackground
          blogInfo="display"
          jobName={blog.title}
          author={blog.title}
          classCustom="margin-bot-custom"
        />
      </div>
      <div className="s9-widget-wrapper sharing-custom wrapper"></div>
      <Sharing url={shareUrl}/>
      <BlogContent content={blog.content} />
      <Footer />
    </>
  )
}

export default BlogTemplate

export const query = graphql`
  query($slug: String) {
    blog(slug: { eq: $slug }) {
      id
      slug
      categorySlugs
      thumbnail
      createdByName
      createdOn
      blogTranslations {
        languageId
        title
        content
        shortContent
        metaDescription
        metaTitle
        metaKeywords
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`