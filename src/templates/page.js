import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

class BasicPageTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulBasicPage')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const sections = get(this.props, 'data.contentfulBasicPage.sections')

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${page.metaTitle || page.title} | ${siteTitle}`} />
        <div className="wrapper">
          <h1 className="section-headline">{page.title}</h1>
          <p
            style={{
              display: 'block',
            }}
          >
            Page content here
          </p>

          <ul>
            {sections.map((contentfulBasicPage) => {
              return (
                <li key={contentfulBasicPage.id}>
					        {contentfulBasicPage.title} <br />
                  {contentfulBasicPage.youtubeVideoUrl}
                </li>
              )
            })}
          </ul>		  
        </div>
            
      </div>
    )
  }
}

export default BasicPageTemplate

export const BasicPageQuery = graphql`
  query BasicPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }      
    },
    contentfulBasicPage(slug: { eq: $slug }) {
      title
      metaTitle
      slug
      sections {
        ... on ContentfulPageSection {
          id
          title
        }
        ... on ContentfulYoutubeVideo {
          id
          title
          youtubeVideoUrl
        }			
      }
    }
  }
`
