import ErrorBoundary from "./components/error-boundary/error-boundary.component.jsx";
import CreditCardForm from "./components/credit-card-form/credit-card-form.component.jsx";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <CreditCardForm />
      </ErrorBoundary>
    </div>
  );
}

export default App;
