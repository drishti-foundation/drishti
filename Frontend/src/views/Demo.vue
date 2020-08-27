<template>
  <div>
    <div class="nav-bar">
      <router-link class="logo" to="/">
        <svg viewBox="0 0 50 100" class="back">
          <path d="M50 0 L0 50 L50 100" fill="transparent" stroke="white" stroke-width="10" />
        </svg>
        <img src="@/assets/drishti.png" alt="drishti logo" />
      </router-link>
      <div class="btn-wrapper">
        <check-box
          name="English Braille"
          :checked="lang === Language.Eng"
          @click="lang = Language.Eng"
        />
        <check-box
          name="Hindi Braille"
          :checked="lang === Language.Hin"
          :locked="!isLoggedin"
          @click="lang = Language.Hin"
        />
      </div>
    </div>
    <main class="demo">
      <div
        class="file-drop"
        title="Drag and drop or click to upload"
        @click="$refs.input.click()"
        @drop.prevent="addFile($event.dataTransfer.files)"
        @dragover.prevent
      >
        <img src="@/assets/upload.png" alt="Upload a file" />
        <input
          type="file"
          name="file"
          ref="input"
          @input="addFile($event.target.files)"
          style="display: none;"
        />
      </div>
      <p class="file-name">{{ pValue }}</p>
      <button
        aria-label="Submit for translation"
        class="gbtn"
        type="submit"
        @click="convertPDF"
        :disabled="file === null"
      >
        Submit
      </button>
      <p className="file-name">{{ progress }}</p>
      <a v-if="downloadLink.length" download className="gbtn" :href="`/${downloadLink}`">
        Download
      </a>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import CheckBox from '@/components/CheckBox.vue';
import client from '@/store/client';
import Language from '@/constants';

interface CData {
  file: File | null;
  progress: string;
  downloadLink: string;
  lang: Language;
  Language: typeof Language;
}

interface CMethods {
  addFile: (files: File[]) => void;
  convertPDF: () => void;
}

interface CComputed {
  pValue: string;
  isLoggedin: boolean;
}

export default Vue.extend<CData, CMethods, CComputed>({
  name: 'demo',
  data: () => ({
    file: null,
    progress: '',
    downloadLink: '',
    lang: Language.Eng,
    Language,
  }),
  methods: {
    async convertPDF() {
      if (this.file === null) return;

      const data = new FormData();

      data.append('file', this.file);

      this.progress = 'Converting...';

      const { route: downloadRoute } = await client.service('braille').create(data, {
        query: {
          lang: this.lang,
        },
      });

      this.progress = '';
      this.downloadLink = downloadRoute;
    },
    addFile([file]) {
      this.file = file ?? null;
    },
  },
  computed: {
    ...mapGetters(['isLoggedin']),
    pValue() {
      if (this.file) {
        return `Uploaded File: ${this.file.name}`;
      }
      return '';
    },
  },
  components: {
    CheckBox,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.demo {
  @include flex-box($just: flex-start, $dir: column);

  background: $gradient;
  color: white;
  height: var(--vh);
  width: 100vw;
  padding-top: 6rem;

  .gbtn {
    margin: 4vh 0;
  }
}

.file-drop {
  @include flex-box;
  position: relative;
  height: 40vh;
  width: 50vw;
  margin: 5vh auto;
  margin-top: 7vh;
  border: 5px dashed white;
  border-radius: 2vh;
  background-repeat: no-repeat;
  background-position: center;
  user-select: none;

  img {
    height: 30%;
  }

  &:hover {
    cursor: pointer;
  }
}

.file-name {
  font-size: 1.3rem;
}

@media screen and (max-width: 750px) {
  .file-drop {
    width: 70vw;
    height: 25vh;

    img {
      height: 40%;
    }
  }
}
</style>
