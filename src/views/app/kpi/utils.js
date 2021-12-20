import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from 'moment'

const DatePickerItem = () => {

    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(null);
    return (

        <Row className="mb-5">
            <Colxx xxs="6">
                <DatePicker
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText={"start"} />
            </Colxx>
            <Colxx xxs="6">
                <DatePicker
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText={"end"} />
            </Colxx>
        </Row>
    );
}

export default DatePickerItem