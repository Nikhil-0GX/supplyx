import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/backend/backend.did.js';

class AuthService {
  constructor() {
    this.authClient = null;
    this.actor = null;
    this.identity = null;
  }

  async initialize() {
    this.authClient = await AuthClient.create();
    const isAuthenticated = await this.authClient.isAuthenticated();

    if (isAuthenticated) {
      this.identity = await this.authClient.getIdentity();
      await this.createActor();
    }

    return isAuthenticated;
  }

  async createActor() {
    const agent = new HttpAgent({
      identity: this.identity,
      host: 'http://localhost:4943',
    });

    if (process.env.NODE_ENV !== 'production') {
      await agent.fetchRootKey();
    }

    this.actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: process.env.REACT_APP_BACKEND_CANISTER_ID,
    });
  }

  async isPasskeySupported() {
    return window.PublicKeyCredential &&
      typeof window.PublicKeyCredential === 'function' &&
      typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function';
  }

  async loginWithAnchor() {
    if (!this.authClient) {
      await this.initialize();
    }

    const days = 1n;
    const hours = 24n;
    const nanoseconds = 3600000000000n;
    
    const authenticated = await this.authClient.login({
      identityProvider: 'http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai',
      maxTimeToLive: days * hours * nanoseconds,
      windowOpenerFeatures: 'toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100',
      onSuccess: async () => {
        this.identity = await this.authClient.getIdentity();
        await this.createActor();
      },
    });

    return authenticated;
  }

  async logout() {
    if (this.authClient) {
      await this.authClient.logout();
      this.identity = null;
      this.actor = null;
    }
  }

  getIdentity() {
    return this.identity;
  }

  getActor() {
    return this.actor;
  }

  isAuthenticated() {
    return this.authClient?.isAuthenticated() || false;
  }
}

const authService = new AuthService();
export default authService; 