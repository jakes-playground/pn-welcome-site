import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

class VipVisitTemplate extends React.Component {
  render() {
    const { visit } = get (this, 'props.data')
    const contact = get (this, 'props.data.contact.frontmatter')
    const usualSuspects = get (this, 'props.data.usualSuspects.edges')

    console.log(contact)
    console.log(visit)
    console.log(usualSuspects)

    return (
      <div>
        <Helmet title="Visit">
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1>Welcome, {visit.frontmatter.visitorName}</h1>
        <p>{visit.frontmatter.introText}</p>
        <p>Your main point of contact is {contact.firstname} {contact.lastname} ({contact.email})</p>
        <p>Usual Suspects:</p>
        <ul>
          {usualSuspects.map(({node}, i) => {
            return (<li key={`usual-suspect-${i}`}>{node.frontmatter.firstname}</li>)
          })}
        </ul>

      </div>
    )
  }
}

export const pageQuery = graphql`
  query VisitById($visitId: String!, $contactEmail: String!, $usualSuspects: [String]) {
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

    contact: markdownRemark(frontmatter: {email: {eq: $contactEmail}}) {
      frontmatter {
        firstname
        lastname
        email
        headshot {
          publicURL
        }
      }
    }

    usualSuspects: allMarkdownRemark(filter: {frontmatter: {email: {in: $usualSuspects }}}) {
      edges {
        node {
          frontmatter {
            firstname
            lastname
            email
            headshot {
              publicURL
            }
          }
        }
      }
    }
  }
`

export default VipVisitTemplate