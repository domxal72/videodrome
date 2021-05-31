import React, { useContext } from 'react'
import { Grid, Typography  } from '@material-ui/core';
import { useParams, Link } from "react-router-dom";

import { GlobalContext } from '../contexts/global/GlobalState'

export default function Page404() {

  let { path } = useParams()

  const { getVideos } = useContext(GlobalContext)

  return (
    <Grid direction='column'>
      <Typography variant='h3'>404</Typography>
      <Typography>
        Requested path <Typography display='inline' color='secondary'>{path}</Typography> not found.
        <Typography>Return to <Link to='/'><Typography display='inline' color='secondary'>homepage</Typography></Link></Typography>
      </Typography>
      <button onClick={getVideos}>click context</button>
    </Grid>
  )
}
