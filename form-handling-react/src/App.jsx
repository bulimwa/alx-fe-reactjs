import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';  // Note: lowercase 'f'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Advanced Form Handling in React</h1>
      
      <div className="forms-container">
        <div className="form-section">
          <RegistrationForm />
        </div>
        
        <div className="form-section">
          <FormikForm />
        </div>
      </div>
    </div>
  );
}

export default App;
