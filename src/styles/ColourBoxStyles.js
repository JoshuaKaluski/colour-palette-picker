import chroma from "chroma-js";

 export default {
  ColourBox: {
    width: "20%",
    height: props => props.showingFullPalette ? "25%" : "50%",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    margin: "0 auto -3.5px",
    textTransform: "uppercase",
    "&:hover button": {
      opacity: "1",
      transition: "0.5s"
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.6 ? "black" : "white"
  },
  colourName: {
    color: props => chroma(props.background).luminance() <= 0.09 ? "white" : "black"
  },
  viewMore: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0",
    bottom: "0",
    color: props => chroma(props.background).luminance() >= 0.6 ? "rgba(0, 0, 0, 0.6)" : "white",
    width:"60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px"
  },
  copyButton: {
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: props => chroma(props.background).luminance() >= 0.6 ? "rgba(0, 0, 0, 0.6)" : "white",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    opacity: "0"
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    fontSize: "12px"
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    webkitTransition: "transform 0.6s ease-in-out",
    msTransition: "transform 0.6s ease-in-out",
    oTransition: "transform 0.6s ease-in-out",
    transition: "transform 0.6s ease-in-out",
    webkitTransform: "scale(0.1)",
    msTransform: "scale(0.1)",
    oTransform: "scale(0.1)",
    transform: "scale(0.1)",
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMessage: {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "4rem",
    webkitTransform: "scale(0.1)",
    msTransform: "scale(0.1)",
    oTransform: "scale(0.1)",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
      textTransform: "none",
    }
  },
  showCopyMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    webkitTransition: "all 0.4s ease-in-out",
    msTransition: "all 0.4s ease-in-out",
    oTransition: "all 0.4s ease-in-out",
    transition: "all 0.4s ease-in-out",
    webkitTransitionDelay: "0.2s",
    msTransitionDelay: "0.2s",
    oTransitionDelay: "0.2s",
    transitionDelay: "0.2s"
  }
};