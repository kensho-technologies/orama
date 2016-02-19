
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {theme} from '../../theme'
import {TextBody} from '../../basics/TextBody'
import {A} from '../../basics'
import {Block, Row, Inline} from 'react-display'

const {version} = require('json!../../../../package.json')

const getMenuSections = props => (
  _.filter(props.sectionsData, 'showOnMenu')
)

const MenuItem = props => (
  <Block
    marginLeft={10}
    onClick={() => props.onUpdate({action: 'click'})}
  >
    <A
      strokeAlpha={props.selected ? 0.5 : undefined}
    >
      {props.text}
    </A>
  </Block>
)
MenuItem.propTypes = {
  selected: PropTypes.bool,
  text: PropTypes.string,
}

const handleLogoClick = props => {
  props.onUpdate({
    routerPath: '/',
  })
}
const handleMenu = (props, childProps, d) => {
  props.onUpdate({
    routerPath: `/${d.id}`,
  })
}

/*
Used inside <App/>
*/
export const Header = props => (
  <TextBody
    marginBottom={20}
    marginTop={20}
  >
    <Row
      alignItems='baseline'
      color={theme.accentColor}
    >
      <A
        fontSize={theme.fontSize * 1.6}
        fontWeight='bold'
        onClick={() => handleLogoClick(props)}
        strokeWidth={0}
      >
        {props.title}
        {' '}
        <Inline
          fontSize='14'
          paddingLeft='3'
          verticalAlign='top'
        >
          {version}
        </Inline>
      </A>
      <Row
        alignItems='baseline'
        flex={1}
        fontSize={theme.fontSize * 0.85}
        justifyContent='flex-end'
      >
        {_.map(
          getMenuSections(props),
          d => (
            <MenuItem
              key={d.id}
              onUpdate={childProps => handleMenu(props, childProps, d)}
              selected={props.section === d.id ? true : false}
              text={d.name}
            />
          )
        )}
      </Row>
    </Row>
  </TextBody>
)
Header.propTypes = {
  section: PropTypes.string,
  theme: PropTypes.object,
  title: PropTypes.string,
}
Header.defaultProps = {
  theme,
}
