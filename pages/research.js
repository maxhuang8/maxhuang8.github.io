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
    .map(p => ({ ...p }));

  // Get all papers for the list
  const allPapers = papers.map(p => ({ ...p }));

  return {
    props: {
      title: 'Research // Max Huang',
      tagline: 'Test. Fail. Solve. Share.',
      image: '/static/images/research-bw.jpg',
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
        href={paper.url}
        title={paper.title}
        description={paper.description}
        image={paper.image}
        readTime={paper.readTime}
      />
    ));

  const renderAll = () =>
    props.allPapers.map((paper, index) => {
      if (!paper.skip) {
        return (
          <ResearchListItem
            key={index}
            index={index}
            href={paper.url}
            title={paper.title}
            date={paper.date}
          />
        )
      }
    });

  const { title, image } = props;
  const description = `In Paul Farmer's 2003 book <cite>Pathologies of Power</cite>, he asks us, 
  "If access to health care is considered a human right, who is considered human 
  enough to have that right?" This pressing question captures a fundamental truth: 
  everyone deserves access to proper care. My understanding of today's existing 
  global healthcare disparities, framed in the ethos of Farmer's question, fuels my twofold 
  desire to design cost-effective materials for healthcare 
  applications and bring the benefits of cutting-edge research to those who need 
  it most, regardless of their socioeconomic status or birthplace.`;

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

        {/* Use the styled heading instead of a plain divider and default h2 */}
        <SectionHeading>Featured Papers</SectionHeading>
        <FeaturedResearch>{renderFeatured()}</FeaturedResearch>

        <SectionHeading>All Papers</SectionHeading>
        <ListGroup>{renderAll()}</ListGroup>
      </AnimateSharedLayout>
    </>
  )
}

const SectionHeading = styled('h2', {
  marginTop: '16px',    // Adjust this to control the space above the heading
  marginBottom: '32px', // Adjust this for the space below the heading
});

const FeaturedResearch = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
});

Research.Layout = Base

export default Research