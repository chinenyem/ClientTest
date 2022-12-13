// @ts-nocheck

import {FC, useState } from 'react';
import { mapDispatch, mapProps } from "../engine/redux";
import { $getAirMeasurementsFirstCity, $getAirMeasurementsSecondCity } from "../engine/slices/airquality.slice";
import {Button, Container, Form, Grid, Header, Table,} from 'semantic-ui-react';
import Moment from 'react-moment';


const AirQualityMeasurement: FC = () => {
    const [firstCity, setFirstCity] = useState([]);
    const [secondCity, setSecondCity] = useState([]);
    const [firstCityError, setFirstCityError] = useState(false);
    const [secondCityError, setSecondCityError] = useState(false);
    const firstCityMeasurements = mapProps((state) => state.measurement.firstCityMeasurements);
    const secondCityMeasurements = mapProps(state => state.measurement.secondCityMeasurements);
    const dispatch = mapDispatch();

    const handleChange = (e) => {
        setFirstCity(null);
        setSecondCity(null)
        const name = e.target.name;
        switch (name) {
            case 'firstcity':
                setFirstCity(e.target.value);
                break;
            case 'secondcity':
                setSecondCity(e.target.value);
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        let error = false;
        switch (data) {
            case data.firstcity == '':
                setFirstCityError(true);
                error = true;
                break;
            case data.secondcity == '':
                setSecondCityError(true);
                error = true;
                break;
        }
        if (error){
            alert("Fill in both city input fields")
            setFirstCityError(false);
            setSecondCityError(false);
        }else{
            setFirstCity(data.firstcity);
            dispatch($getAirMeasurementsFirstCity(data.firstcity))
            setSecondCity(data.secondcity)
            dispatch($getAirMeasurementsSecondCity(data.secondcity))
        }

    }

    return (
        <Container text>
            <Header as='h1' dividing>
                Air Quality Assessment Tool
            </Header>
            <Grid>
                <Grid.Row>
                    <Form unstackable onSubmit={onSubmit}>
                        <Form.Group widths={2}>
                            <Form.Input
                                label='First City'
                                placeholder='city name'
                                name='firstcity'
                                required
                                onChange={handleChange}
                                error={firstCityError}
                            />
                            <Form.Input
                                label='Second City'
                                placeholder='city name'
                                name='secondcity'
                                required
                                onChange={handleChange}
                                error={secondCityError}
                            />
                        </Form.Group>
                        <Button type='submit'>Search</Button>
                    </Form>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column float="right">
                        {firstCityMeasurements?.results ?
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Location</Table.HeaderCell>
                                        <Table.HeaderCell>Parameter</Table.HeaderCell>
                                        <Table.HeaderCell>Value</Table.HeaderCell>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {firstCityMeasurements.results[0].measurements.map((r) => (
                                        <Table.Row>
                                            <Table.Cell>{firstCity}</Table.Cell>
                                            <Table.Cell>{r.parameter}</Table.Cell>
                                            <Table.Cell>{r.value}</Table.Cell>
                                            <Table.Cell><Moment format="YYYY/MM/DD hh:mm:ss">{r.lastUpdated}</Moment></Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                                : <></>}
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row >
                    <Grid.Column float="right">
                        {secondCityMeasurements?.results ?
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Location</Table.HeaderCell>
                                        <Table.HeaderCell>Parameter</Table.HeaderCell>
                                        <Table.HeaderCell>Value</Table.HeaderCell>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {secondCityMeasurements.results[0].measurements.map((r) => (
                                        <Table.Row>
                                            <Table.Cell>{secondCity}</Table.Cell>
                                            <Table.Cell>{r.parameter}</Table.Cell>
                                            <Table.Cell>{r.value}</Table.Cell>
                                            <Table.Cell><Moment format="YYYY/MM/DD hh:mm:ss">{r.lastUpdated}</Moment></Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                            : <></>}

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>

    )
}

export default AirQualityMeasurement;
