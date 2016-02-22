
import React, {PropTypes} from 'react'

import {theme} from '../theme'

import {Footer} from '../App/Footer'
import {Header} from '../App/Header'
import {Main, Column} from 'react-display'
import {Section} from '../Section'

export const App = props => (
  <Main
    fontFamily={theme.fontFamily}
    fontSize={theme.fontSize}
    height='100%'
  >
    <Header
      {...props}
      title='Orama'
    />
    <Column
      marginBottom='auto'
      marginTop='auto'
    >
      <Section {...props}/>
    </Column>
    <Footer/>
  </Main>
)
App.propTypes = {
  theme: PropTypes.object,
}
App.defaultProps = {
  theme,
  section: 'root',
}
