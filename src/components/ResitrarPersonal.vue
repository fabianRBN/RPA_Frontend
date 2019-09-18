<template>
  <form novalidate @submit.prevent="validateUser">
    <md-card>
      <md-card-header>
        <div class="md-title">Registrar Personal</div>
      </md-card-header>

      <md-card-content>

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

        
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending">{{textButton}} Personal</md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="userSaved">El personal {{ lastUser }} fue registrado exitosamente!</md-snackbar>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength
} from "vuelidate/lib/validators";
import axios from "axios";
import { hostname } from "os";
export default {
  name: "registrar-personal",
  mixins: [validationMixin],
  props: ["itemInvitado", "accion"],
  data: function() {
    return {
      form: {
       
        nombre: null,
        apellido: null,
        cargo: null,
      
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      textButton: this.accion ? "Editar" : "Crear"
    };
  },
  validations: {
    form: {
      
      nombre: {
        required,
        minLength: minLength(2)
      },
      apellido: {
        required,
        minLength: minLength(3)
      },
      
      cargo: {
        required
      }
    }
  },
  methods: {
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
 
      this.form.nombre = null;
      this.form.apellido = null;
      this.form.cargo = null;
    },
    saveUser() {
      this.sending = true;
      axios
        .post("http://"+ hostname() + ":3000/personal/crear", this.form)
        .then(() => {
          console.log("ok");
          window.setTimeout(() => {
            this.lastUser = `${this.form.nombre} ${this.form.lastName}`;
            this.userSaved = true;
            this.sending = false;
            this.clearForm();
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
      // Instead of this timeout, here you can call your API
    },
    editInvitado() {
      this.sending = true;
      axios
        .post("http://"+ hostname() + ":3000/personal/editar", this.form)
        .then(() => {
            console.log('editando')
          this.$emit("setDataInvitados");
          window.setTimeout(() => {
            this.lastUser = `${this.form.nombre} ${this.form.lastName}`;
            this.userSaved = true;
            this.sending = false;
          }, 500);
        
        })
        .catch(error => {
          console.log(error);
        });
      // Instead of this timeout, here you can call your API
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        if (this.accion) {
          this.editInvitado();
        } else {
          this.saveUser();
        }
      }
    }
  },
  created() {
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
</style>