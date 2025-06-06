import { styled } from '../stitches.config'

export const PostMain = styled('main', {
  '@bp2': { padding: '$navHeightDesktop 0' },
  padding: '$navHeightMobile 0',
  overflow: 'hidden',
  flex: '1 1',
})

export const Post = styled('main', {
  overflow: 'hidden',
  flex: '1 1',
})

export const PostContainer = styled('div', {
  margin: '0 auto',
  maxWidth: '760px',
  padding: '0 20px',
})

export const PostContent = styled('div', {
  fontSize: '16px',
  lineHeight: '32px',
  color: '$secondary',
  background: '$background',
  position: 'relative',
  zIndex: 1,
  height: '100%',
  padding: '20px 0',
  '& .iframe-wrap': {
    height: '0',
    marginBottom: '20px',
    overflow: 'hidden',
    paddingBottom: '56.25%',
    paddingTop: '30px',
    position: 'relative',
  },
  '& .iframe-wrap iframe': {
    border: '0',
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
  },
  '& .post-image-caption': {
    color: '$secondary',
    textAlign: 'left',
    fontSize: '14px',
    paddingLeft: '1.75em',
    textIndent: '-1.75em',
    lineHeight: '1.4',
  },
  '& .post-image-caption .figure-label': {
    display: 'block',
    fontWeight: 700,
    fontStyle: 'normal',
  },
  '& .post-image-caption .figure-cite': {
    display: 'block',
    fontStyle: 'normal',
  },
  '& .post-image-full': {
    margin: '20px 0 0',
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
    maxHeight: '60vh',
    objectPosition: 'left center',
    objectFit: 'contain',
    '@bp2': {
      marginLeft: 0, //'calc(-1 * (70vw - 760px) / 2)'
    },
    '@bp4': {
      marginLeft: 0,
    },
  },
  '& .side-by-side': {
    display: 'flex',
    width: '90vw',
    margin: '40px 0',
    flexDirection: 'row',
    '@bp2': {
      marginLeft: 'calc(-1 * (90vw - 760px) / 2)',
    },
    '@bp4': {
      marginLeft: 0,
      flexDirection: 'column',
    },
  },
  '& .side-by-side-img': {
    minWidth: '50%',
    '@bp2': {
      minWidth: '100%',
    },
    '@bp4': {
      // marginLeft: 0,
    },
  },
  '& .side-by-side-caption': {
    color: '$secondary',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '14px',
    marginTop: -30,
  },
  '& .works-cited-title': {
    textAlign: 'left',
    fontWeight: 600,
    marginTop: '3em',
    marginBottom: '1em',
  },
  '& .citation': {
    paddingLeft: '1.75em',    
    textIndent: '-1.75em',     
    marginBottom: '1.5em',
    lineHeight: '1.6',
  },
  '& .citation-notes': {
    marginTop: '0.75em',
    marginLeft: '1.75em',      
    paddingLeft: '0',
  },
  '& .citation-notes li': {
    marginBottom: '0.75em',
    paddingLeft: '0.5em',     
    textIndent: '-0.5em',   
  },
  '& .endnotes-title': {
    textAlign: 'left',
    fontWeight: 600,
    marginTop: '3em',
    marginBottom: '1em',
  },
  '& .endnote-list': {
    fontSize: '11px',
    lineHeight: '1.4',
    margin: 0,
    padding: 0,
    listStyleType: 'decimal',
    listStylePosition: 'inside',
  },

  '& .endnote-list li': {
    marginBottom: '0.5em',
    paddingLeft: '1.25em',
    textIndent: '-1.25em',
  },
  '& p':{
    marginBottom: '2em',
  }
})
