import { styled } from '../stitches.config'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BlogDate from './BlogDate'

export default function ResearchListItem(props) {
  const { href = '', index, title, date } = props
  const isExternal = href && !href.startsWith('/')

  const inner = (
    <Animation index={index}>
      <Title>{title}</Title>

      {date === 'TBD' ? (
        <TBDText>TBD</TBDText>
      ) : isExternal ? (
        <IconContainer>
          <i className="ri-arrow-right-up-line"></i>
        </IconContainer>
      ) : (
        <Date>
          <BlogDate dateString={date} />
        </Date>
      )}
    </Animation>
  )

  if (isExternal) {
    return (
      <Item>
        <Anchor href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </Anchor>
      </Item>
    )
  }

  if (href) {
    return (
      <ArticleItem>
        <Link href={href} passHref legacyBehavior>
          <Anchor>{inner}</Anchor>
        </Link>
      </ArticleItem>
    )
  }

  return <Item>{inner}</Item>
}

function Animation(props) {
  const [hovered, setHovered] = useState('')
  const isHovered = hovered === props.index

  return (
    <AnimContainer
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
    >
      {isHovered && (
        <AnimHovered
          layoutId="listItem"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {props.children}
    </AnimContainer>
  )
}

const Item = styled('li', {
  borderBottom: '1px solid $hover',
  '&:last-child': { border: 0 },
})

const Anchor = styled('a', {
  textDecoration: 'none',
  cursor: 'pointer',
})

const Title = styled('span', {
  display: 'block',
  maxWidth: '500px',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '40px',
  textAlign: 'left',
})

const Date = styled('span', {
  color: '$secondary',
  display: 'block',
  fontWeight: 500,
  fontSize: '14px',
  minWidth: '100px',
  textAlign: 'left',
  '@bp2': { textAlign: 'right' },
})

const TBDText = styled(Date, {}) // same styling

const IconContainer = styled('span', {
  fontSize: '24px',
})

const AnimContainer = styled(motion.span, {
  border: '0',
  color: '$secondary',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px 0',
  width: '100%',
  opacity: 1,
  transition: 'all $duration ease-in-out',
  textDecoration: 'none',
  position: 'relative',
  '&:hover': { color: '$primary' },
})

const AnimHovered = styled(motion.span, {
  position: 'absolute',
  top: '-1px',
  left: '-20px',
  right: '-20px',
  bottom: '-1px',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: -1,
})

const ArticleItem = styled(Item, {
  [`& ${AnimContainer}`]: {
    flexDirection: 'column',
    '@bp2': { flexDirection: 'row' },
  },
})