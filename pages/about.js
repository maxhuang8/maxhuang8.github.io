import React from 'react'
import Head from 'next/head'
import { parseISO, format, intervalToDuration } from 'date-fns'
import { styled } from '../stitches.config'

import Base from '../layouts/Base'
import { ButtonPrimary } from '../components/ButtonPrimary'
import Pronunciation from '../components/Pronunciation'
import Toast from '../components/Toast'
import stripHtml from '../lib/strip-html'
import items from '../data/about'
import schools from '../data/education'
import Lottie from 'lottie-react'
import copyBioIcon from '../public/static/icons/copy-bio.json'
import downloadIcon from '../public/static/icons/download.json'
import HeadshotAberration from '../components/HeadshotAberration'

export async function getStaticProps() {
  return {
    props: {
      title: 'About // Max Huang',
      description:
        "Max Huang is a Taiwanese-Slovakian researcher and distance runner. Though he is from New Jersey, he currently attends the University of Chicago, where he's studying molecular engineering on the chemical engineering track. His lifelong appreciation for building, puzzle solving, and helping others led him to pursue a career in building innovative, cost-effective healthcare devices for all.",
      tagline: 'Solve. Build. Share.',
      image: '/static/images/about_headshot.png',
      primaryColor: 'pink',
      secondaryColor: 'purple',
    },
  }
}

function About({ title, description, image }) {
  const [toastTitle, setToastTitle] = React.useState('')
  const [toastDescription, setToastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)
  const copyBioRef = React.useRef()
  const downloadRef = React.useRef()

  const renderIntro = () => (
    <Container>
      <Section>
        <HeadshotAberration src="/static/images/about_headshot.JPG" size={300} />
      </Section>

      <Section>
        <Paragraph css={{ marginTop: '16px', '@bp2': { marginTop: '-6px' } }}>
          <strong>Hi, I'm Max Huang.</strong>{' '}
          Currently, I'm studying molecular engineering <strong>@UChicago</strong>, where I'm also a year-round varsity athlete on the cross country and track teams.
        </Paragraph>

        <Paragraph css={{ marginTop: '24px' }}>
          I'm an <strong>undergraduate researcher</strong> in the Tian Lab,
          working on materials synthesis for solid polymer electrolytes. Before
          that, I did molecular biology research in high school at{' '}
          <strong>Phillips Academy Andover</strong>.
        </Paragraph>

        <Paragraph css={{ marginTop: '24px' }}>
          I'm <strong>fascinated by</strong> bioelectronics, healthcare equity,
          and philosophy. When I'm not working, I like running, watching TV
          shows, and <strong>sleeping</strong>.
        </Paragraph>
      </Section>
    </Container>
  )

  const renderBio = () => {
    const btn = { display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }
    const icon = { width: 24, height: 24, marginRight: 8 }

    return (
      <div>
        <p>
          This is made for journalists and organizers to copy-and-paste.
        </p>

        <blockquote>
          <p>{description}</p>
        </blockquote>

        <ButtonsContainer>
          <ButtonPrimary
            as="button"
            style={btn}
            onClick={(e) => {
              e.preventDefault()
              navigator.clipboard.writeText(description)
              setToastTitle('Copied :D')
              setToastDescription('You can now paste it anywhere.')
              setShowToast(true)
            }}
            onMouseEnter={() => copyBioRef.current?.play()}
            onMouseLeave={() => copyBioRef.current?.stop()}
          >
            <Lottie lottieRef={copyBioRef} style={icon} animationData={copyBioIcon} loop={false} autoplay={false} />
            Copy Bio
          </ButtonPrimary>

          <span style={{ margin: '0 20px 0 10px' }}>•</span>

          <ButtonPrimary
            as="a"
            download
            role="button"
            href="/static/images/about_headshot.JPG"
            style={btn}
            onClick={() => {
              setToastTitle('Downloading...')
              setToastDescription('You can now add this photo to your fancy site.')
              setShowToast(true)
            }}
            onMouseEnter={() => downloadRef.current?.play()}
            onMouseLeave={() => downloadRef.current?.stop()}
          >
            <Lottie lottieRef={downloadRef} style={icon} animationData={downloadIcon} loop={false} autoplay={false} />
            Download Headshot
          </ButtonPrimary>
        </ButtonsContainer>
      </div>
    )
  }

  const renderAll = (list) =>
    list.map((item, i) => (
      <div key={i} style={{ marginBottom: 40 }}>
        <h3>{item.jobTitle}</h3>
        <p style={{ margin: 0 }}>
          <a href={item.companyUrl} target="_blank" rel="noreferrer">
            {item.company}
          </a>
          <span> • {item.location}</span>
        </p>
        <p style={{ margin: 0 }}>
          <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
          <span> – </span>
          <span>
            {item.endDate
              ? format(parseISO(item.endDate), 'LLL yyyy')
              : 'Present'}
          </span>
          <span> • </span>
          <span>{getDuration(item.startDate, item.endDate)}</span>
        </p>
      </div>
    ))

  const getDuration = (start, end) => {
    const d = intervalToDuration({
      start: parseISO(start),
      end: end ? parseISO(end) : new Date(),
    })
    const y = d.years ? `${d.years} yr${d.years > 1 ? 's' : ''} ` : ''
    return `${y}${d.months} mos`
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={stripHtml(description)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={stripHtml(description)} />
        <meta property="og:url" content="https://maxhuang8.github.io/about" />
        <meta property="og:image" content={`https://maxhuang8.github.io${image}`} />
      </Head>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      <h2>My Experience</h2>
      {renderAll(items)}

      <div style={{ marginBottom: 64 }} />

      <h2>Education</h2>
      {renderAll(schools)}

      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

/* ——— styled components ——— */

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const ButtonsContainer = styled('p', {
  display: 'flex',
  alignItems: 'center',
})

/* image column 300 px, text column fills remaining width */
const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',

  '@bp2': {
    '&:first-of-type': {
      flex: '0 0 300px',
      maxWidth: '300px',
      marginRight: '40px',
    },
    '&:last-of-type': {
      flex: '1 1 0',
      maxWidth: '100%',
    },
  },
})

About.Layout = Base
export default About
