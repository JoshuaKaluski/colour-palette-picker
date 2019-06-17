import sizes from './sizes';

export default {
  Palette: {
    height: "97vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  colours: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    margin: "0 auto -3.5px",
    textTransform: "uppercase",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
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
      color: "white",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
  }
};