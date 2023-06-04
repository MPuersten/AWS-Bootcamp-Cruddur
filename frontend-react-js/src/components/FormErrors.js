import './FormErrors.css';

export default function FormErrors(props) {
    let el_errors = null

    if (props.errors) {
      el_errors = (<div className='errors'>
        {props.errors.map(err_code => {
          return <FormErrorItem err_code={err_code} />
        })}
      </div>)
    }

    return (
        <div className='errors_wrap'>
            {el_errors}
        </div>
    )
}