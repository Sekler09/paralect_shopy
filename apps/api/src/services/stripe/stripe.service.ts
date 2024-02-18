import Stripe from 'stripe';
import config from 'config';

const stripe = new Stripe(config.STRIPE_API_KEY);

export default stripe;
