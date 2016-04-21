/* eslint no-param-reassign:0 */

import React, {PropTypes} from 'react'
import _ from 'lodash'

import {Block, Row} from 'react-display'
import {theme} from '../theme'
import {TextBody} from '../basics/TextBody'
import {A, H2} from '../basics'
import {examplesData} from '../examplesData'

const handleError = evt => {
  if (!evt.target.src.match(/\/imgs\/error.png/g)) {
    evt.target.src = '/imgs/error.png'
  }
}

const ExampleCard = props => (
  <Block
    cursor='pointer'
    flexBasis={245}
    flexGrow={1}
    height={140}
    onClick={() => props.onUpdate({click: true})}
    opacity={props.hide ? 0.5 : 1}
    overflowY='hidden'
    padding={10}
  >
    <H2
      fontSize={17}
      marginBottom={5}
      marginTop={0}
    >
      <A color={props.hide ? 'black' : undefined}>
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
  description: PropTypes.any,
  hide: PropTypes.bool,
  id: PropTypes.string,
  k: PropTypes.bool,
  title: PropTypes.string,
}

const Spacer = () =>
  <Block flexBasis={245} flexGrow={1} paddingLeft={20}/>

const handleExampleCard = (props, childProps, d) => {
  if (childProps.click === true) {
    props.onUpdate({
      routerPath: `/example/${d.id}`,
    })
  }
}

export const ExamplesSection = props => (
  <TextBody flexBasis={undefined} margin={0}>
    <Row flexWrap='wrap' justifyContent='space-between'>
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
    <Spacer/><Spacer/><Spacer/>
    <Spacer/><Spacer/><Spacer/>
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
