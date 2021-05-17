import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import { Flex } from '../ui/general/flex'
import { ImgContainer } from '../ui/general/img-container';

export default function Dashboard({ state, getVideoList }) {

  useEffect(() => {
    getVideoList()
  }, [])

  return (
    <Flex flexDirection='column'>
      <Grid container direction='row' justify='flex-start' wrap='wrap'>
        {state.videos.map(({ _id, title, description, img }) => (
          <Grid key={_id} sm={6} md={4} lg={3}>
            <Typography variant='subtitle1'>{title}</Typography>
            <Typography variant='subtitle2'>{description}</Typography>
            <ImgContainer src={img} alt="alt img txt" />
          </Grid>
        ))}
      </Grid>
      <video style={{height: '400px', width: '600px'}} id="videoPlayer" controls autoPlay={false}>
        <source src="http://localhost:5000/video" type="video/mp4" />
      </video>
    </Flex>
  )
}
