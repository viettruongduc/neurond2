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

      console.log('currentLanguage', currentLanguage)

  const { t } = useTranslation()
  const defaultBlog = data.blog.blogTranslations[0]

  const [blog, setBlog] = useState({
    thumbnail: data.blog.thumbnail,
    slug: data.blog.slug,
    title: defaultBlog.title,
    description: defaultBlog.description,
    metaKeywords: defaultBlog.metaKeywords,
    content: defaultBlog.content,
    shortContent: defaultBlog.shortContent
  })

  console.log(124646464612, blog.title)

  // useEffect(() => {
    const queryBlog = data.blog
    const DEFAULT_LANGUAGE = "en"

    let data_language = queryBlog.blogTranslations.find(
      x => x.languageId === currentLanguage
    )

    if (data_language == null)
      data_language = queryBlog.blogTranslations.find(
        x => x.languageId === DEFAULT_LANGUAGE
      )
    data_language &&
      setBlog({
        id: queryBlog.id,
        createdByName: queryBlog.createdByName,
        createdOn: queryBlog.createdOn,
        slug: queryBlog.slug,
        thumbnail: queryBlog.thumbnail,
        title: data_language.title,
        description: data_language.metaDescription,
        ...data_language,
      })
  // }, [currentLanguage, data.blog])
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