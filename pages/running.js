import Head from 'next/head'
import Link from 'next/link'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import ListItem from '../components/ListItem'
import { ListGroup } from '../components/ListGroup'
import { AnimateSharedLayout } from 'framer-motion'
import { media } from '../data/running'
import { styled } from '../stitches.config'

const TightWrapper = styled('div', {
  marginBottom: '-64px',
  '& > *:last-child': { marginBottom: 0 },
  '& .post-content': { paddingBottom: '0 !important' },
})

export async function getStaticProps() {
  const meta = {
    title: 'Running // Max Huang',
    description:
      "I am a <strong>distance runner</strong> at heart. Although I was a soccer player for much of my life, I have been racing local 5ks since I was 8 years old, and in high school, I <strong>fell in love</strong> with running. I now compete at the <strong>NCAA level</strong>, racing for the Maroons. Though I thrive on the competition, it is the <strong>simple joy</strong> of running that makes me love the sport.",
    tagline: 'Comraderie and Competition',
    image: '/static/images/running-bw.jpg',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  }

  return { props: meta }
}

function Running(props) {
  const renderFeatured = (items) => {
    const featured = [
      'Captain Feature in Newspaper',
      'TFRRS Profile',
      'World Athletics Profile',
    ]

    return items
      .filter((item) => featured.includes(item.title))
      .map((item, index) => (
        <ListItem
          key={index}
          index={index}
          href={item.url}
          title={item.title}
          date={item.date}
        />
      ))
  }

  const { title, description, image } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://maxhuang8.github.io/running" property="og:url" />
        <meta
          content={`https://maxhuang8.github.io${image}`}
          property="og:image"
        />
      </Head>

      <TightWrapper>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <AnimateSharedLayout>
          <h2>Featured Media</h2>
          <ListGroup>{renderFeatured(media)}</ListGroup>
        </AnimateSharedLayout>

        <h2>Training Philosophy</h2>
        <p>
          I have spent <strong>countless hours</strong> reading papers, books,
          and other literature on a wide array of training methodologies old and
          new. I am a zealot of <strong>threshold</strong> training and will
          preach it to anyone who will listen to me. I believe it is the single
          most <strong>effective and reliable</strong> form of training in the
          long term, and I'm happy to debate this with anyone. Through my own
          experiences with injury, I have also realized the importance of
          <strong> listening to your body</strong> and <strong> resting</strong>{' '}
          as a means of training. Consistency is more important than anything
          else.
        </p>

        <h2>Giving it my all</h2>
        <p>Here are my PRs:</p>
        <ul>
          <li>
            <strong>800m</strong> – 1:57.90
          </li>
          <li>
            <strong>1000m</strong> – 2:34.80i
          </li>
          <li>
            <strong>1500m</strong> – 4:03.44
          </li>
          <li>
            <strong>1600m</strong> – 4:20.36
          </li>
          <li>
            <strong>3000m</strong> – 8:50
          </li>
          <li>
            <strong>3200m</strong> – 9:28
          </li>
          <li>
            <strong>5k XC</strong> – 15:33
          </li>
          <li>
            <strong>8k XC</strong> – 26:13
          </li>
        </ul>

        <h2>Let's chat</h2>
        <p>
          <Link href="/contact">
            Hit&nbsp;me&nbsp;up
          </Link>{' '}
          if you want to talk about running or go for a run together!
        </p>

      </TightWrapper>
    </>
  )
}

Running.Layout = Base
export default Running