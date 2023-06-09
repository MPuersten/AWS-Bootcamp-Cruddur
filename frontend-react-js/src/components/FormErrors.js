import './FormErrors.css';
import FormErrorItem from 'components/FormErrorItem';

export default function FormErrors(props) {
    let el_errors = null

    if (props.errors) {
      if (Array.isArray(props.errors)) {
        el_errors = (<div className='errors'>
          {props.errors.map(err_code => {
            return <FormErrorItem err_code={err_code} />
          })}
        </div>);
      }
      else {
        el_errors = (<div className='errors'>
          <FormErrorItem err_code={props.errors} />
        </div>);
      }
    }

    return (
        <div className='errors_wrap'>
            {el_errors}
        </div>
    )
}