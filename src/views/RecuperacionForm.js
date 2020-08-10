import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


import PageTitle from "../components/common/PageTitle";
import recuperacionService from "../services/recuperacion.service";

class RecuperacionForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.recuperacionChange = this.recuperacionChange.bind(this);
    this.submitRecuperacion = this.submitRecuperacion.bind(this);
  }

  initialState = { id: '', piso: '', numero: '', camas: []}
  componentDidMount() {
    const recuperacionId = +this.props.match.params.id;
    if (recuperacionId) {
        recuperacionService.show(recuperacionId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        piso: response.data.piso,
                        numero: response.data.numero,
                        camas: response.data.camas,
                    });
                }
            }).catch((error) => {
                console.error("Error " + error);
            });
    }
  }

  submitRecuperacion = event => {
    alert('Piso: ' + this.state.piso + '\nnumero ' + this.state.numero);
    event.preventDefault();

    const recuperacion = {
        id: this.state.id,
        piso: this.state.piso,
        numero: this.state.numero,
        camas: this.state.camas,
    };

    recuperacionService.createRecuperacion(recuperacion)
        .then(response => {
            if (response.data != null) {
                this.setState(this.initialState);
                alert("Sala de Recuperación Agregado");
            }
        });
  }

  recuperacionChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  resetRecuperacion = () => {
    this.setState(() => this.initialState);
  }

  updateRecuperacion = event => {
    event.preventDefault();

    const recuperacion = {
      id: this.state.id,
      piso: this.state.piso,
      numero: this.state.numero,
      camas: this.state.camas,
    };

    recuperacionService.updateRecuperacion(this.state.id, recuperacion)
        .then(response => {
            if (response.data != null) {
                this.setState(this.initialState);
                alert("Recuperacion Editado");
            }
        });
    }

  render() {

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Agregar Nueva Sala de Recuperacion" subtitle="" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg={12} style={{ marginTop: "20px" }}>
            <Card>
              <Card.Header>{this.state.id ? "Editar Sala Recuperacion" : "Agregar Nueva Sala de Recuperacion"}</Card.Header>
                <Form onReset={this.resetRecuperacion} onSubmit={this.state.id ? this.updateRecuperacion : this.submitRecuperacion} id="recuperacionForm">
                  <Card.Body>
                    <Form.Row>
                      <Form.Group controlId="formGridpiso">
                        <Form.Label>Piso</Form.Label>
                        <Form.Control required type="text" name="piso" value={this.state.piso} onChange={this.recuperacionChange} placeholder="Número de piso" />
                      </Form.Group>

                      <Form.Group controlId="formGridnumero" style={{ marginLeft: "10px" }}>
                        <Form.Label>Número de Sala</Form.Label>
                        <Form.Control required type="text" name="numero" value={this.state.numero} onChange={this.recuperacionChange} placeholder="Número" />
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

export default RecuperacionForm;
