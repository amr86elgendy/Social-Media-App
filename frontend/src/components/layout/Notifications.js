import React, { useState } from 'react';
import { Badge, IconButton, Menu,
  MenuItem, Tooltip, Typography
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import day from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch, useSelector } from 'react-redux';
import { mark_notification_as_read } from '../../actions/userAction';
import { useRef } from 'react';

const Notifications = () => {
  day.extend(relativeTime);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.user);

  const ancor = useRef()
  
  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
    .filter((not) => !not.read)
    .map((not) => not._id);
    
    dispatch(mark_notification_as_read(unreadNotificationsIds));
  };

  return (
    <>
      <Tooltip placement='top' title='Notifications'>
        <IconButton
          ref={ancor}
          aria-controls={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={(e) => setAnchorEl(ancor.current)}
        >
          {notifications && notifications.length > 0 ? (
            notifications.filter((not) => not.read === false).length > 0 ? (
              <Badge
                badgeContent={
                  notifications.filter((not) => not.read === false).length}
                color='secondary'
              >
                <NotificationsIcon />
              </Badge>
            ) : (
              <NotificationsIcon />
            )
          ) : (
            <NotificationsIcon />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onEntered={onMenuOpened}
      >
        {notifications && notifications.length > 0 ? (
          notifications.map((not) => {
            const verb = not.type === 'like' ? 'liked' : 'commented on';
            const time = day(not.createdAt).fromNow();
            const iconColor = not.read ? 'primary' : 'secondary';
            const icon = not.type === 'like' ? (
                <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
              ) : (
                <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
              );

            return (
              <MenuItem key={not.createdAt} onClick={() => setAnchorEl(null)}>
                {icon}
                <Typography
                  component={Link}
                  color='inherit'
                  variant='body1'
                  to={`/user/${not.recipient}/post/${not.postId}`}
                >
                  {not.sender} {verb} your post {time}
                </Typography>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem onClick={() => setAnchorEl(null)}>
            You have no notifications yet
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Notifications;
