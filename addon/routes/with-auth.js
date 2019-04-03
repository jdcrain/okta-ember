import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),
  router: service(),

  async beforeModel() {
    this._super(...arguments);

    const authService = this.auth;

    const isAuthenticated = await authService.isAuthenticated();
    if (isAuthenticated) {
      return true;
    }

    const route = this.router.currentRoute;

    // TODO: Save the model also? Could possibly use urlFor https://api.emberjs.com/ember/3.8/classes/RouterService/methods?anchor=urlFor
    if (route) {
      authService.setFromRoute(route.name, route.queryParams);
    } else {
      authService.setFromRoute('index');
    }

    const onAuthRequired =
      authService.getOktaConfig().onAuthRequired || authService.onAuthRequired;

    if (onAuthRequired) {
      onAuthRequired(authService, this.router);
    } else {
      authService.loginRedirect();
    }
  },
});
