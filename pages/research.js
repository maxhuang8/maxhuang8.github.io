import { styled } from '../stitches.config'
import Head from 'next/head'
import Base from '../layouts/Base'
import ResearchFeaturedArticle from '../components/ResearchFeaturedArticle'
import ResearchListItem from '../components/ResearchListItem'
import { ListGroup } from '../components/ListGroup'
import { AnimateSharedLayout } from 'framer-motion'
import papers from '../data/papers'

export async function getStaticProps() {
  // Get featured papers
  const featuredPapers = papers
    .filter(paper => paper.featured)
    .slice(0, 2) // just to make sure only 2 featured papers
    .map(paper => ({
      slug: paper.url?.replace(/\//g, '') || '',
      title: paper.title,
      description: paper.description,
      image: paper.image,
      readTime: paper.readTime,
    }))

  // Get all papers for the list
  const allPapers = papers.map(paper => ({
    slug: paper.url?.replace(/\//g, '') || '',
    title: paper.title,
    date: paper.date,
    skip: false,
  }))

  return {
    props: {
      title: 'Research // Max Huang',
      tagline: 'Test. Fail. Solve. Share.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      featuredPapers,
      allPapers,
    },
  }
}

function Research(props) {
  const renderFeatured = () =>
    props.featuredPapers.map((paper, index) => (
      <ResearchFeaturedArticle
        key={index}
        index={index}
        href={paper.slug ? `/${paper.slug}/` : ''}
        title={paper.title}
        description={paper.description}
        image={paper.image}
        readTime={paper.readTime}
      />
    ))

  const renderAll = () =>
    props.allPapers.map((paper, index) => {
      if (!paper.skip) {
        return (
          <ResearchListItem
            key={index}
            index={index}
            href={paper.slug ? `/${paper.slug}/` : ''}
            title={paper.title}
            date={paper.date}
          />
        )
      }
    })

  const { title, image } = props
  const description = `In Paul Farmer's 2003 book <cite>Pathologies of Power</cite>, he asks us, 
  "If access to health care is considered a human right, who is considered human 
  enough to have that right?" This pressing question captures a fundamental truth: 
  everyone deserves access to proper care. My understanding of today's existing 
  global healthcare disparities, framed in the ethos of Farmer's question, fuels my twofold 
  desire to design cost-effective materials for healthcare 
  applications and bring the benefits of cutting-edge research to those who need 
  it most, regardless of their socioeconomic status or birthplace.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://maxhuang8.github.io/research" property="og:url" />
        <meta content={`https://maxhuang8.github.io${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <div style={{ marginBottom: 64 }} />
        <h2>Featured Papers</h2>
        <FeaturedResearch>{renderFeatured()}</FeaturedResearch>

        <h2>All Papers</h2>
        <ListGroup>{renderAll()}</ListGroup>
      </AnimateSharedLayout>
    </>
  )
}

const FeaturedResearch = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
})

Research.Layout = Base

export default Research

//Old version

// import { styled } from '../stitches.config'
// import Head from 'next/head'
// import Base from '../layouts/Base'
// import stripHtml from '../lib/strip-html'
// import { getAllPosts, getPostBySlug } from '../lib/blog'
// import ListItem from '../components/ListItem'
// import FeaturedArticle from '../components/FeaturedArticle'
// import { ListGroup } from '../components/ListGroup'
// import { AnimateSharedLayout } from 'framer-motion'

// export async function getStaticProps() {
//   const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])

//   const featuredParams = [
//     'date',
//     'slug',
//     'title',
//     'image',
//     'content',
//     'description',
//   ]

//   const featuredPosts = [
//     getPostBySlug('the-two-types-of-quality', featuredParams),
//     getPostBySlug('how-is-life-post-yc', featuredParams),
//   ]

//   return {
//     props: {
//       title: 'Research // Max Huang',
//       tagline: 'Test. Fail. Solve. Share.',
//       image: '/static/images/articles-bw.jpg',
//       primaryColor: 'yellow',
//       secondaryColor: 'pink',
//       featuredPosts,
//       allPosts,
//     },
//   }
// }

// function Research(props) {
//   const renderFeatured = () =>
//     props.featuredPosts.map((post, index) => (
//       <FeaturedArticle
//         key={index}
//         index={index}
//         href={`/${post.slug}/`}
//         title={post.title}
//         description={post.description}
//         image={post.image}
//         stats={post.stats}
//         content={post.content}
//       />
//     ))

//   const renderAll = () =>
//     props.allPosts.map((post, index) => {
//       if (!post.skip) {
//         return (
//           <ListItem
//             key={index}
//             index={index}
//             href={`/${post.slug}/`}
//             title={post.title}
//             date={post.date}
//           />
//         )
//       }
//     })

//   const { title, image } = props

//   // Book title now wrapped in <cite> so it shows in italics
//   const description = `In Paul Farmer’s 2003 book <cite>Pathologies of Power</cite>, he asks us, 
//   “If access to health care is considered a human right, who is considered human 
//   enough to have that right?” This pressing question captures a fundamental truth: 
//   everyone deserves access to proper care. My understanding of today's existing 
//   global healthcare disparities, framed in the ethos of Farmer’s question, fuels my twofold 
//   desire to design cost-effective materials for healthcare 
//   applications and bring the benefits of cutting-edge research to those who need 
//   it most, regardless of their socioeconomic status or birthplace.`

//   return (
//     <>
//       <Head>
//         <title>{title}</title>
//         <meta content={title} property="og:title" />
//         <meta content={stripHtml(description)} name="description" />
//         <meta content={stripHtml(description)} property="og:description" />
//         <meta content="https://maxhuang8.github.io/research" property="og:url" />
//         <meta content={`https://maxhuang8.github.io${image}`} property="og:image" />
//       </Head>

//       <AnimateSharedLayout>
//         <p dangerouslySetInnerHTML={{ __html: description }} />

//         <div style={{ marginBottom: 64 }} />
//         <h2>Featured Papers</h2>
//         <FeaturedResearch>{renderFeatured()}</FeaturedResearch>

//         <h2>All Papers</h2>
//         <ListGroup>{renderAll()}</ListGroup>
//       </AnimateSharedLayout>
//     </>
//   )
// }

// const FeaturedResearch = styled('div', {
//   margin: '10px 0 0 -20px',
//   '@bp2': { display: 'flex', justifyContent: 'space-between' },
// })

// Research.Layout = Base

// export default Research
