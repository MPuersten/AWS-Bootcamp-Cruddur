export default function FormErrorItem(props) {
    const render_error = () => {
      let errorMessage;
      switch (props.err_code)  {
        case 'generic_500':
          errorMessage = "An error occured on the server."
          break;
        case 'generic_403':
          errorMessage = "You are not authorized to perform this action"
          break;
        case 'generic_401':
          errorMessage = "You are not authenicated to perform this action"
          break;
        case 'cognito_user_id_blank':
          errorMessage = "The user could not be authenticated or identified."
          break;
        case 'activity_uuid_blank':
          errorMessage = "The post ID was blank."
          break;
        case 'message_blank':
          errorMessage = "The message was blank."
          break;
        case 'message_exceed_max_chars_1024':
          errorMessage = "The message is too long, It must be less than 1024 characters."
          break;
        // Users
        case 'message_group_uuid_blank':
          errorMessage = "The message group was blank."
          break;
        case 'user_reciever_handle_blank':
          errorMessage = "This message was not sent because the user was invalid."
          break;
        // Profile
        case 'display_name_blank':
          errorMessage = "The display name was blank."
          break;
        default:
          // directly return the error
          errorMessage = props.err_code
          break;
      }

      return errorMessage;
    }
  
    return (
      <div className="errorItem">
        {render_error()}
      </div>
    )
  }