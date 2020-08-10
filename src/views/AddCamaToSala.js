import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


import PageTitle from "../components/common/PageTitle";
import camaService from "../services/camas.service";

class AddCamaToSala extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.submitCama = this.submitCama.bind(this);
    this.camaChange = this.camaChange.bind(this)
  }

  initialState = {idSala: '', idCama: ''}

  componentDidMount() {
    this.state.idSala = this.props.match.params.id;
  }

  submitCama = event => {
    alert('Se agregará la cama ' + this.state.idCama + ' a la Sala ' + this.state.idSala);
    event.preventDefault();

    const data = {
        idSala: this.state.idSala,
        idCama: this.state.idCama
    };

    camaService.addCama(data)
        .then(response => {
            if (response.data != null) {
                this.setState(this.initialState);
                alert("Cama agregada");
            }
        });
  }

  camaChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  render() {

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="" subtitle="" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg={12} style={{ marginTop: "20px" }}>
            <Card>
              <Card.Header>Agregar Cama a Sala Recuperacion</Card.Header>
                <Form onSubmit={this.submitCama} id="AddCamaToSala">
                  <Card.Body>
                    <Form.Row>
                      <Form.Group controlId="formGridCama" style={{ marginLeft: "10px" }}>
                        <Form.Label>ID Cama</Form.Label>
                        <Form.Control required type="text" name="idCama" value={this.state.idCama} onChange={this.camaChange} placeholder="ID" />
                      </Form.Group>
                      </Form.Row>
                        </Card.Body>
                          <Card.Footer>
                            <Button variant="success" type="submit">
                              Submit
                            </Button>
                          </Card.Footer>
                            </Form>
            </Card>
                    </Col>
                </Row>
      </Container>
    );
  }
};

export default AddCamaToSala;
