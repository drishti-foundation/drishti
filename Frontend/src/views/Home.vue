<template>
  <div class="about">
    <account-details :show="isLoggedin && showAuth" @close="showAuth = false" />
    <login-sign-up :show="!isLoggedin && showAuth" @close="showAuth = false" />
    <nav :class="`nav-bar absolute-nav ${showNav ? '-show' : '-hide'}`" :aria-hidden="!showNav">
      <div class="img-wrapper">
        <img src="@/assets/drishti.png" alt="drishti logo" />
      </div>
      <div class="btn-wrapper">
        <router-link
          class="gbtn"
          to="/demo"
          aria-label="Translate Now"
          :tabIndex="showNav ? 0 : -1"
        >
          Translate Now
        </router-link>
        <button class="gbtn" @click="showAuth = true">
          {{ isLoggedin ? username : 'Login' }}
        </button>
      </div>
    </nav>
    <header class="banner" ref="banner">
      <img src="@/assets/banner.jpg" alt="blind child in a field" />
      <div class="center">
        <h1>Drishti</h1>
        <router-link class="btn" to="/demo" aria-label="Translate Now" title="Translate Now">
          Translate Now
        </router-link>
      </div>
    </header>
    <main class="content">
      <animate-into-view type="ul" class="stats">
        <info-card icon="well" title="60%" subtext="of people live in rural India." />
        <info-card
          icon="blind"
          title="22%"
          subtext="of all blind people in the world reside in rural India."
        />
        <info-card icon="knowledge" title="10%" subtext="of Indians are literate in English." />
      </animate-into-view>
      <animate-into-view type="section" class="text-block">
        <p class="paragraph">
          Most of India&apos;s visually impaired live in rural India. Almost all of them do not have
          access to quality education in their own language.
        </p>
        <h2>This is where we come in.</h2>
        <p class="paragraph">
          With Drishti, we aim to empower the visually impaired population with the gift of
          knowledge. Our software uses the Bharati Braille convention to translate online books and
          PDFs to indigeous braille. In this way <span class="highlight">Drishti</span>
          empowers the visually impaired to read in their own language.
        </p>
      </animate-into-view>
      <animate-into-view type="section" class="text-block gradient demo-section">
        <h1>How to use.</h1>
        <div class="demo-wrapper">
          <animate-into-view type="div" class="demo-img-wrapper">
            <img src="@/assets/demo0.png" alt="basic page layout" class="demo-img" />
          </animate-into-view>
          <animate-into-view type="div" class="demo-img-wrapper">
            <img
              src="@/assets/demo1.png"
              alt="uploading file by clicking on center of the screen, and send for processing"
              class="demo-img"
            />
          </animate-into-view>
          <animate-into-view type="div" class="demo-img-wrapper">
            <img src="@/assets/demo2.png" alt="download translated pdf" class="demo-img" />
          </animate-into-view>
          <router-link class="gbtn" to="/demo" aria-label="Translate Now">
            Translate Now
          </router-link>
        </div>
      </animate-into-view>
      <animate-into-view type="section" class="text-block">
        <h1>About Us.</h1>
        <p class="paragraph">
          We are a group of high school students from National Public School Indiranagar, Bangalore.
          We like to use our passion for Computer Science to help improve the lives of the less
          fortunate.
        </p>
        <br />
        <div class="pic-with-desc paragraph">
          <img
            class="center"
            src="@/assets/presentation.jpg"
            title="Drishti at Revhack"
            alt="Drishti at Revhack"
          />
          <p>
            Revhack, India&apos;s first Language hackathon hosted by Reverie Language Technologies
            and NASSCOM, was centered on building a system for solving problems in Indian Language
            Space. Our project <span class="highlight">Drishti</span> helped us place first and
            bagged ₹1 lakh.
          </p>
        </div>
        <animate-into-view type="ul" class="profile-wrapper">
          <profile-card
            name="Anirudh Chinta"
            role="Founder"
            :imgUrl="require('@/assets/anirudh.png')"
            linkedinUrl="https://www.linkedin.com/in/anirudh-chinta-6082012a7"
            githubUrl="https://github.com/abhinav-chinta"
          />
        </animate-into-view>
      </animate-into-view>
      <animate-into-view type="section" class="text-block gradient">
        <h1>Contact Us.</h1>
        <p class="paragraph">
          If you would like to create an account, to use hindi braille, email us with your details
          and at
          <span class="email">mail.drishtifoundation@gmail.com</span> or click the link below!
        </p>
        <button class="gbtn contact-btn" aria-label="Email us">
          <a href="mailto:mail.drishtifoundation@gmail.com" title="Contact Us">
            Contact Us
          </a>
        </button>
      </animate-into-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

import AccountDetails from '@/components/AccountDetails.vue';
import AnimateIntoView from '@/components/AnimateIntoView.vue';
import InfoCard from '@/components/InfoCard.vue';
import LoginSignUp from '@/components/LoginSignUp.vue';
import ProfileCard from '@/components/ProfileCard.vue';

interface CData {
  showNav: boolean;
  showAuth: boolean;
  observer: IntersectionObserver | null;
}

interface CComputed {
  username: string | null;
  isLoggedin: boolean;
}

export default Vue.extend<CData, {}, CComputed>({
  name: 'home',
  data: () => ({
    showNav: false,
    showAuth: false,
    observer: null,
  }),
  computed: {
    ...mapGetters(['isLoggedin']),
    ...mapState(['username']),
  },
  mounted() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.showNav = entry.intersectionRatio < 0.1;
      },
      { threshold: 0.1 }
    );

    if (this.$refs.banner) {
      this.observer.observe(this.$refs.banner as Element);
    }
  },
  beforeDestroy() {
    // eslint-disable-next-line no-unused-expressions
    this.observer?.disconnect();
  },
  components: {
    AccountDetails,
    AnimateIntoView,
    InfoCard,
    LoginSignUp,
    ProfileCard,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

$max-width: 70vw;

.img-wrapper {
  @include flex-box;

  height: 6rem;
}

.banner {
  width: 100%;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    user-select: none;
  }

  .center {
    @include flex-box($dir: column);

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    h1 {
      font-size: 16vh;
      color: white;
      font-weight: 700;
      text-shadow: 2px 5px #00000010, -2px -5px #00000010;
      opacity: 0;

      animation: fade-down $animdur cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
    }

    .btn {
      opacity: 0;
      animation: fade-down $animdur cubic-bezier(0.215, 0.61, 0.355, 1) $animdelay forwards;
    }
  }
}

.content {
  position: relative;
}

.stats {
  @include flex-box($just: space-around);

  padding: 3rem 0;
  padding-top: 6rem;
  width: 100vw;
  overflow: visible;

  &.-hide {
    .card {
      opacity: 0;
      transform: translateY(-$animtrans);
    }
  }
  &.-show {
    .card {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.paragraph {
  font-size: 1.6rem;
  margin: 3rem auto;
  max-width: $max-width;
  overflow: visible;
}

.demo-wrapper {
  @include flex-box($dir: column);

  margin: 0 auto;
  padding-top: 1rem;
  max-width: $max-width;
}

.big {
  font-size: 2.1rem;
}

h2 {
  font-size: 4rem;
  max-width: $max-width;
  margin: 0 auto;
}

h1 {
  transition: opacity 0.3s linear, transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);

  font-size: 5.5rem;
  color: currentColor;
  max-width: $max-width;
  margin: 0 auto;
}

.highlight {
  color: $lightbg;
  font-weight: 600;
}

.text-block {
  padding: 3.4rem 0;
  width: 100vw;
  color: #333333;
  width: 100%;

  &.-show {
    * {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  &.-hide {
    * {
      opacity: 0;
      transform: translateY(-$animtrans);
    }
  }

  * {
    @for $i from 0 to 100 {
      &:nth-child(#{$i + 1}) {
        transition: opacity $animdur linear $animdelay * $i,
          transform $animdur cubic-bezier(0.215, 0.61, 0.355, 1) $animdelay * $i;
      }
    }
  }
}

.gradient {
  background: $gradient;
  color: white;
}

.email {
  font-weight: 600;
}

.demo-img-wrapper {
  transition: 0.3s;

  &.-hide {
    opacity: 0;
    transform: translateY(-$animtrans);
  }
  &.-show {
    opacity: 1;
    transform: translateY(0);
  }
}

.demo-img {
  max-height: 75vh;
  max-width: 70vw;
}

ul {
  overflow: visible;
}

.pic-with-desc {
  @include flex-box;

  margin: 3rem auto;

  * {
    flex: 1;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  p {
    margin: 3rem;
    margin-right: 0;
    font-size: 1.3rem;
  }
}

.profile-wrapper {
  font-size: 1.6rem;
  margin: 3rem auto;
  max-width: $max-width;
  overflow: visible;

  &.-hide {
    .profile {
      opacity: 0;
      transform: translateY(-$animtrans);
    }
  }
  &.-show {
    .profile {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.contact-btn {
  margin: 1.3rem 0;
  position: relative;
  left: 15vw;
  margin-bottom: 3rem;

  a {
    color: white;
  }
}

@media screen and (max-width: 750px) {
  .banner {
    height: 50vh;
    img {
      height: 50vh;
      object-fit: cover;
    }

    .center {
      h1 {
        font-size: 20vw;
      }

      .btn {
        margin: 0;
        font-size: 1rem;
      }
    }
  }

  .reverse {
    flex-direction: column-reverse;
  }

  .content {
    &:last-child {
      padding-bottom: 5vh;
    }

    div {
      flex-direction: column;

      img {
        width: 100%;
      }
    }
  }

  .text-block {
    padding: 2rem;
  }

  .paragraph {
    overflow: visible;
    font-size: 1.1rem;
    margin: 1.7rem auto;
  }

  .pic-with-desc {
    flex-direction: column;
    overflow: visible;
    margin-bottom: 0;

    img {
      width: 100vw;
    }

    p {
      margin: 2rem 0;
      font-size: 1.1rem;
    }
  }

  .stats {
    flex-direction: column;
    height: 165vh;
    padding-bottom: 0;
    padding-top: 3rem;
  }

  h2 {
    font-size: 2rem;
  }
  h1 {
    font-size: 3rem;
  }

  .demo-section {
    padding: 2rem 1rem;
  }
  .demo-wrapper {
    max-width: 100vw;

    .demo-img {
      max-width: 100%;
    }
  }

  .email {
    max-width: 70vw;
    overflow-wrap: break-word;
  }

  .contact-btn {
    left: calc(15vw - 2rem);
  }
}
</style>
