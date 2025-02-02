import React from "react";
import PropTypes from "prop-types";

export default function MoodButtonView({ label, icon, bgColor, onClick, count }) {
  return (
    <button
      className={`flex items-center space-x-1 ${bgColor} text-white px-3 py-1 rounded`}
      onClick={onClick}
    >
      <img src={icon} alt={label} className="w-5 h-5" />
      <span>{count}</span>
    </button>
  );
}

MoodButtonView.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
