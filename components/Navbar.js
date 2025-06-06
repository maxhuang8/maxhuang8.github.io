import { styled } from '../stitches.config'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { useKBar } from 'kbar'
import MessagePopup from '../components/Credit'

export default function Navbar() {
  const router = useRouter()
  const pages = [
    'About',
    'Research',
    'Projects',
    'Writing',
    'Running',
  ]
  const [hovered, setHovered] = useState('')
  const [showPopup, setShowPopup] = useState(false) 
  const { query } = useKBar()

  return (
    <>
    <AnimateSharedLayout>
      <Header>
        <Link href="/" passHref>
          <ButtonLogo as="a">mph</ButtonLogo>
        </Link>

        <Nav>
          <List>
            {pages.map(page => {
              const path = `/${page.toLowerCase()}`
              const isHovered = hovered === page

              return (
                <li key={page}>
                  <Link href={path} passHref>
                    <Anchor>
                      <NavContainer
                        onHoverStart={() => setHovered(page)}
                        onHoverEnd={() => setHovered('')}
                        css={
                          router.pathname === path && router.pathname !== '/'
                            ? {
                                color: '$primary',
                                // '&::after': { opacity: 1 },
                              }
                            : {}
                        }
                      >
                        {isHovered && (
                          <NavHovered
                            layoutId="nav"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                        {page}
                      </NavContainer>
                    </Anchor>
                  </Link>
                </li>
              )
            })}
          </List>
        </Nav>

        <Aside>
          <ButtonHeader
            as="button"
            type="button"
            aria-label="Toggle popup"
            onClick={() => setShowPopup(true)}
            css={{ padding: '0 8px' }}
          >
            credit
          </ButtonHeader>
        </Aside>
      </Header>
    </AnimateSharedLayout>

    <MessagePopup
      isOpen={showPopup}
      onClose={() => setShowPopup(false)}
      title="Credit"
      message="This site began as a fork of Zeno Rocha’s open-source personal site (MIT-licensed).
      I’ve since refactored the layout and styling, changed up the pages, and layered in several new features to fit my own work.
      Grateful to Zeno for making such a solid foundation publicly available."
      showCloseButton={true}
    />
    </>
  )
}

const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  fontSize: '12px',
  minHeight: '59px',
  width: '100%',
  flexWrap: 'wrap',
  position: 'absolute',
  top: '0',
  zIndex: 3,
  marginTop: '13px',
  '@bp2': { marginTop: '0' },
  '& a': {
    borderBottom: 'none !important',
  },
})

const List = styled('ul', {
  margin: '0',
  padding: '0',
  listStyle: 'none',
  display: 'inline-flex',
  gap: '62px',
  position: 'relative',
  top: '5px',
  '@bp1': { justifyContent: 'space-around' },
})

const ButtonHeader = styled('div', {
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  borderRadius: '$borderRadius',
  color: 'white',
  cursor: 'pointer',
  cursor: 'pointer',
  height: '34px',
  padding: '0 10px',
  transition: 'background $duration ease-in-out',
  '&:hover': { background: '$hover' },
})

const Icon = styled('i', {
  fontSize: '24px',
  lineHeight: '32px',
})

const ButtonLogo = styled(ButtonHeader, {
  fontWeight: 700,
  fontSize: '24px',
  textDecoration: 'none',
  marginLeft: '12px',
  fontFamily: '$heading',
})

const Nav = styled('nav', {
  textAlign: 'center',
  flex: 1,
  order: 2,
  flexBasis: '100%',
  '@bp2': { order: 0, flexBasis: 'initial' },
  '@bp3': { overflowX: 'scroll', overflowY: 'hidden' },
})

const Aside = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '12px',
  marginLeft: 'auto',
})

const Anchor = styled('a', {
  border: 0,
  borderBottom: 'none !important',
  position: 'relative',
  textDecoration: 'none',
  '&:hover, &:focus': { opacity: 1 },
})

const NavContainer = styled(motion.span, {
  color: '$secondary',
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '2px',
  padding: '20px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color $duration ease-in-out',
  '&:hover': {
    color: '$primary',
  }
})

const NavHovered = styled(motion.span, {
  position: 'absolute',
  top: '-15px',
  left: '0',
  right: '0',
  background: '$hover',
  padding: 20,
  borderRadius: '$borderRadius',
  zIndex: -1,
})
