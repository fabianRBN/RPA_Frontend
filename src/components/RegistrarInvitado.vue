<template>
  <form novalidate @submit.prevent="validateUser">
    <md-card>
      <md-card-header>
        <div class="md-title">Registrar Invitado</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
       

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('correo')">
              <label for="correo">correo</label>
              <md-input
                type="correo"
                name="correo"
                id="correo"
                autocomplete="correo"
                v-model="form.correo"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.correo.required">The correo is required</span>
              <span class="md-error" v-else-if="!$v.form.correo.correo">Invalid correo</span>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('nombre')">
              <label for="first-name">Nombres</label>
              <md-input
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                v-model="form.nombre"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.nombre.required">El nombre es requerido</span>
              <span class="md-error" v-else-if="!$v.form.nombre.minlength">Nombre no valido</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('apellido')">
              <label for="last-name">Apellidos</label>
              <md-input
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="form.apellido"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.apellido.required">El apellido es requerido</span>
              <span class="md-error" v-else-if="!$v.form.apellido.minlength">Apellido invalido</span>
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('empresa')">
              <label for="last-name">Empresa</label>
              <md-input
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="form.empresa"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.empresa.required">El empresa es requerido</span>
              <!--                 <span class="md-error" v-else-if="!$v.form.empresa.minlength">Empresa no valida</span>
              -->
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('cargo')">
              <label for="last-name">Cargo</label>
              <md-input
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="form.cargo"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.cargo.required">El cargo es requerido</span>
              <span class="md-error" v-else-if="!$v.form.cargo.minlength">Cargo no valida</span>
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('movil')">
              <label for="first-name">movil</label>
              <md-input
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                v-model="form.movil"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.movil.required">El movil es requerido</span>
              <span class="md-error" v-else-if="!$v.form.movil.minlength">movil no valido</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="personal">Personal</label>
              <md-select
                v-model="seleccionado"
                name="personal"
                id="personal"
                :placeholder="form.personal">
                <md-option
                  v-for="item in personal"
                  :key="item.cedula"
                  :value="item.nombre + ' ' + item.apellido"
                >{{item.nombre + '' + item.apellido}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">

           <div class="md-layout-item md-small-size-100">
         
              <md-field>
                    <label for="personal">Descuento</label>
                    <md-select
                      v-model="descuento"
                      name="descuento"
                      id="descuento"
                      :placeholder="form.descuento">
                      <md-option value="0">0%</md-option>
                      <md-option value="20">20%</md-option>
                      <md-option value="40">40%</md-option>
                      <md-option value="50">50%</md-option>
                      <md-option value="100">100%</md-option>
                    </md-select>
                  </md-field>
              
          </div>

          <!-- <div class="md-layout-item md-small-size-100">
     
              <label for="first-name">Descuento de: {{descuento}} %</label>
              
              <input
                name="first-name"
                id="first-name"
                v-model="descuento"
                type="range"
                value="35" min="0" max="100" autocomplete="off"
              />
        
          </div> -->
         <!--  <div class="md-layout-item md-small-size-100">
           <md-field >
              <label for="first-name">Precio Final : {{descuento}} %</label>
              
            </md-field>
          </div> -->
        </div>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>

        <md-button type="submit" class="md-raised md-primary" :disabled="sending">{{textButton}} Invitado</md-button>
        <md-button type="button" class="md-raised md-accent" v-if="textButton !='Crear'" @click="activeDialogoEliminar = true">Eliminar Invitado</md-button>
        <md-button type="button" class="md-raised md-default" v-if="textButton !='Crear'"  @click="cerrarModal">Cerrar</md-button>

      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="userSaved">El invitado {{ lastUser }} fue registrado exitosamente!</md-snackbar>

     <md-dialog-confirm
      :md-active.sync="activeDialogoEliminar"
      md-title="Confirmación"
      md-content="Desea eliminar al invitado"
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { hostname } from "os";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "registrar-invitado",
  mixins: [validationMixin],
  props: ["itemInvitado", "accion","showDialog"],
  data: function() {
    return {
      form: {

        nombre: null,
        apellido: null,
        movil: null,
        empresa: null,
        cargo: null,
        correo: null,
        personal: null,
        descuento: null
      },
      activeDialogoEliminar: false,
      userSaved: false,
      sending: false,
      lastUser: null,
      textButton: this.accion ? "Editar" : "Crear",
      personal: [],
      seleccionado: "",
      descuento:'',
      show: this.showDialog
    };
  },
  validations: {
    form: {
      cedula: {
        
      },
      nombre: {
        required,
        minLength: minLength(2)
      },
      apellido: {
        required,
        minLength: minLength(3)
      },
      movil: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(10)
      },
      empresa: {
        required
      },
      cargo: {
        required
      },
      correo: {
        required,
        email
      }
    }
  },
  methods: {
    onChangeSelected(event) {
      this.seleccionado = event.target.value;
    },
    getValidationClass(nombre) {
      const field = this.$v.form[nombre];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    clearForm() {
      this.$v.$reset();
      this.form.cedula = null;
      this.form.nombre = null;
      this.form.apellido = null;
      this.form.empresa = null;
      this.form.correo = null;
      this.form.cargo = null;
      this.form.movil = null;
      this.form.personal = null;
      this.form.descuento = null;
    },
    getPersonal() {
      axios
        .get("http://" + hostname() + ":3000/personal/")
        .then(response => {
          this.personal = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveUser() {
     
      this.sending = true;
      axios
        .post("http://" + hostname() + ":3000/createInvitado", this.form)
        .then(() => {
          console.log("ok");
          window.setTimeout(() => {
            this.lastUser = `${this.form.nombre} ${this.form.lastName}`;
            this.userSaved = true;
            this.sending = false;
           /*  this.clearForm(); */
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
      // Instead of this timeout, here you can call your API
    },
    editInvitado() {
      this.sending = true;
    /*    if(this.form.descuento != this.descuento){
         this.form.descuento = this.descuento 
      } 
 */
      console.log(this.form.descuento)
      
      
      console.log(this.form)
      axios
        .post("http://" + hostname() + ":3000/editarDatosInvitado", this.form)
        .then(() => {
          window.setTimeout(() => {
            this.lastUser = `${this.form.nombre} ${this.form.lastName}`;
         
            this.userSaved = true;
            this.sending = false;
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    },
    validateUser() {
      this.$v.$touch();

      (this.seleccionado != '')?this.form.personal = this.seleccionado: this.form.personal =this.form.personal;
      (this.descuento != '')?this.form.descuento = this.descuento:this.form.descuento = this.form.descuento ;
      if (!this.$v.$invalid) {
        if (this.accion) {
          this.editInvitado();
        } else {
          this.saveUser();
        }
      }
    }
    ,
    onCancel(){

    },
    onConfirm(){
         axios
        .post("http://" + hostname() + ":3000/eliminarInvitado", this.form)
        .then((data) => {
          if(data.data.status){
            location.reload()
          }
          
        })
        .catch(error => {
          console.log(error);
        });
    },

    cerrarModal(){
       this.$emit("CerrarModal");
    }
  },
  created() {
    this.getPersonal();

    if (this.itemInvitado && this.accion) {
      this.form = this.itemInvitado;
    }
    if (!this.accion) {
      this.clearForm();
    }
  }
};
</script>

<style >
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.select {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  position: relative;
  width: 350px;
}

.select-text {
  position: relative;
  font-family: inherit;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.87);
  width: 100%;
  font-size: 18px;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

/* Remove focus */
.select-text:focus {
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
}

/* Use custom arrow */
.select .select-text {
  appearance: none;
  -webkit-appearance: none;
}

.select:after {
  position: absolute;
  top: 18px;
  right: 10px;
  /* Styling the down arrow */
  width: 0;
  height: 0;
  padding: 0;
  content: "";
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(0, 0, 0, 0.12);
  pointer-events: none;
}

/* LABEL ======================================= */
.select-label {
  color: rgba(0, 0, 0, 0.26);
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 10px;
  transition: 0.2s ease all;
}

/* active state */
.select-text:focus ~ .select-label,
.select-text:valid ~ .select-label {
  color: #2f80ed;
  top: -20px;
  transition: 0.2s ease all;
  font-size: 14px;
}

/* BOTTOM BARS ================================= */
.select-bar {
  position: relative;
  display: block;
}

.select-bar:before,
.select-bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #2f80ed;
  transition: 0.2s ease all;
}

.select-bar:before {
  left: 50%;
}

.select-bar:after {
  right: 50%;
}

/* HIGHLIGHTER ================================== */
.select-highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}



.inputDiv {
  width: 250px;
  margin: 100px auto;
  position: relative;
}

input[type='range'] {
  display: block;
  width: 100%;
  margin-top: 20px;
}

input[type='range']:focus {
  outline: none;
}

input[type='range'],
input[type='range']::-webkit-slider-runnable-track,
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]::-webkit-slider-thumb {
  background-color: #777;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  margin-top: -9px;
}

input[type=range]::-moz-range-thumb {
  background-color: #777;
  width: 15px;
  height: 15px;
  border: 3px solid #333;
  border-radius: 50%;
}

input[type=range]::-ms-thumb {
  background-color: #777;
  width: 20px;
  height: 20px;
  border: 3px solid #333;
  border-radius: 50%;
}

input[type=range]::-webkit-slider-runnable-track {
  background-color: #777;
  height: 3px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  outline: none;
}

input[type=range]::-moz-range-track {
  background-color: #777;
  height: 3px;
}

input[type=range]::-ms-track {
  background-color: #777;
  height: 3px;
}

input[type=range]::-ms-fill-lower {
  background-color: HotPink
}

input[type=range]::-ms-fill-upper {
  background-color: black;
} 
.md-default{
  background: #848484;
    color: white;
}

</style>