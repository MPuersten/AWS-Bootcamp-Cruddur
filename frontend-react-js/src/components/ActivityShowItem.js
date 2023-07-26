import React, { useState } from 'react';

import './ActivityItem.css';

import ActivityActionReply  from '../components/ActivityActionReply';
import ActivityActionRepost  from '../components/ActivityActionRepost';
import ActivityActionLike  from '../components/ActivityActionLike';
import ActivityActionShare  from '../components/ActivityActionShare';
import ActivityContent from './ActivityContent';

import { Link } from "react-router-dom";
import { format_datetime, time_ago, time_future } from '../lib/DateTimeFormats';
import { ReactComponent as BombIcon } from './svg/bomb.svg';
import { getAccessToken } from 'lib/CheckAuth';

export default function ActivityShowItem(props) {

  // Initialize state variables
  const [active, setActive] = useState(false);
  const [btnText, setBtnText] = useState('Activity Review');

  const activityUploadKey = async ()=> {
    try {
      const gateway_url = `${process.env.REACT_APP_ACTIVITY_REVIEW_GATEWAY_ENDPOINT_URL}/queries/activity_review`
      await getAccessToken();
      const access_token = localStorage.getItem("access_token")
      const json = {
        extension: 'none'
      }

      console.log('Built objects.');

      const res = await fetch(gateway_url, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          'Origin': process.env.REACT_APP_FRONTEND_URL,
          'Authorization': `Bearer ${access_token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      console.log('Fetched results.');

      let data = await res.json();
      if (res.status === 200) {
        return data.url
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  }
  const activityUpload = async ()=> {
    const presignedurl = await activityUploadKey()
    try {
      const res = await fetch(presignedurl, {
        method: "PUT",
        body: 'Your string content', // Insert the string you want to upload
      })
      if (res.status === 200) {
        console.log('upload successful.');
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  }
  

  const handleQuery = (event) => {
    event.preventDefault();
  
    if (!active) {
      // Set the active state to true and update the button text
      setActive(true);
      setBtnText('Review Requested');
      console.log('Review Requested.');

      console.log(props);
    } else {
      // If already active, just log the message
      console.log('A review was already requested');
    }
  
    return false;
  }

  const attrs = {}
  attrs.className = 'activity_item expanded' + (active ? ' active' : '');

  return (
    <div {...attrs}>
      <div className="activity_main">
        <ActivityContent activity={props.activity} />
        <div className='expandedMeta'>
          <div className="created_at">
            {format_datetime(props.activity.created_at)}
          </div>
        </div>
        <div className="activity_actions">
          <ActivityActionReply setReplyActivity={props.setReplyActivity} activity={props.activity} setPopped={props.setPopped} activity_uuid={props.activity.uuid} count={props.activity.replies_count}/>
          <ActivityActionRepost activity_uuid={props.activity.uuid} count={props.activity.reposts_count}/>
          <ActivityActionLike activity_uuid={props.activity.uuid} count={props.activity.likes_count}/>
          <ActivityActionShare activity_uuid={props.activity.uuid} />
          <button onClick={activityUpload} className={`activity-query${active ? ' active' : ''}`}>{btnText}</button>
        </div>
      </div>
    </div>
  )
}
