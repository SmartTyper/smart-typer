import { services, actions } from 'store/store';

type Extra = { services: typeof services; actions: typeof actions };

export type { Extra };
