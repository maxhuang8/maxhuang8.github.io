import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import Base from '../layouts/Base'
//not in use
// import FeaturedProject from '../components/FeaturedProject'
// import { FeaturedProjects } from '../components/FeaturedProjects'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Max Huang',
    tagline: 'Passion. Purpose. Impact.',
    image: '/static/images/projects-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Projects(props) {
  
  // uncomment if I want to render featured projects in the future
  // const renderFeatured = () => {
  //   const featured = ['Dracula', 'Clipboard.js', 'Resend', 'React Email']

  //   return items
  //     .map(item => {
  //       return item.projects.filter(project => featured.includes(project.title))
  //     })
  //     .filter(item => {
  //       if (item.length > 0) {
  //         return item
  //       }
  //     })
  //     .flat()
  //     .map((item, index) => {
  //       return <FeaturedProject key={index} project={item} />
  //     })
  // }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          <ul>
            {item.projects.map((project, pIndex) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
      )
    })
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  const { title, image } = props
  const description = `I enjoy building side projects and leaving a <strong>positive impact</strong> on others. Here you can check out <strong>${getTotalProjects()} different</strong> projects I've undertaken. Have fun exploring!`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://maxhuang8.github.io/projects" property="og:url" />
        <meta content={`https://maxhuang8.github.io${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        {/* uncomment if I want to render featured projects in the future}
        {/* <h2>Featured Projects</h2>
        <FeaturedProjects>{renderFeatured()}</FeaturedProjects> */}

        <h2>Projects (Year Started) </h2>
        {renderAll()}
      </AnimateSharedLayout>
    </>
  )
}

function ProjectItem(props) {
  const { project } = props

  return (
    <li>
      <a href={project.url} target="_blank">
        {project.title}
      </a>
    </li>
  )
}

Projects.Layout = Base

export default Projects
