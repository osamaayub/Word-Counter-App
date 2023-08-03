import React, {Fragment} from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

class Home extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Content />
        <Footer />
      </Fragment>
    )
  }
}

export default Home