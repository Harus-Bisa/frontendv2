import { withStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export const StyledRating = withStyles({
    iconFilled: {
      color: "#39A3FF",
    },
    iconHover: {
      color: "#39A3FF",
    },
  })(Rating)