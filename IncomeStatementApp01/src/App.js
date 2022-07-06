import { Fragment } from "react";
import Header from "./components/Header";
import IncomeStatement from "./components/IncomeStatement";

const App = () =>(
  <Fragment>
    <Header brand="IncomeStatement" />
    <IncomeStatement />
  </Fragment>
);

export default App;
