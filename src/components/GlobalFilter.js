import React from "react";
import { Form, Row } from "react-bootstrap";

export const GlobalFilter = ({filter, setFilter}) =>{
    return(
        <Row className="m-4 g-0 justify-content-center">
            <Form.Label className="fw-bold">Search:{''}</Form.Label> 
            <Form.Control className=""  value={filter||""} onChange={(e)=>setFilter(e.target.value)} />
        </Row>
        
    )
}