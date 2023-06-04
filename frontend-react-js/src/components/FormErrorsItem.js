export default function FormErrorItem(props) {
    const render_error = () => {
      let errorMessage;
      switch (props.err_code)  {
        case 'generic_500':
          errorMessage = "An error occured on the server."
          break;
        default:
          // In the case for errror return from cognito they 
          // directly return the error so we just display it.
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