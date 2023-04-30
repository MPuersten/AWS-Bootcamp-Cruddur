import './ProfileAvatar.css';

export default function ProfileAvatar(props) {
  console.log('AVATAR-PROPS', props);
  const backgroundImage = `url("https://assets.cruddurmitchpuersten.ca/avatars/${props.id}.jpg")`;
  const styles = {
    backgroundImage: backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className='profile-avatar' style={styles}></div>
  );
}