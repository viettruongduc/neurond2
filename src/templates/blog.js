import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import SEO from "../components/seo"
import Header from "../components/Navbar/Navbar.js"
import Footer from "../components/Footer/Footer.js"
import BlueBackground from "../components/BlueBackground/BlueBackground.js"
import BlogContent from "../components/Blog/BlogContent"

const BlogTemplate = ({ data }) => {
  const currentLanguage =
    typeof window !== "undefined"
      ? localStorage["gatsby-i18next-language"]
      : "en"

  const { t } = useTranslation()
  // const [blog, setBlog] = useState({})

  // const theBlog = data.blog.blogTranslations.find(
  //   x => x.languageId === currentLanguage
  // )

  const defaultBlog = data.blog.blogTranslations[0]

  let blogOtherLanguage = data.blog.blogTranslations.find(x => x.languageId === currentLanguage) 

  const queryBlog = blogOtherLanguage || defaultBlog

  const blog = {
    thumbnail: data.blog.thumbnail,
    slug: data.blog.slug,
    title: queryBlog.title,
    description: queryBlog.description,
    metaKeywords: queryBlog.metaKeywords,
    content: queryBlog.content,
    shortContent: queryBlog.shortContent
  }

  // useEffect(() => {
  //   const queryBlog = data.blog
  //   const DEFAULT_LANGUAGE = "en"

  //   let data_language = queryBlog.blogTranslations.find(
  //     x => x.languageId === currentLanguage
  //   )

  //   if (data_language == null)
  //     data_language = queryBlog.blogTranslations.find(
  //       x => x.languageId === DEFAULT_LANGUAGE
  //     )
  //   data_language &&
  //     setBlog({
  //       id: queryBlog.id,
  //       createdByName: queryBlog.createdByName,
  //       createdOn: queryBlog.createdOn,
  //       slug: queryBlog.slug,
  //       thumbnail: queryBlog.thumbnail,
  //       ...data_language,
  //     })
  // }, [currentLanguage, data.blog])

  return (
    <>
      <SEO
        title={t(`${blog.title}`)}
        description={blog.shortContent}
        metaKeywords={blog.metaKeywords}
        thumbnail={blog.thumbnail}
        pathname={`blogs/${blog.slug}`}
      />
      <Header />
      <div className="margin-top-2">
        <BlueBackground
          blogInfo="display"
          jobName={blog.title}
          classCustom="margin-bot-custom"
        />
      </div>
      <div class="s9-widget-wrapper"></div>
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
  }
`
