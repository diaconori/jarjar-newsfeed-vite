import React from "react";
import PropTypes from "prop-types";

export default function ProfileImageView({ src, alt }) {
  return <img src={src} alt={alt} className="circular-image" />;
}

ProfileImageView.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
