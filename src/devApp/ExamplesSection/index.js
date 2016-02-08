/* eslint no-param-reassign:0 */

import React, {PropTypes} from 'react'
import _ from 'lodash'

import {Block, Row} from 'react-display'
import {theme} from '../theme'
import {TextBody} from '../basics/TextBody'
import {A, H2} from '../basics'
import {examplesData, kExamplesData} from '../examplesData'

const handleError = evt => {
  if (!evt.target.src.match(/\/imgs\/error.png/g)) {
    evt.target.src = '/imgs/error.png'
  }
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
        {`${props.k ? '(K) ' : ''}${props.title}`}
      </A>
    </H2>
    <img
      onError={handleError}
      src={`/${props.k ? 'kImgs' : 'imgs'}/${props.id}.png`}
      width='100%'
    />
  </Block>
)
ExampleCard.propTypes = {
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  id: PropTypes.string,
  k: PropTypes.bool,
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
        examplesData.concat(kExamplesData),
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
