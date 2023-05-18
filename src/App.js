import MenuBar from './menubar/menubar';
import Cuenta from './cuenta/cuenta';
import './App.css';

function App() {
  return (
    <div className="App">
      <MenuBar />
      <div className='cuentas-container'>
          <Cuenta nombre="Banco" tipo="IE" monto={900.0}/>
          <Cuenta nombre="Nómina" tipo="I" monto={1000.0}/>
          <Cuenta nombre="Universidad" tipo="E" monto={-100.0}/>
          <Cuenta nombre="Efectivo" tipo="IE" monto={0.0}/>
      </div>
    </div>
  );
}

export default App;
