import { styled } from '../stitches.config'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import ListItem from '../components/ListItem'
import FeaturedArticle from '../components/FeaturedArticle'
import { ListGroup } from '../components/ListGroup'
import { AnimateSharedLayout } from 'framer-motion'

export async function getStaticProps() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title', 'abbrTitle'])

  const featuredParams = [
    'date',
    'slug',
    'title',
    'abbrTitle',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getPostBySlug('a-blank-reflection', featuredParams),
    getPostBySlug('questioning-the-press', featuredParams),
  ]

  return {
    props: {
      title: 'Writing // Max Huang',
      tagline: 'Paper. Pen. Purpose.',
      image: '/static/images/writing-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      featuredPosts,
      allPosts,
    },
  }
}

function Writing(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          abbrTitle={post.abbrTitle}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        )
      }
    })
  }

  const { title, image } = props
  const description = `I have always <strong>loved writing</strong> and see it as complementary to my endeavors in STEM disciplines. I enjoy it as a <strong>means for expression</strong> and believe it can serve as a <strong>catalyst for change</strong>. Here you can read through <strong>${props.allPosts.length}</strong> of my pieces. You'll find a mix of essays, articles, and poetry.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://maxhuang8.github.io/writing" property="og:url" />
        <meta content={`https://maxhuang8.github.io${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Writing</h2>
        <FeaturedWriting>{renderFeatured()}</FeaturedWriting>

        <h2>All Writing</h2>
        <ListGroup>{renderAll()}</ListGroup>
      </AnimateSharedLayout>
    </>
  )
}

const FeaturedWriting = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
})

Writing.Layout = Base

export default Writing