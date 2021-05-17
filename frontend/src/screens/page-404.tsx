import React from 'react'
import { Grid, Typography  } from '@material-ui/core';
import { useParams, Link } from "react-router-dom";

export default function Page404() {

  let { path } = useParams()

  return (
    <Grid direction='column'>
      <Typography variant='h3'>404</Typography>
      <Typography>
        Requested path <Typography display='inline' color='secondary'>{path}</Typography> not found.
        <Typography>Return to <Link to='/'><Typography display='inline' color='secondary'>homepage</Typography></Link></Typography>
      </Typography>
    </Grid>
  )
}
