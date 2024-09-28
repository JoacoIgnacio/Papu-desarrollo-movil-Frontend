import React, { useState } from 'react';
import { FormContainer, Row, Label, Input, Button, CheckboxContainer, Textarea } from './EquipmentChecklistScreen.styles';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

const ChecklistForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    patente: '',
    kilometraje: '',  
    sistemaLuces: '',
    neumaticos: '',
    parabrisas: '',
    carroceria: '',
    niveles: '',
    documentacion: '',
    botiquin: '',
    derrameKit: '',
    emergenciaKit: '',
    inviernoKit: '',
    extintor: '',
    volante: '',
    gps: '',
    rcoApp: '',
    trabaTuercas: '',
    observaciones: {
      sistemaLuces: '',
      neumaticos: '',
      parabrisas: '',
      carroceria: '',
      niveles: '',
      documentacion: '',
      botiquin: '',
      derrameKit: '',
      emergenciaKit: '',
      inviernoKit: '',
      extintor: '',
      volante: '',
      gps: '',
      rcoApp: '',
      trabaTuercas: '',
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name.includes('observaciones')) {
      const key = name.split('_')[1]; 
      setFormData({ ...formData, observaciones: { ...formData.observaciones, [key]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí manejarías el envío del formulario
    console.log(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Check List “Equipos” Comercializadora Ltda.</h2>

      <Row>
        <Label>Nombre</Label>
        <Input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
      </Row>

      <Row>
        <Label>Fecha</Label>
        <Input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Patente</Label>
        <Input type="text" name="patente" value={formData.patente} onChange={handleInputChange} placeholder="Patente del vehículo" />
      </Row>

      <Row>
        <Label>Kilometraje</Label>
        <Input type="number" name="kilometraje" value={formData.kilometraje} onChange={handleInputChange} placeholder="Kilometraje" />
      </Row>

      <h3>Estado General</h3>

      <Row>
        <Label>Sistema de Luces</Label>
        <CheckboxContainer>
          <Input type="radio" name="sistemaLuces" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="sistemaLuces" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_sistemaLuces" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Los Neumáticos</Label>
        <CheckboxContainer>
          <Input type="radio" name="neumaticos" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="neumaticos" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_neumaticos" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>El Parabrisas</Label>
        <CheckboxContainer>
          <Input type="radio" name="parabrisas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="parabrisas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_parabrisas" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>La Carrocería</Label>
        <CheckboxContainer>
          <Input type="radio" name="carroceria" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="carroceria" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_carroceria" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿Reviso niveles de agua y aceite?</Label>
        <CheckboxContainer>
          <Input type="radio" name="niveles" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="niveles" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_niveles" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <h3>Accesorios/Documentaciones</h3>

      <Row>
        <Label>¿Se encuentra al día la documentación del vehículo? (Seguro, Permiso, Revisión Técnica,etc.)</Label>
        <CheckboxContainer>
          <Input type="radio" name="documentacion" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="documentacion" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_documentacion" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Cuenta con botiquín de Primeros Auxilios</Label>
        <CheckboxContainer>
          <Input type="radio" name="botiquin" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="botiquin" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_botiquin" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Cuenta con Kit de Derrame (Pala, arena absorbente, cubeta, escoba, bolsas)</Label>
        <CheckboxContainer>
          <Input type="radio" name="derrameKit" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="derrameKit" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_derrameKit" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Cuenta con Kit de Emergencias (Triangulo reflectante, gata hidráulica, neumático de repuesto, llaves de rueda, conos, extintor, chaleco reflectante)</Label>
        <CheckboxContainer>
          <Input type="radio" name="emergenciaKit" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="emergenciaKit" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_emergenciaKit" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Cuenta con Kit de Invierno (Cadenas, manta, herramientas básicas para la instalación.)</Label>
        <CheckboxContainer>
          <Input type="radio" name="inviernoKit" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="inviernoKit" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_inviernoKit" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>El Extintor ¿Se encuentra operativo?</Label>
        <CheckboxContainer>
          <Input type="radio" name="extintor" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="extintor" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_extintor" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿Cuenta con el “volante” para la manipulación de tambores?</Label>
        <CheckboxContainer>
          <Input type="radio" name="volante" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="volante" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_volante" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>GPS ¿Se encuentra operativo?</Label>
        <CheckboxContainer>
          <Input type="radio" name="gps" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="gps" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_gps" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Se encuentra conectado a la aplicación RCO</Label>
        <CheckboxContainer>
          <Input type="radio" name="rcoApp" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="rcoApp" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_rcoApp" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Su camión cuenta con traba tuercas</Label>
        <CheckboxContainer>
          <Input type="radio" name="trabaTuercas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="trabaTuercas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_trabaTuercas" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>
      
      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
};

export default ChecklistForm;
