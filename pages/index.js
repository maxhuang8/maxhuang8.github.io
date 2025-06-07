import { styled } from '../stitches.config'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShortcutHome from '../components/ShortcutHome'
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'
import { getPersonJsonLd } from '../lib/json-ld'
import Typewriter from '../components/Typewriter'
import PolymerizationCursor from '../components/PolymerizationCursor'
import PolymerizationHint from '../components/PolymerizationHint'


export async function getStaticProps() {
  return {
    props: {
      title: 'Max Huang',
      description: 'Obsessed with solving puzzles',
      image: '/static/images/home-bw.jpg',
    },
  }
}

export default function Index(props) {
  const { title, description, image } = props

  return (
    <Wrapper>
      <PolymerizationCursor />
      <PolymerizationHint />
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://maxhuang8.github.io" property="og:url" />
        <meta content={`https://maxhuang8.github.io${image}`} property="og:image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd())
          }}
          key="person-jsonld"
        />
      </Head>

      <Navbar />
      <Home>
        <PostContent>
          <PostContainer>
            <div>
              <h1>{title}</h1>
              <p>
                <strong>Student Researcher in the {' '}
                  <a href="https://tianlab.uchicago.edu/" target="blank">Tian Lab</a>
                </strong><br />
                Obsessed&nbsp;with&nbsp;
                <Typewriter
                  words={[
                    'solving problems.', 
                    'building stuff.', 
                    'leveraging AI.', 
                    'healthcare equity.', 
                    'sleep.'
                  ]}
                  pauseBeforeDelete={2000}
                />
              </p>
              <ShortcutHome />
            </div>
          </PostContainer>
        </PostContent>
      </Home>
      <Footer />
    </Wrapper>
  )
}

const Home = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
})
