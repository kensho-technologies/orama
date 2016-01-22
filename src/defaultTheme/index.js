
export const DEFAULT_THEME = {
  fontFamily: 'verdana',
  fontFamilyMono: 'verdana',
  titleFontWeight: 'bold',
  fontSize: 13,
  lineHeight: 1.5,
  textFill: 'hsl(0, 0%, 0%)',

  backgroundFill: 'hsl(0, 0%, 100%)',
  plotBackgroundFill: 'hsl(0, 0%, 97%)',

  guideStroke: 'hsl(0, 0%, 80%)',
  guideLineWidth: 2,
  guideZeroStroke: 'hsl(0, 0%, 55%)',
  guideZeroLineWidth: 2,

  axisLabelFontSize: 13,
  axisLabelFontWeight: 'bold',
  axisTickFontSize: 12,
  axisTickTextFill: 'hsl(0, 0%, 0%)',

  tooltipFontSize: 13,
  tooltipTitleFontSize: 13,
  tooltipTitleFontWeight: 'bold',
  tooltipValueFontSize: 13,
  tooltipBackgroundFill: 'hsl(0, 0%, 80%)',
  tooltipEvenBackgroundFill: 'hsl(0, 0%, 70%)',
  tooltipBoxShadowFill: 'hsla(0, 0%, 0%, 0.5)',
  tooltipKeyBorderStroke: 'hsl(0, 0%, 40%)',

  plotFontSize: 12,
  plotFill: 'hsl(200,30%, 50%)',
  plotLineWidth: 2,
  plotAlpha: 0.85,

  plotLinearRangeFill: ['#edf8b1', '#2c7fb8'],
  plotOrdinalRangeFill: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
}

export const getTheme = props => {
  const theme = {
    ...DEFAULT_THEME,
    ...props.theme,
  }
  return {theme}
}
