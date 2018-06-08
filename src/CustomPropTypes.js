// Copyright 2018 Kensho Technologies, LLC.

import PropTypes from 'prop-types'

export const margin = PropTypes.shape({
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
})

export const plotRect = PropTypes.shape({
  height: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
})

export const theme = PropTypes.shape({
  fontFamily: PropTypes.string,
  fontFamilyMono: PropTypes.string,
  titleFontWeight: PropTypes.string,
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  textFill: PropTypes.string,
  backgroundFill: PropTypes.string,
  plotBackgroundFill: PropTypes.string,
  guideStroke: PropTypes.string,
  guideLineWidth: PropTypes.number,
  guideZeroStroke: PropTypes.string,
  guideZeroLineWidth: PropTypes.number,
  axisLabelFontSize: PropTypes.number,
  axisLabelFontWeight: PropTypes.string,
  axisTickFontSize: PropTypes.number,
  axisTickTextFill: PropTypes.string,
  tooltipFontSize: PropTypes.number,
  tooltipTextFill: PropTypes.string,
  tooltipTitleFontSize: PropTypes.number,
  tooltipTitleFontWeight: PropTypes.string,
  tooltipValueFontSize: PropTypes.number,
  tooltipBackgroundFill: PropTypes.string,
  tooltipEvenBackgroundFill: PropTypes.string,
  tooltipBoxShadowFill: PropTypes.string,
  tooltipKeyBorderStroke: PropTypes.string,
  plotFontSize: PropTypes.number,
  plotFill: PropTypes.string,
  plotLineWidth: PropTypes.number,
  plotAlpha: PropTypes.number,
  plotLinearRangeFill: PropTypes.arrayOf(PropTypes.string),
  plotOrdinalRangeFill: PropTypes.arrayOf(PropTypes.string),
})
