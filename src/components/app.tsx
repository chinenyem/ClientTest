import styled from "@emotion/styled";
import 'semantic-ui-css/semantic.min.css'
import { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "../engine/redux";
import AppHome from "./app.home";
import AppCreateTask from "./app.createTask";
import AirQualityMeasurement from "./app.airquality";

const App: FC = () => {
  return (
    <Provider store={store}>
      <Styled>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AirQualityMeasurement />} />
            <Route path="/task" element={<AppCreateTask />} />
            {/*<Route path="/airquality" element={<AirQualityMeasurement />} />*/}
          </Routes>
        </BrowserRouter>
      </Styled>
    </Provider>
  );
};

const Styled = styled.div`
  height: 100%;
`;

export default App;
