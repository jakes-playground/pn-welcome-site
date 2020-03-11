import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

class VipVisitTemplate extends React.Component {
  render() {
    const { visit, contact } = get (this, 'props.data')
    console.log(contact)

    console.log(visit)

    return (
      <div>
        <Helmet title="Visit">
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1>Welcome, {visit.frontmatter.visitorName}</h1>
        <p>{visit.frontmatter.introText}</p>
        <p>Your main point of contact is {contact.frontmatter.name} ({contact.frontmatter.email})</p>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query VisitById($visitId: String!, $contactName: String!) {
    visit: markdownRemark(id: { eq: $visitId }) {
      id
      frontmatter {
        dateTime(formatString: "MMMM DD, YYYY")
        introText
        title
        visitLength
        visitorName
      }
    }

    contact: markdownRemark(frontmatter: {name: {eq: $contactName}}) {
      frontmatter {
        name
        email
        headshot {
          publicURL
        }
      }
    }
  }
`

export default VipVisitTemplate