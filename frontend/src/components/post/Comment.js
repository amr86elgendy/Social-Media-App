import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { global_theme } from '../../util/Themes';
import day from 'dayjs';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(global_theme);

const Comment = ({ comments }) => {
  const classes = useStyles();

  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, username } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt='comment'
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant='h5'
                      component={Link}
                      to={`/user/${username}`}
                      color='primary'
                    >
                      {username}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {day(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variabnt='body1'>{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default Comment;
