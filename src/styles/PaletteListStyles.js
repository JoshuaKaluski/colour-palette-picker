import sizes from './sizes';
import bg from './bg.svg'

export default {
  "@global": {
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out"
    }
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    /*Background by svgbackgrounds.com*/
    backgroundColor: "#9F001B",
    backgroundImage: `url(${bg})`,
    overflow: "auto"
  },
  title: {
    fontSize: "2rem"
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down("xl")]: {
      width: "80%"
    },
    [sizes.down("xs")]: {
      width: "75%"
    },
  },
  nav: {
    backgroundColor: "#9F001B",
    borderRadius: "14px",
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: '#c9ccd0',
    alignItems: 'center',
    "& a": {
      color: '#c9ccd0'
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2.5rem',
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.4rem"
    }
  }
};