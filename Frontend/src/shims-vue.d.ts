declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare interface Credentials {
  username: string;
  password: string;
}

declare interface SignUpPayload {
  credentials: Credentials;
  otp: string;
}
