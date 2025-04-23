import Link from 'next/link'
import { styled } from '../stitches.config'
import TikTokSvg from '../public/static/icons/tiktok-line.svg'

export default function Footer() {
  const links = [
    { 
      title: 'Email', 
      url: '/contact', 
      icon: 'ri-mail-line' 
    },
    { 
      title: 'linkedin', 
      url: 'https://www.linkedin.com/in/max-p-huang', 
      icon: 'ri-linkedin-line' 
    },
    { 
      title: 'Instagram', 
      url: 'https://instagram.com/maxhuang24', 
      icon: 'ri-instagram-line' 
    },
    { title: 'TikTok', 
      url: 'http://tiktok.com/@maxmakesmathfun', 
      icon: TikTokSvg 
    },
  ]

  const renderAnchor = (link, index) => {
    const isSvg = typeof link.icon !== 'string'
    const IconElement = isSvg ? SvgIcon : Icon

    const inner = (
      <>
        <Title>{link.title}</Title>
        {isSvg ? (
          // 👉 wrap the SVG as a **child** so we can target it easily
          <IconElement>
            <link.icon aria-hidden="true" />
          </IconElement>
        ) : (
          <IconElement className={link.icon} aria-hidden="true" />
        )}
      </>
    )

    if (link.url.startsWith('http')) {
      return (
        <Anchor key={index} href={link.url} target="_blank" rel="noopener noreferrer">
          {inner}
        </Anchor>
      )
    }

    return (
      <Link key={index} href={link.url} passHref legacyBehavior>
        <Anchor>{inner}</Anchor>
      </Link>
    )
  }

  return <Container>{links.map(renderAnchor)}</Container>
}

// ————————————————————————————————————————————
// Styled components
// ————————————————————————————————————————————
const Container = styled('footer', {
  background: '$background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
  '& a': { borderBottom: 'none !important' },
})

// Remix‑Icon <i> tag styling
const Icon = styled('i', {
  color: '$primary',
  marginLeft: '5px',
  // keep icons vertically centered inside flex row
  fontSize: '18px',
  transition: 'opacity $duration ease-in-out',
  '@bp2': { fontSize: '14px', opacity: 0 },
})

// SVG wrapper – we now nest the SVG so we can size it directly
const SvgIcon = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '5px',
  '& svg': {
    width: '18px !important',
    height: '18px !important',
    fill: 'currentColor',
    transition: 'opacity $duration ease-in-out',
    '@bp2': { width: '14px !important', height: '14px !important', opacity: 0 },
  },
})

const Anchor = styled('a', {
  color: '$secondary',
  display: 'flex',
  alignItems: 'center', // center text + icon vertically
  fontSize: '15px',
  border: 0,
  marginLeft: '20px',
  textDecoration: 'none',
  textTransform: 'lowercase',
  transition: 'color $duration ease-in-out',
  '&:hover, &:focus': { color: '$primary', opacity: 1 },
  [`&:hover ${Icon}`]: { opacity: 1 },
  [`&:hover ${SvgIcon} svg`]: { opacity: 1 },
  '&:first-child': { margin: 0 },
})

const Title = styled('span', {
  display: 'none',
  '@bp2': { display: 'block' },
})
