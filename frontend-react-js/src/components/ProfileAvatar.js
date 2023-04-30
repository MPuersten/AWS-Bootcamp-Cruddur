import './ProfileAvatar.css';

export default function ProfileAvatar(props) {
  const backgroundImage = 'url("https://assets.cruddurmitchpuersten.ca/banners/banner.jpg")';
  const styles = {
    backgroundImage: backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className='profile-avatar' style={styles}></div>
  );
}