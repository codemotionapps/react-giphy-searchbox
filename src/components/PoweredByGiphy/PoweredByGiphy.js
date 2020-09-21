// @flow
import React from 'react'
import styles from './PoweredByGiphy.module.css'

type Props = {
  image: string,
}

const PoweredByGiphy = ({ image }: Props) => (
  <div className="powered-by-giphy">
    <img src={image} alt="Powered by Giphy" data-testid="PoweredByGiphy" />
  </div>
)

export default PoweredByGiphy
