import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

class VipVisitTemplate extends React.Component {
  render() {
    const visit = get(this, 'props.data.markdownRemark')

    console.log(visit)

    return (
      <div>
        <Helmet title="Visit">
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1>Welcome, {visit.frontmatter.visitorName}</h1>
        <p>{visit.frontmatter.introText}</p>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query VisitById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        dateTime(formatString: "MMMM DD, YYYY")
        introText
        title
        visitLength
        visitorName
      }
    }
  }
`

export default VipVisitTemplate