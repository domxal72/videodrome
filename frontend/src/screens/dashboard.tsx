import React, { useEffect, useContext } from 'react'
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Flex } from '../ui/general/flex'
import { ImgContainer } from '../ui/general/img-container';
import { VideoContext } from '../contexts/video/VideoState';

export default function Dashboard() {

  const { getVideos, videoList } = useContext(VideoContext)

  useEffect(() => {
    getVideos()
  }, [])

  return (
    <Flex flexDirection='column'>
      <Grid container direction='row' justify='flex-start' wrap='wrap'>
        {videoList.length > 0 && videoList.map(({ _id, title, description, img }) => (
          <Grid key={_id} sm={6} md={4} lg={3}>
            <Typography variant='subtitle1'>{title}</Typography>
            <Typography variant='subtitle2'>{description}</Typography>
            <Link to={`/video/stream/${_id}`}>
              <ImgContainer src={img} alt="alt img txt" />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Flex>
  )
}
