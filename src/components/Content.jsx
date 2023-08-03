import React, { Fragment } from 'react'
import Keywords from './Keywords'
const readingTime = require('reading-time')

class Content extends React.Component {
  state = {
    word: '',
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    keywords: [],
    time: 0.0
  }

  gotInput = (event) => {
    let newCharacters = event.target.value.length
    
    // ! todo : check regex ((\b[^\s]+\b)((?<=\.\w).)?)
    // * todo : check regex /\b(\w+)\b/g
    let newWords = event.target.value.match(/\b(\w+)\b/g) || [[]]
    
    // * todo : check regex ([^ \r\n][^!?\.\r\n]+[\w!?\.]+)
    let newSentences = event.target.value.match(/[^ \r\n][^!?\.\r\n]+[\w!?\.]+/g) || [] //eslint-disable-line

    // * todo : check regex /(.+)((\r?\n.+)*)/gm
    let newParagraphs = event.target.value.match(/(.+)((\r?\n.+)*)/gm) || []
    
    const newKeywords = {}
    for (let i = 0; i < newWords.length; i++) {
      const element = newWords[i];
      if (!newKeywords[element]) {
        newKeywords[element] = 1
      } else {
        newKeywords[element] += 1
      }
    }
    let sorted = Object.entries(newKeywords).sort((a,b) => (a[1] < b[1]) ? 1 : ((b[1] < a[1]) ? -1 : 0))

    const stats = readingTime(event.target.value)

    if (sorted[0][0] === '') {
      sorted = []
      newCharacters = 0
      newWords = 0
      newSentences = 0
      newParagraphs = 0
    }
    this.setState({
      word: event.target.value,
      characters: newCharacters,
      words: newWords.length || 0,
      sentences: newSentences.length || 0,
      paragraphs: newParagraphs.length || 0,
      keywords: sorted,
      time: stats.time
    })
  }

  render () {
    return (
      <Fragment>
        <div className="grid grid-cols-6 gap-6 container mx-auto lg:mt-6 mt-5 px-3">
          <section className="md:col-span-4 col-span-6 md:h-120 h-60 p-3 ring ring-blue-300 rounded-md">
            <textarea
            name="word" id="word"
            placeholder="Insert some text here..."
            className="resize-none w-full min-h-full border-gray-700 placeholder-opacity-40 break-all focus:outline-none" autoFocus onChange={this.gotInput}
            ></textarea>
          </section>
          <aside className="md:col-span-2 col-span-6 px-3 rounded-md ring ring-blue-300 md:h-120 h-60 overflow-y-auto">
            <div className="py-3">
              <div className="mx-2">
                <p className="">Characters:<span className="pl-1">{this.state.characters}</span></p>
              </div>
              <div className="mx-2">
    <p className="">Words:<span className="pl-1">{this.state.words}</span></p>
              </div>
              <div className="mx-2">
    <p className="">Sentences:<span className="pl-1">{this.state.sentences}</span></p>
              </div>
              <div className="mx-2">
    <p className="">Paragraphs:<span className="pl-1">{this.state.paragraphs}</span></p>
              </div>
              <div className="mx-2">
    <p className="">Reading Time:<span className="pl-1">~{Math.ceil(this.state.time / 1000)} sec</span></p>
              </div>
            </div>
            <hr/>
            <p className="my-3 text-lg">Keywords:</p>
            <div className="my-2 flex flex-wrap break-all">
              {
                this.state.keywords.map((e, idx) => {
                  return (
                    <Keywords word={e[0]} key={idx} count={e[1]}/>
                  )
                })
              }
            </div>
          </aside>
        </div>
      </Fragment>
    )
  }
}

export default Content