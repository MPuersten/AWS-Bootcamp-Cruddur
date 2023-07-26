import {ReactComponent as ReplyIcon} from './svg/reply.svg';

export default function ActivityActionQuery(props) { 
  const onclick = (event) => {
    event.preventDefault();
    props.setReplyActivity(props.activity);
    props.setPopped(true);
    return false;
  }

  return (
    <div onClick={onclick} className="action activity_action_reply">
      <ReplyIcon className='icon' />
      Query
    </div>
  )
}