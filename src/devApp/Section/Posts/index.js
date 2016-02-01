
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {theme} from '../../theme'

import {TextBody} from '../../basics/TextBody'
import {A, H1, P} from '../../basics'

const PostDescr = props => (
  <div>
    <H1
      marginBottom={5}
      onClick={() => props.onUpdate({click: true})}
    >
      <A>
        {props.title}
      </A>
    </H1>
    <P
      color='grey'
      fontSize={13}
    >
      {props.date && props.date.toDateString()}
    </P>
    <P>
      {props.description}
    </P>
  </div>
)
PostDescr.propTypes = {
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  title: PropTypes.string,
}
const handlePostDesc = (props, childProps, d) => {
  if (childProps.click === true) {
    props.onUpdate({
      routerPath: `/post/${d.id}`,
    })
  }
}

export const Posts = props => (
  <TextBody>
    {_.map(
      props.postsData,
      (d, i) => (
        <PostDescr
          key={i}
          onUpdate={childProps => handlePostDesc(props, childProps, d)}
          {...d}
        />
      )
    )}
  </TextBody>
)
Posts.propTypes = {
  postsData: PropTypes.array,
  theme: PropTypes.object,
}
Posts.defaultProps = {
  theme,
}
