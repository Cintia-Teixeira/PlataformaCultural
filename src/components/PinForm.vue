<template>
  <div class="box">
    <div class="input-content">
      <h4 class="title-3 bolder">
        Adicione um novo pin no mapa
      </h4>
      <!-- pin name -->
      <div class="column mg-top16">
        <span class="subheading-2">Nome do pin*</span>
        <q-input
          v-model="title"
          class="input"
          dense
          input-class="text-black"
          color="black"
          maxlength="90"
          required
          :error="$v.title.$error"
          :error-message="titleErrorMessage"
          @blur="$v.title.$touch"
        />
      </div>

      <!-- category -->
      <div class="column mg-top8">
        <span class="subheading-2">Categoria*</span>
        <q-select
          v-model="categoryId"
          option-value="id"
          option-label="label"
          map-options
          emit-value
          class="input"
          square
          dense
          :options="categories"
          options-dense
          options-selected-class
          color="black"
          :error="$v.categoryId.$error"
          :error-message="categoryErrorMessage"
          @blur="$v.categoryId.$touch"
          @input="
            category = $store.getters['categories/getCategoryById'](categoryId)
          "
        >
          <template #selected>
            <span class="caption bold">{{ category.label }}</span>
          </template>
        </q-select>
      </div>

      <!-- number & cep -->
      <div class="row justify-between mg-top8">
        <div class="column">
          <span class="subheading-2">CEP*</span>
          <q-input
            v-model="cep"
            class="input"
            dense
            mask="##.###-###"
            unmasked-value
            input-class="text-black"
            color="black"
            :error="$v.cep.$error"
            :error-message="cepErrorMessage"
            @blur="$v.cep.$touch"
          />
        </div>

        <div class="column">
          <span class="subheading-2">Número</span>
          <q-input
            v-model="number"
            class="input"
            dense
            mask="########"
            input-class="text-black"
            color="black"
            :error="$v.number.$error"
            :error-message="numberErrorMessage"
            @blur="$v.number.$touch"
          />
        </div>
      </div>

      <!-- address -->
      <div class="column mg-top8">
        <span class="subheading-2">Rua - logradouro*</span>
        <q-input
          v-model="street"
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error="$v.street.$error"
          :error-message="streetErrorMessage"
          @blur="$v.street.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Bairro*</span>
        <q-input
          v-model="neighborhood"
          class="input"
          dense
          input-class="text-black"
          color="black"
          :error="$v.neighborhood.$error"
          :error-message="neighborhoodErrorMessage"
          @blur="$v.neighborhood.$touch"
        />
      </div>

      <!-- description -->
      <div class="column mg-top8">
        <span class="subheading-2">Descrição*</span>
        <q-input
          v-model="description"
          autogrow
          dense
          hint="Máximo 200 caracteres"
          input-class="text-black"
          color="black"
          :rules="[(val) => val.length <= 200 || 'Máximo de 200 caracteres']"
          :error="$v.description.$error"
          :error-message="descriptionErrorMessage"
          @blur="$v.description.$touch"
        />
      </div>

      <!-- email -->
      <div class="column mg-top8">
        <span class="subheading-2">Email</span>
        <q-input
          v-model="email"
          class="input"
          dense
          type="email"
          input-class="text-black"
          color="black"
          :error="$v.email.$error"
          :error-message="emailErrorMessage"
          @blur="$v.email.$touch"
        />
      </div>

      <!-- links -->
      <div class="column mg-top8">
        <span class="subheading-2">Link</span>
        <q-input
          v-model="link"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error-message="linkErrorMessage"
          :error="$v.link.$error"
          @blur="$v.link.$touch"
        />
      </div>

      <!-- phone -->
      <div class="column mg-top8">
        <span class="subheading-2">WhatsApp</span>
        <q-input
          v-model="phone"
          class="input"
          dense
          mask="(##) #### - #####"
          unmasked-value
          color="black"
          :error="$v.phone.$error"
          :error-message="phoneErrorMessage"
          @blur="$v.phone.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Facebook</span>
        <q-input
          v-model="facebook"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error-message="facebookErrorMessage"
          :error="$v.facebook.$error"
          @blur="$v.facebook.$touch"
        />
      </div>

      <div class="column mg-top8">
        <span class="subheading-2">Instagram</span>
        <q-input
          v-model="instagram"
          class="input f-size"
          dense
          input-class="text-black"
          color="black"
          :error="$v.instagram.$error"
          :error-message="instagramErrorMessage"
          @blur="$v.instagram.$touch"
        />
      </div>

      <!-- file picker -->
      <div class="column mg-top8">
        <span class="subheading-2">Insira uma imagem</span>
        <q-file
          :value="files"
          class="input"
          dense
          square
          counter
          use-chips
          multiple
          :max-files="3"
          accept=".jpg,.jpeg,.png,.gif"
          max-file-size="2097152"
          :error-message="filesErrorMessage"
          :error="$v.files.$error"
          @blur="$v.files.$touch"
          @input="updateFiles"
        >
          <template #append>
            <q-icon
              v-if="files !== null"
              name="close"
              class="cursor-pointer"
              @click.stop="files = null"
            />
            <q-icon
              name="create_new_folder"
              @click.stop
            />
          </template>
          <template #hint>
            Tamanho máximo de 2MB. Formato JPG.
          </template>
          <!-- <template #after>
            <q-btn
              round
              dense
              flat
              icon="send"
              @click="sendImages"
            />
          </template> -->
        </q-file>
      </div>
    </div>

    <!-- actions edit -->
    <div
      class="mg-top32"
      align="right"
    >
      <q-btn
        outline
        color="black"
        @click="confirmCreate()"
      >
        <span class="caption">Cadastrar</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";
import { required, url, minLength, email, numeric } from "vuelidate/lib/validators";

const { mapFields } = createHelpers({
  getterType: "pins/getField",
  mutationType: "pins/updateField",
});

export default {
  name: "PinProfile",
  components: {},
  props: {
    item: {
      type: Object,
      default: null,
    },
    fetch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      waiting: false,
      valid: true,
      step: 0,
      lastStep: 0,
      active: false,
      files: null,
      file: null,
    };
  },
  validations: {
    categoryId: {
      required,
    },
    title: {
      required,
    },
    email: {
      email,
    },
    phone: {
      minLength: minLength(11),
    },
    street: {
      required,
    },
    number: {
      numeric
    },
    neighborhood: {
      required,
    },
    city: {},
    cep: {
      required,
      minLength: minLength(8),
    },
    description: {
      required,
    },
    link: {
      url,
    },
    facebook: {
      url,
    },
    instagram: {
      url,
    },
    twitter: {
      url,
    },
    whatsapp: {},
    files: {},
  },
  computed: {
    ...mapGetters({
      categories: "categories/loadCategories",
    }),
    ...mapFields({
      category: "categorySelected",
      categoryId: "pinForm.categoryId",
      title: "pinForm.title",
      email: "pinForm.email",
      phone: "pinForm.phone",
      street: "pinForm.street",
      number: "pinForm.number",
      neighborhood: "pinForm.neighborhood",
      city: "pinForm.city",
      cep: "pinForm.zipcode",
      description: "pinForm.description",
      images: "pinForm.imageIds",
      link: "pinForm.link",
      facebook: "pinForm.facebook",
      instagram: "pinForm.instagram",
      twitter: "pinForm.twitter",
      whatsapp: "pinForm.whatsapp",
    }),
    categoryErrorMessage() {
      if (!this.$v.categoryId.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    titleErrorMessage() {
      if (!this.$v.title.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    emailErrorMessage() {
      if (!this.$v.email.email) {
        return "Entre com um email válido";
      }
      return "";
    },
    phoneErrorMessage() {
      if (!this.$v.phone.minLength) {
        return "Entre com um telefone válido";
      }
      return "";
    },
    streetErrorMessage() {
      if (!this.$v.street.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    numberErrorMessage() {
      return "";
    },
    neighborhoodErrorMessage() {
      if (!this.$v.neighborhood.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    cityErrorMessage() {
      if (!this.$v.city.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    cepErrorMessage() {
      if (!this.$v.cep.required) {
        return "Esse campo é obrigatório";
      } else if (!this.$v.cep.minLength) {
        return "Entre com um cep válido";
      }
      return "";
    },
    descriptionErrorMessage() {
      if (!this.$v.description.required) {
        return "Esse campo é obrigatório";
      }
      return "";
    },
    linkErrorMessage() {
      if (!this.$v.link.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    facebookErrorMessage() {
      if (!this.$v.facebook.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    instagramErrorMessage() {
      if (!this.$v.instagram.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    twitterErrorMessage() {
      if (!this.$v.twitter.url) {
        return "Entre com uma url válida";
      }
      return "";
    },
    whatsappErrorMessage() {
      return "";
    },
    filesErrorMessage() {
      if (!this.$v.files.required) {
        return "É necessário uma imagem.";
      }
      return "";
    },
    // mascara para telefone
    phoneMask() {
      if (this.phone === null || this.phone === undefined) {
        console.log("phone undefined");
        return false;
      }
      let str = "";
      const p = this.phone;
      console.log("p", this.phone);
      const ddd = p.slice(0, 2);
      const prefix = p.slice(2, 7);
      const sufix = p.slice(7, 11);
      str = str.concat(ddd).concat("").concat(prefix).concat(" ").concat(sufix);
      console.log(str);
      return str;
    },
  },
  created() {},
  methods: {
    sendForm() {
      this.$store.dispatch("pins/postPin", { $router: this.$router })
        .then(()=>{
          this.category = '';
          this.categoryId = null;
          this.title = '';
          this.email = '';
          this.phone = '';
          this.street = '';
          this.number = '';
          this.neighborhood = '';
          this.city = '';
          this.cep = '';
          this.description = '';
          this.images = [];
          this.link = '';
          this.facebook = '';
          this.instagram = '';
          this.twitter = '';
          this.whatsapp = '';

          this.$v.$reset()
        });
      this.waiting = false;
    },
    confirmCreate() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        if (this.waiting) {
          this.$q.notify({
            message: "Por favor, aguarde.",
            position: 'top-right',
          });
          return;
        }
        this.waiting = true;

        //se tiver imagens
        if (this.files) {
          this.$store
            .dispatch("images/uploadArray", { files: this.files })
            .then((fileIds) => {
              this.images = fileIds;
              this.sendForm();
            })
            .catch((error) => {
              this.waiting = false;
            });
        }
        //se não tiver imagens
        else {
          this.sendForm();
        }

      } else {
        this.$q.notify({
          message: "Por favor, preencha os campos corretamente.",
          position: 'top-right',
        });
      }
    },
    updateFiles(files) {
      if (Array.isArray(files) === false || files.length === 0) {
        this.files = null;
      }
      else if (Array.isArray(this.files) === true) {
        const diff = this.files.filter((file) => files.indexOf(file) === -1);

        if (diff.length === 1 && this.files.length > 1) {
          this.files = files.slice();
        }
        else if (this.files.length < 3) {
          this.files = diff.concat(files);
        }
      }
      else {
        this.files = files.slice();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.input {
  width: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: -8px;
}

.f-size {
  font-size: 0.9rem;
}

span {
  color: black;
}

.row.justify-between .column {
  width: 48%;
}
</style>
