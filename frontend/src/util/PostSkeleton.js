import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { global_theme } from './Themes';

const useStyles = makeStyles(global_theme);


const PostSkeleton = () => {
  const classes = useStyles();

  return (
    <>
    {Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image="https://raw.githubusercontent.com/hidjou/classsed-react-firebase-client/master/src/images/no-img.png" />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ))}
    </>
  )
}

export default PostSkeleton
