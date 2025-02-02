import React from "react";
import PropTypes from "prop-types";

export default function TitleView({ title }) {
  return <h1 className="text-2xl font-bold text-gray-800">{title}</h1>;
}

TitleView.propTypes = {
  title: PropTypes.string.isRequired,
};
