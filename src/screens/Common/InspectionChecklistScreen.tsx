import React, { useState } from 'react';
import { FormContainer, Row, Label, Input, Button, CheckboxContainer, Textarea } from './EquipmentChecklistScreen.styles';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const InspectionForm = ({ route , navigation }: NativeStackScreenProps<RootStackParamList, 'Inspection'>) => {
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
      <h2>Check List “Mensual Equipos” Comercializadora Ltda.</h2>

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


      <h3>Documentación Camión/Conductor</h3>

      <Row>
        <Label>Permiso de circulación al día</Label>
        <CheckboxContainer>
          <Input type="radio" name="circulacion" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="circulacion" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_circulacion" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Seguro obligatorio</Label>
        <CheckboxContainer>
          <Input type="radio" name="seguro" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="seguro" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_seguro" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Revisión Técnica</Label>
        <CheckboxContainer>
          <Input type="radio" name="revision" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="revision" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_revision" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Licencia de conducir</Label>
        <CheckboxContainer>
          <Input type="radio" name="licencia" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="licencia" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_licencia" placeholder="(Observaciones) Tipo:" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Curso transporte de sustancias peligrosas</Label>
        <CheckboxContainer>
          <Input type="radio" name="cursoTransporte" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="cursoTransporte" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_cursoTransporte" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <h3>Kit Derrame</h3>

      <Row>
        <Label>¿El camión posee Pala?</Label>
        <CheckboxContainer>
          <Input type="radio" name="pala" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="pala" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_pala" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Material Absorbente?</Label>
        <CheckboxContainer>
          <Input type="radio" name="absorbente" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="absorbente" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_absorbente" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Cubeta?</Label>
        <CheckboxContainer>
          <Input type="radio" name="cubeta" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="cubeta" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_cubeta" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Escoba?</Label>
        <CheckboxContainer>
          <Input type="radio" name="escoba" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="escoba" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_escoba" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Bolsas?</Label>
        <CheckboxContainer>
          <Input type="radio" name="bolsas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="bolsas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_bolsas" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

       <h3>Kit invierno</h3>

      <Row>
        <Label>¿El Camión posee Cadenas?</Label>
        <CheckboxContainer>
          <Input type="radio" name="cadenas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="cadenas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_cadenas" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Mantas?</Label>
        <CheckboxContainer>
          <Input type="radio" name="Mantas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="Mantas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_mantas" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Herramientas básicas de instalación?</Label>
        <CheckboxContainer>
          <Input type="radio" name="herramientas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="herramientas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_herramientas" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

       <h3>Kit emergencia</h3>

      <Row>
        <Label>¿El Camión posee Triangulo Reflectante?</Label>
        <CheckboxContainer>
          <Input type="radio" name="triangulo" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="triangulo" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_triangulo" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Gata Hidráulica?</Label>
        <CheckboxContainer>
          <Input type="radio" name="Gata" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="Gata" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_gata" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Neumático de Repuesto?</Label>
        <CheckboxContainer>
          <Input type="radio" name="neumatico" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="neumatico" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_neumatico" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Llaves de Rueda?</Label>
        <CheckboxContainer>
          <Input type="radio" name="llaves" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="llaves" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_llaves" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El camión posee Barra de Llave de Ruedas?</Label>
        <CheckboxContainer>
          <Input type="radio" name="barrallave" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="barrallave" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_barrallaves" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Conos Delimitadores?</Label>
        <CheckboxContainer>
          <Input type="radio" name="conos" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="conos" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_conos" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Extintor?</Label>
        <CheckboxContainer>
          <Input type="radio" name="extintor" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="extintor" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_extintor" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿El Camión posee Chaleco Reflectante?</Label>
        <CheckboxContainer>
          <Input type="radio" name="chaleco" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="extintor" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_extintor" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>
      
      <h3>Kit de sueño</h3>

      <Row>
        <Label>¿Cuenta con Antifaz?</Label>
        <CheckboxContainer>
          <Input type="radio" name="antifaz" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="antifaz" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_antifaz" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿Cuenta con Mantas?</Label>
        <CheckboxContainer>
          <Input type="radio" name="mantas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="mantas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_mantas" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <h3>Elementos/Accesorios</h3>

      <Row>
        <Label>Extintor PQS ____KG</Label>
        <CheckboxContainer>
          <Input type="radio" name="PQS1" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="PQS1" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_PQS1" placeholder="Fecha Mantencion" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Extintor PQS _____KG</Label>
        <CheckboxContainer>
          <Input type="radio" name="PQS2" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="PQS2" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_PQS2" placeholder="Fecha Mantencion" onChange={handleInputChange} />
      </Row>
    
      <Row>
        <Label>¿Cuenta con porta extintor?</Label>
        <CheckboxContainer>
          <Input type="radio" name="PortaExtintor" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="PortaExtintor" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_PortaExtintor" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>    

      <Row>
        <Label>¿Cuenta con Botiquín de Primeros Auxilios?   </Label>
        <CheckboxContainer>
          <Input type="radio" name="botiquin" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="botiquin" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_botiquin" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>    

      <Row>
        <Label>¿Cuenta con cuñas?  </Label>
        <CheckboxContainer>
          <Input type="radio" name="cuñas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="cuñas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_cuñas" placeholder="Cantidad" onChange={handleInputChange} />
      </Row>   

      <Row>
        <Label>¿Cuenta con porta cuñas?  </Label>
        <CheckboxContainer>
          <Input type="radio" name="portacuñas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="portacuñas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_portacuñas" placeholder="Cantidad" onChange={handleInputChange} />
      </Row>   

      <Row>
        <Label>¿Cuenta con Baliza? </Label>
        <CheckboxContainer>
          <Input type="radio" name="baliza" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="baliza" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_baliza" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label>¿Cuenta con Pértiga? </Label>
        <CheckboxContainer>
          <Input type="radio" name="pertiga" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="pertiga" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_pertiga" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label>La Alarma de Retroceso ¿Se encuentra operativa? </Label>
        <CheckboxContainer>
          <Input type="radio" name="alarma" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="alarma" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_alarma" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label> El Sistema de Luces ¿Se encuentra operativa?</Label>
        <CheckboxContainer>
          <Input type="radio" name="alarma" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="alarma" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_alarma" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label> Las Plumillas ¿Se encuentran en buen estado?</Label>
        <CheckboxContainer>
          <Input type="radio" name="plumillas" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="plumillas" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_plumillas" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label> El Neumático de Repuesto ¿Se encuentra en buen estado?</Label>
        <CheckboxContainer>
          <Input type="radio" name="neumaticoestadorepuesto" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="neumaticoestadorepuesto" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_neumaticoestadorespuesto" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label> El Cinturón de Seguridad ¿Se encuentra en buen estado?</Label>
        <CheckboxContainer>
          <Input type="radio" name="cinturon" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="cinturon" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_cinturon" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label> El apoyacabeza de los asientos de la cabina ¿Se encuentra en buen estado?</Label>
        <CheckboxContainer>
          <Input type="radio" name="apoyacabeza" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="apoyacabeza" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_apoyacabeza" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label> Los Neumáticos ¿Se encuentran en buen estado?</Label>
        <CheckboxContainer>
          <Input type="radio" name="neumaticosestado" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="neumaticosestado" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_neumaticoestado" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label>¿Cuenta con Linterna?</Label>
        <CheckboxContainer>
          <Input type="radio" name="linterna" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="linterna" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_linterna" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <h3>Imagen Camión</h3>

      <Row>
        <Label>¿El camión cuenta con Cinta Reflectante Roja/Blanca?</Label>
        <CheckboxContainer>
          <Input type="radio" name="cinta" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="cinta" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_cinta" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>  

      <Row>
        <Label>¿El camión cuenta con la Imagen Corporativa MOBIL-SOEG?</Label>
        <CheckboxContainer>
          <Input type="radio" name="mobil" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="mobil" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_mobil" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>     
      
      <Row>
        <Label>El interior del Camión ¿Se encuentra limpio?</Label>
        <CheckboxContainer>
          <Input type="radio" name="limpieza" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="limpieza" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_limpieza" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>    

      <h3>Plataforma electro hidraulica</h3>

      <Row>
        <Label>La estructura de la plataforma ¿Se encuentra en buen estado? (Sin oxido, deformaciones, etc)</Label>
        <CheckboxContainer>
          <Input type="radio" name="estructuraplataforma" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="estructuraplataforma" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_estructuraplataforma" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>    

      <Row>
        <Label>El sistema hidráulico de la plataforma ¿Se encuentra en buen estado? (sin fugas, etc)</Label>
        <CheckboxContainer>
          <Input type="radio" name="hidraulico" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="hidraulico" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_hidraulico" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label> La plataforma ¿Se encuentra operativa con un funcionamiento correcto?</Label>
        <CheckboxContainer>
          <Input type="radio" name="plataformaoperativa" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="plataformaoperativa" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_plataformaoperativa" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
};

export default InspectionForm;
