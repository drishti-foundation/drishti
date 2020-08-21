<template>
  <li class="profile">
    <div class="profile-pic">
      <img :src="imgUrl" :alt="imgAlt" :title="name" />
    </div>
    <div class="profile-main">
      <h6>{{ name }}</h6>
      <p>{{ role }}</p>
    </div>
    <div class="profile-links">
      <a
        :href="linkedinUrl"
        target="_blank"
        rel="noreferrer"
        class="linkedin-icon"
        :title="`${name}'s Linked-In`"
      >
        Linkedin
      </a>
      <a
        :href="githubUrl"
        target="_blank"
        rel="noreferrer"
        class="github-icon"
        :title="`${name}'s GitHub`"
      >
        GitHub
      </a>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';

interface CComputed {
  imgAlt: string;
}

interface CProps {
  imgUrl: string;
  name: string;
  role: string;
  githubUrl: string;
  linkedinUrl: string;
}

export default Vue.extend<{}, {}, CComputed, CProps>({
  name: 'profile-card',
  props: {
    imgUrl: String,
    name: String,
    role: String,
    githubUrl: String,
    linkedinUrl: String,
  },
  computed: {
    imgAlt() {
      return `${this.name}, ${this.role} of Drishti`;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.profile {
  @include flex-box;

  @for $i from 0 to 5 {
    &:nth-child(#{$i + 1}) {
      transition: opacity $animdur linear $animdelay * $i,
        transform $animdur cubic-bezier(0.215, 0.61, 0.355, 1) $animdelay * $i;
    }
  }

  padding: 1.2rem 2.5rem;
  box-shadow: 0.4rem 0.6rem 0.8rem #0000001a;
  border-radius: 1rem;
  margin: 4rem 0;
  background: $lbg;

  h6 {
    font-size: 1.6rem;
  }

  &-pic {
    @include flex-box;
    flex: 1;

    img {
      width: 5.5rem;
      height: 5.5rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &-main {
    flex: 6;
    padding: 0 2rem;

    p {
      font-size: 1.1rem;
      color: #555555;
    }
  }

  &-links {
    @include flex-box($just: space-around);
    flex: 1;
  }
}

@media screen and (max-width: 750px) {
  .profile {
    flex-direction: column;
    padding: 2.5rem 0;
    margin: 2.5rem 0;

    &-main {
      margin: 2rem 0;
      text-align: center;
    }

    &-links {
      width: 5rem;
    }
  }
}
</style>
