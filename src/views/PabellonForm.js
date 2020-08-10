import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


import PageTitle from "../components/common/PageTitle";
import pabellonService from "../services/pabellon.service";

class PabellonForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.pabellonChange = this.pabellonChange.bind(this);
    this.submitPabellon = this.submitPabellon.bind(this);
  }

  initialState = { id: '', sala: '', descripcion: '', estado: ''}
  componentDidMount() {
    const pabellonId = +this.props.match.params.id;
    if (pabellonId) {
        pabellonService.show(pabellonId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        sala: response.data.sala,
                        descripcion: response.data.descripcion,
                        estado: response.data.estado,
                    });
                }
            }).catch((error) => {
                console.error("Error " + error);
            });
    }
  }

  submitPabellon = event => {
    alert('Sala: ' + this.state.sala + '\nDescripcion ' + this.state.descripcion + '\nEstado: ' + this.state.estado);
    event.preventDefault();

    const pabellon = {
        id: this.state.id,
        sala: this.state.sala,
        descripcion: this.state.descripcion,
        estado: this.state.estado,
    };

    pabellonService.createPabellon(pabellon)
        .then(response => {
            if (response.data != null) {
                this.setState(this.initialState);
                alert("Pabellon Agregado");
            }
        });
  }

  pabellonChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  resetPabellon = () => {
    this.setState(() => this.initialState);
  }

  updatePabellon = event => {
    event.preventDefault();

    const pabellon = {
      id: this.state.id,
      sala: this.state.sala,
      descripcion: this.state.descripcion,
      estado: this.state.estado,
    };

    pabellonService.updatePabellon(this.state.id, pabellon)
        .then(response => {
            if (response.data != null) {
                this.setState(this.initialState);
                alert("Pabellon Editado");
            }
        });
    }

  render() {

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Agregar Nuevo Pabellon" subtitle="" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg={12} style={{ marginTop: "20px" }}>
            <Card>
              <Card.Header>{this.state.id ? "Editar Pabellon" : "Agregar Nuevo Pabellon"}</Card.Header>
                <Form onReset={this.resetPabellon} onSubmit={this.state.id ? this.updatePabellon : this.submitPabellon} id="pabellonForm">
                  <Card.Body>
                    <Form.Row>
                      <Form.Group controlId="formGridSala">
                        <Form.Label>Sala</Form.Label>
                        <Form.Control required type="text" name="sala" value={this.state.sala} onChange={this.pabellonChange} placeholder="Número de Sala" />
                      </Form.Group>

                      <Form.Group controlId="formGridDescripcion" style={{ marginLeft: "10px" }}>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control required type="text" name="descripcion" value={this.state.descripcion} onChange={this.pabellonChange} placeholder="descripcion" />
                      </Form.Group>
                      </Form.Row>
                        <Form.Row>
                          <Form.Group controlId="formGridEstado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control required type="text" name="estado" value={this.state.estado} onChange={this.pabellonChange} placeholder="Libre/Ocupado" />
                          </Form.Group>
                        </Form.Row>
                        </Card.Body>
                          <Card.Footer>
                            <Button variant="success" type="submit">
                              {this.state.id ? "Update" : "Submit"}
                            </Button>{' '}
                            <Button variant="info" type="reset">
                              Reset
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

export default PabellonForm;
