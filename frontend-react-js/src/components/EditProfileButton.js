import './EditProfileButton.css';

export default function EditProfileButton(props) {
  const pop_profile_form = (event) => {
    props.setPopped(true);
  }

  return (
    <button onClick={pop_profile_form} className='profile-edit-button' href="#">Crud</button>
  );
}