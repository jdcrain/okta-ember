import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  auth: service(),
  actions: {
    logout() {
      const authService = this.get('auth');
      authService.logout('authenticated');
    },
  },
});
