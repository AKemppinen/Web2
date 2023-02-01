import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import ReactDOM from 'react-dom/client';

function BasicExample() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (d, e) => {

    fetch('http://localhost:8080/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(d),
    })
  .then((response) => response.json())
  .then((data) => console.log(data, e));
  } 
  const onError = (errors, e) => console.log(errors, e);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email")} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password")} type="password" placeholder="Password" 
        />
      </Form.Group> 
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BasicExample />);
export default BasicExample;