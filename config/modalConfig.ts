import { WALLET_ADAPTERS } from "@web3auth/base";

export const modalConfig = {
  [WALLET_ADAPTERS.AUTH]: {
    label: "auth",
    loginMethods: {
      discord: {
        name: "discord",
        showOnModal: false,
      },
      google: {
        name: "google",
        showOnModal: true,
      },
      apple: {
        name: "apple",
        showOnModal: false,
      },
      github: {
        name: "github",
        showOnModal: false,
      },
      facebook: {
        name: "facebook",
        showOnModal: false,
      },
      reddit: {
        name: "reddit",
        showOnModal: false,
      },
      twitch: {
        name: "twitch",
        showOnModal: false,
      },
      line: {
        name: "line",
        showOnModal: false,
      },
      kakao: {
        name: "kakao",
        showOnModal: false,
      },
      linkedin: {
        name: "linkedin",
        showOnModal: false,
      },
      twitter: {
        name: "twitter",
        showOnModal: false,
      },
      weibo: {
        name: "weibo",
        showOnModal: false,
      },
      wechat: {
        name: "wechat",
        showOnModal: false,
      },
      farcaster: {
        name: "farcaster",
        showOnModal: false,
      },
      email_passwordless: {
        name: "email-passwordless",
        showOnModal: false,
      },
      sms_passwordless: {
        name: "sms-passwordless",
        showOnModal: true,
      },
    },
    showOnModal: true,
  },
};