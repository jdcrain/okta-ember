import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),
  router: service(),

  async beforeModel() {
    this._super(...arguments);

    const isAuthenticated = await this.auth.isAuthenticated();
    if (isAuthenticated) {
      return true;
    }

    const route = this.router.currentRoute;

    // TODO: Save the model also? Could possibly use urlFor https://api.emberjs.com/ember/3.8/classes/RouterService/methods?anchor=urlFor
    this.auth.setFromRoute(route.name, route.queryParams);

    this.auth.loginRedirect();
  },
});
