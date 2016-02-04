/* eslint no-param-reassign:0 */

import React, {PropTypes} from 'react'
import _ from 'lodash'

import {Block, Row} from 'react-display'
import {theme} from '../theme'
import {TextBody} from '../basics/TextBody'
import {A, H2} from '../basics'
import {examplesData} from '../examplesData'

const handleError = evt => {
  evt.target.src = '/imgs/error.png'
}

const ExampleCard = props => (
  <Block
    cursor='pointer'
    height='140px'
    margin={10}
    onClick={() => props.onUpdate({click: true})}
    overflowY='hidden'
    width={245}
  >
    <H2
      fontSize={17}
      marginBottom={5}
      marginTop={0}
    >
      <A>
        {props.title}
      </A>
    </H2>
    <img
      onError={handleError}
      src={`/imgs/${props.id}.png`}
      width='100%'
    />
  </Block>
)
ExampleCard.propTypes = {
  id: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  title: PropTypes.string,
}
const handleExampleCard = (props, childProps, d) => {
  if (childProps.click === true) {
    props.onUpdate({
      routerPath: `/example/${d.id}`,
    })
  }
}

export const ExamplesSection = props => (
  <TextBody>
    <Row flexWrap='wrap' justifyContent='center'>
      {_.map(
        examplesData,
        (d, i) => (
          <ExampleCard
            key={i}
            onUpdate={childProps => handleExampleCard(props, childProps, d)}
            {...d}
          />
        )
      )}
    </Row>
  </TextBody>
)
ExamplesSection.propTypes = {
  examplesData: PropTypes.array,
  theme: PropTypes.object,
}
ExamplesSection.defaultProps = {
  theme,
}
