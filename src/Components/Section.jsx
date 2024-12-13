import React from 'react'

const Section = (props) => {
  return (
    <div className={props.className}>
        {props.child}
    </div>
  )
}

export default Section