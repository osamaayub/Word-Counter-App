import React, {Fragment} from 'react'

const Keywords = (props) => {
  return (
    <Fragment>
      <div className="mb-2 mr-2 flex border border-gray-400 rounded-2xl shadow px-4 py-1 hover:text-white hover:bg-gray-900">
        <p className="font-bold">{props.word}</p>
        <span className="ml-3 self-center font-extrabold underline">{props.count}</span>
      </div>
    </Fragment>
  )
}

export default Keywords