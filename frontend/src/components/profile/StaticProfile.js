import React from 'react'
import day from 'dayjs';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import { Paper, Typography } from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { makeStyles } from '@material-ui/core/styles';
import { global_theme } from '../../util/Themes';

const useStyles = makeStyles(global_theme);


const StaticProfile = ({ userProfile: { username, createdAt, imageUrl, bio, website, location } }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/user/${username}`}
            color="primary"
            variant="h5"
          >
            @{username}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {day(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  )
}

export default StaticProfile
